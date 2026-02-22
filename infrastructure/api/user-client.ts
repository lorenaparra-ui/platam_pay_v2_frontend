import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  details?: unknown;
}

export class ApiError extends Error {
  public statusCode: number;
  public details?: unknown;

  constructor(error: ApiErrorResponse) {
    super(error.message);
    this.name = "ApiError";
    this.statusCode = error.statusCode;
    this.details = error.details;
  }
}

const BASE_URL =
  process.env.NEXT_PUBLIC_USER_API_URL || "http://localhost:8000/api/v1/users";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError) => {
    let normalizedError: ApiErrorResponse = {
      message: "Un error inesperado ha ocurrido",
      statusCode: 500,
    };

    if (error.response) {
      const data = error.response.data as Record<string, unknown>;
      normalizedError = {
        message: (data?.message as string) || error.message,
        statusCode: error.response.status,
        details: data,
      };

      switch (error.response.status) {
        case 400:
          console.error("[UserAPI] Bad Request:", normalizedError);
          break;
        case 401:
          console.error("[UserAPI] Unauthorized:", normalizedError);
          break;
        case 403:
          console.error("[UserAPI] Forbidden:", normalizedError);
          break;
        case 404:
          console.error("[UserAPI] Not Found:", normalizedError);
          break;
        case 500:
          console.error("[UserAPI] Server Error:", normalizedError);
          break;
      }
    } else if (error.request) {
      normalizedError = {
        message: "Error de red: No se recibió respuesta del servidor",
        statusCode: 0,
        details: error.request,
      };
      console.error("[UserAPI] Network Error:", normalizedError);
    } else {
      normalizedError = {
        message: error.message,
        statusCode: 0,
      };
    }

    if (error.code === "ECONNABORTED") {
      normalizedError.message = "La petición excedió el tiempo de espera";
      console.error("[UserAPI] Timeout:", normalizedError);
    }

    return Promise.reject(new ApiError(normalizedError));
  }
);

export const userClient = {
  get: <T>(url: string, config = {}) => api.get<unknown, T>(url, config),
  post: <T>(url: string, body: unknown, config = {}) =>
    api.post<unknown, T>(url, body, config),
  put: <T>(url: string, body: unknown, config = {}) =>
    api.put<unknown, T>(url, body, config),
  delete: <T>(url: string, config = {}) => api.delete<unknown, T>(url, config),
};
