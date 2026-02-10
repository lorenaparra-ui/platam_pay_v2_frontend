"use client";
import { Checkbox } from "@/components/transversal/forms/Checkbox";
import { DatePicker } from "@/components/transversal/forms/DatePicker";
import { Input } from "@/components/transversal/forms/Input";
import { Select } from "@/components/transversal/forms/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import type { ZodSchema } from "zod";

export interface FormProps {
    schema: ZodSchema<any>
    onSubmit: (data: any) => Promise<void> | void
    defaultValues?: any
}

export function CreditaApplicationForm({ schema, onSubmit, defaultValues }: FormProps) {
    const { control, handleSubmit, reset } = useForm<any>({ resolver: zodResolver(schema as any), defaultValues });

    const submitHandler: SubmitHandler<any> = async (data) => {
        try {
            await onSubmit(data);
            reset();
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-8" >
                {/* 1. Datos Personales */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                        1. Datos Personales
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            name="firstName"
                            control={control}
                            label="Nombre"
                            placeholder="Ingrese su nombre"
                            rules={{ required: "Nombre es requerido" }}
                        />
                        <Input
                            name="lastName"
                            control={control}
                            label="Apellido"
                            placeholder="Ingrese su apellido"
                            rules={{ required: "Apellido es requerido" }}
                        />
                        <Select
                            name="doc_type"
                            control={control}
                            label="Tipo de Documento"
                            options={[
                                { value: "cc", label: "Cédula de Ciudadanía" },
                                { value: "ti", label: "Tarjeta de Identidad" },
                            ]}
                            rules={{ required: "Tipo de Documento es requerido" }}
                        />
                        <Input
                            name="doc_number"
                            control={control}
                            label="Número de Documento"
                            placeholder="Ingrese su número de documento"
                            rules={{ required: "Número de Documento es requerido" }}
                        />
                        <DatePicker
                            name="birthDate"
                            control={control}
                            label="Fecha de Nacimiento"
                            rules={{ required: "Fecha de Nacimiento es requerida" }}
                        />
                        <Input
                            name="email"
                            control={control}
                            label="Correo Electrónico"
                            placeholder="Ingrese su correo electrónico"
                            rules={{ required: "Correo Electrónico es requerido" }}
                        />
                        <Input
                            name="phone"
                            control={control}
                            label="Número de Teléfono"
                            placeholder="Ingrese su número de teléfono"
                            rules={{ required: "Número de Teléfono es requerido" }}
                        />
                    </div>
                </section>
                {/* 2. Datos del Negocio */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                        2. Datos del Negocio
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            name="businessName"
                            control={control}
                            label="Nombre del Negocio"
                            placeholder="Ingrese el nombre de su negocio"
                            rules={{ required: "Nombre del Negocio es requerido" }}
                        />
                        <Select
                            name="business_relation"
                            control={control}
                            label="Relación con el Negocio"
                            options={[
                                { value: "1", label: "Propietario" },
                                { value: "2", label: "Socio" },
                            ]}
                            rules={{ required: "Relación con el Negocio es requerida" }}
                        />
                        <Select name="business_city" control={control}
                            label="Ciudad del Negocio"
                            options={[
                                { value: "1", label: "Bogotá" },
                                { value: "2", label: "Medellín" },
                            ]}
                            rules={{ required: "Ciudad del Negocio es requerida" }} />
                        <Input
                            name="business_address"
                            control={control}
                            label="Dirección del Negocio"
                            placeholder="Ingrese la dirección de su negocio"
                            rules={{ required: "Dirección del Negocio es requerida" }}
                        />
                        <Select name="business_type" control={control}
                            label="Tipo de Negocio"
                            options={[
                                { value: "1", label: "Empresa" },
                                { value: "2", label: "Independiente" },
                            ]}
                            rules={{ required: "Tipo de Negocio es requerido" }} />
                        <Select name="business_seniority" control={control}
                            label="Senioridad del Negocio"
                            options={[
                                { value: "1", label: "Nuevo" },
                                { value: "2", label: "Establecido" },
                            ]}
                            rules={{ required: "Senioridad del Negocio es requerida" }} />
                        <Select name="business_number_of_employees" control={control}
                            label="Número de Empleados"
                            options={[
                                { value: "1", label: "1-10" },
                                { value: "2", label: "11-50" },
                                { value: "3", label: "51-200" },
                                { value: "4", label: "201+" },
                            ]}
                            rules={{ required: "Número de Empleados es requerido" }} />
                        <Input name="business_number_of_locations"
                            control={control}
                            label="Número de Sucursales"
                            placeholder="Ingrese el número de sucursales de su negocio"
                            rules={{ required: "Número de Sucursales es requerido" }} />
                        <Input name="business_flagship_m2"
                            control={control}
                            label="Superficie del Negocio Principal (m2)"
                            placeholder="Ingrese la superficie del negocio principal en metros cuadrados"
                            rules={{ required: "Superficie del Negocio Principal es requerida" }} />
                    </div>
                </section>
                {/* 3. Arriendo */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                        3. Información de Arriendo
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select name="business_has_rent" control={control}
                            label="¿Paga arriendo?"
                            options={[
                                { value: "1", label: "Sí" },
                                { value: "2", label: "No" },
                            ]}
                            rules={{ required: "¿Paga arriendo? es requerido" }} />


                    </div>
                </section>

                {/* 4. Información Financiera */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                        4. Información Financiera
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <Input name="total_assets"
                            control={control}
                            label="Total de Activos"
                            type="number" placeholder="0" />


                        <Input name="monthly_income" type="number" placeholder="0" control={control} label="Ingresos Mensuales" />


                        <Input name="monthly_expenses" type="number" placeholder="0" control={control} label="Gastos Mensuales" />

                    </div>
                </section>

                {/* 5. Solicitud y Cliente Aliado */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                        5. Solicitud y Cliente Aliado
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <Input name="clr_requested_loc" type="number" placeholder="Ej. 5000000" control={control} label="Monto Solicitado" />


                        <Select name="is_partner_client" control={control}
                            label="¿Es Cliente Aliado?"
                            options={[
                                { value: "1", label: "Sí" },
                                { value: "2", label: "No" },
                            ]}
                            rules={{ required: "¿Es Cliente Aliado? es requerido" }} />


                        <Input name="current_purchases" type="number" placeholder="0" control={control} label="Gastos Mensuales del Cliente" />


                        <Input name="mothly_partner_purchases" type="number" placeholder="0" control={control} label="Gastos Mensuales del Cliente Aliado" />


                    </div>
                </section>

                {/* 6. Autorizaciones */}
                <section className="space-y-4 pt-4">

                    <Checkbox
                        name="authorization"

                        className="mt-1"
                    />


                </section>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        className="bg-primary-400 text-dark-950 px-8 py-3 rounded-lg font-bold hover:bg-primary-500 hover:shadow-primary active:scale-95 transition-all duration-200 w-full md:w-auto"
                    >
                        Enviar Solicitud
                    </button>
                </div>

            </form>
        </div >
    );
}   
