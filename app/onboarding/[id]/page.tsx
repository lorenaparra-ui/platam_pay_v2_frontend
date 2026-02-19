"use client";
import { InformationCard } from "@/components/transversal/cards/InformationCard";
import { MessageCircle, Wallet, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PartnerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    return (
        <div className="min-h-screen bg-light-950 dark:bg-dark-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
            <div className="w-10/12 mx-auto">

                <div className="text-center mb-16 space-y-4">

                    <h1 className="text-4xl font-bold mb-4 gradient-multi bg-clip-text text-transparent inline-block">Portal Asesores</h1>
                    <p className="mt-4 ext-xl text-light-100 dark:text-dark-300 max-w-3xl mx-auto  ">
                        ¡Bienvenido al portal para Asesores de Platam! Aquí podrás realizar distintas acciones para ayudar a tus clientes a obtener financiamiento. Si aún no has sido inscrito en Platam, por favor contacta a tu líder para que te inscriba.
                    </p>
                </div>


                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1: WhatsApp Bot */}
                    <InformationCard
                        layout="vertical"
                        title="¡Utiliza nuestro bot de WhatsApp!"
                        description="Con nuestro bot de WhatsApp podrás acceder a todas las herramientas de Platam de forma rápida y sencilla. Consulta el cupo disponible y presta más de tus clientes, y ofrece un mejor servicio de asesoramiento."
                        icon={MessageCircle}
                        className="bg-white border rounded-xl p-6 hover:border-primary-400 hover:shadow-primary transition-all"
                        iconBackgroundColor="bg-primary"
                        iconColor="text-light-50"
                        iconWrapperClassName="w-12 h-12 rounded-lg mb-4"
                        iconClassName="w-6 h-6"
                        titleClassName="text-xl font-semibold text-light-50 dark:text-white mb-2"
                        descriptionClassName="text-light-100 text-sm mb-4 dark:text-white"
                    >
                        <div className="w-full flex justify-center" >
                            <Link className="border border-primary px-6 py-2.5 rounded-lg text-primary-600 dark:text-light-900 hover:text-primary-700 font-medium inline-flex items-center gap-2" href="/dashboard">Acceder al bot </Link>
                        </div>
                    </InformationCard>

                    {/* Card 2: Solicitud Cupo */}
                    <InformationCard
                        layout="vertical"
                        title="Solicita un cupo Platam para tus clientes"
                        description="Solicita la línea de crédito Platam para tus clientes personas o empresas y ofréceles una forma rápida y sencilla de acceder a financiamiento para sus negocios. Para solicitarla, asegúrate de estar con tu cliente, ya que él debe suministrarte toda la información necesaria. Después de completar la solicitud, le informaremos por WhatsApp sobre el estado de su solicitud y le enviaremos el contrato por el mismo medio."
                        icon={Wallet}
                        className="bg-white border border-light-800 rounded-xl p-6 hover:border-primary-400 hover:shadow-primary transition-all"
                        iconBackgroundColor="bg-primary"
                        iconColor="text-light-50"
                        iconWrapperClassName="w-12 h-12 rounded-lg mb-4"
                        iconClassName="w-6 h-6"
                        titleClassName="text-xl font-semibold text-light-50 dark:text-white mb-2"
                        descriptionClassName="text-light-100 text-sm mb-4 dark:text-white"
                    >
                        <div className="w-full xl:flex justify-between gap-2">
                            <Link className="border border-primary px-6 py-2.5 rounded-lg text-primary-600 dark:text-light-900 hover:text-primary-700 font-medium inline-flex items-center gap-2 mb-6 xl:mb-0" href={`/onboarding/${id}/natural-person?application_type=sales_representative`}>Comenzar solicitud para personas</Link>
                            <Link className="border border-primary px-6 py-2.5 rounded-lg text-primary-600 dark:text-light-900 hover:text-primary-700 font-medium inline-flex items-center gap-2" href={`/onboarding/${id}/legal-entity`}> Comenzar solicitud para empresas</Link>
                        </div>
                    </InformationCard>

                    {/* Card 3: Montar Pedido */}
                    <InformationCard
                        layout="vertical"
                        title="Monta tu pedido en Platam"
                        description="Solicita los préstamos de tus clientes con Platam. Ingresa la información del pedido que el cliente quiere financiar y recibe una respuesta por WhatsApp."
                        icon={FileText}
                        className="bg-white border border-light-800 rounded-xl p-6 hover:border-primary-400 hover:shadow-primary transition-all"
                        iconBackgroundColor="bg-primary"
                        iconColor="text-light-50"
                        iconWrapperClassName="w-12 h-12 rounded-lg mb-4"
                        iconClassName="w-6 h-6"
                        titleClassName="text-xl font-semibold text-light-50 dark:text-white mb-2"
                        descriptionClassName="text-light-100 text-sm mb-4 dark:text-white"
                    >
                       <div className="w-full flex justify-center" >
                            <Link className=" border border-primary px-6 py-2.5 rounded-lg text-primary-600 dark:text-light-900 hover:text-primary-700 font-medium inline-flex items-center gap-2 mb-6 xl:mb-0" href={`/onboarding/${id}/natural-person`}>Comenzar solicitud para personas</Link>
                        </div>
                    </InformationCard>

                </div>
            </div>
        </div>
    );
}