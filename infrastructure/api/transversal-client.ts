import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

export interface ApiErrorResponse {
  message: string
  statusCode: number
  details?: any
}

export class ApiError extends Error {
  public statusCode: number
  public details?: any

  constructor(error: ApiErrorResponse) {
    super(error.message)
    this.name = 'ApiError'
    this.statusCode = error.statusCode
    this.details = error.details
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_TRANSVERSAL_API_URL || "http://localhost:3001";

// 1. Instancia base reutilizable
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout global de 10s
})

// 2. Interceptor de Request (Async)
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Aquí puedes agregar lógica asíncrona (ej. obtener token de AsyncStorage/IndexedDB)
    return config
  },
  (error) => Promise.reject(error)
)

// 3. Interceptor de Response (Manejo Global de Errores)
api.interceptors.response.use(
  async (response: AxiosResponse) => {
    // Retornamos directamente la data para simplificar el consumo
    return response.data
  },
  async (error: AxiosError) => {
    let normalizedError: ApiErrorResponse = {
      message: 'Un error inesperado ha ocurrido',
      statusCode: 500,
    }

    if (error.response) {
      // El servidor respondió con un error (4xx, 5xx)
      const data = error.response.data as any
      normalizedError = {
        message: data?.message || error.message,
        statusCode: error.response.status,
        details: data,
      }

      // Logging centralizado
      switch (error.response.status) {
        case 400:
          console.error('[API] Bad Request:', normalizedError)
          toast.error(normalizedError.message || "Solicitud incorrecta (400)")
          break
        case 401:
          console.error('[API] Unauthorized:', normalizedError)
          toast.error(normalizedError.message || "No autorizado (401)")
          break
        case 403:
          console.error('[API] Forbidden:', normalizedError)
          toast.error(normalizedError.message || "Prohibido (403)")
          break
        case 404:
          console.error('[API] Not Found:', normalizedError)
          toast.error(normalizedError.message || "No encontrado (404)")
          break
        case 500:
          console.error('[API] Server Error:', normalizedError)
          toast.error(normalizedError.message || "Error interno del servidor (500)")
          break
      }
    } else if (error.request) {
      // Error de Red (no hubo respuesta)
      normalizedError = {
        message: 'Error de red: No se recibió respuesta del servidor',
        statusCode: 0,
        details: error.request,
      }
      console.error('[API] Network Error:', normalizedError)
    } else {
      // Error de configuración
      normalizedError = {
        message: error.message,
        statusCode: 0,
      }
    }

    // Manejo de Timeout específico
    if (error.code === 'ECONNABORTED') {
      normalizedError.message = 'La petición excedió el tiempo de espera'
      console.error('[API] Timeout:', normalizedError)
    }

    return Promise.reject(new ApiError(normalizedError))
  }
)

export const transversalClient = {
  get: <T>(url: string, config = {}) => api.get<any, T>(url, config),
  post: <T>(url: string, body: any, config = {}) => api.post<any, T>(url, body, config),
}