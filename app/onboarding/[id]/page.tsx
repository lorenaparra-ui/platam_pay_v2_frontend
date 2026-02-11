"use client";

import { Button } from "@/components/transversal/buttons/Button";
import { MessageCircle, Wallet, FileText } from "lucide-react";

export default function PartnerPage({ params }: { params: Promise<{ id: string }> }) {
    
    return (
        <div className="min-h-screen bg-light-950 dark:bg-dark-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="flex justify-center items-center gap-8 mb-8">
                        {/* Logos Placeholder */}
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white rounded"></div>
                            </div>
                            <span className="text-2xl font-bold text-light-50 dark:text-white">Platam Pay</span>
                        </div>
                        <div className="h-8 w-px bg-light-300 dark:bg-dark-700"></div>
                        <div className="text-xl font-serif italic text-light-500 dark:text-dark-300">
                            ELENA <span className="block text-xs not-italic font-sans">Centro de Belleza</span>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-light-50 dark:text-white tracking-tight">PORTAL ASESORES</h1>
                    <p className="mt-4 text-light-200 dark:text-dark-300 max-w-3xl mx-auto text-sm leading-relaxed">
                        ¡Bienvenido al portal para Asesores de Platam! Aquí podrás realizar distintas acciones para ayudar a tus clientes a obtener financiamiento. Si aún no has sido inscrito en Platam, por favor contacta a tu líder para que te inscriba.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 gap-8">
                    
                    {/* Card 1: WhatsApp Bot */}
                    <div className="bg-light-50 dark:bg-dark-900 rounded-[2.5rem] p-10 text-center relative overflow-hidden shadow-xl border border-transparent dark:border-dark-800 transition-colors">
                        <div className="w-20 h-20 rounded-full bg-light-200/10 flex items-center justify-center mx-auto mb-6">
                            <MessageCircle className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">¡Utiliza nuestro bot de WhatsApp!</h2>
                        <p className="text-light-200 text-sm mb-8 max-w-2xl mx-auto">
                            Con nuestro bot de WhatsApp podrás acceder a todas las herramientas de Platam de forma rápida y sencilla. Consulta el cupo disponible y presta más de tus clientes, y ofrece un mejor servicio de asesoramiento.
                        </p>
                        <Button className="bg-white text-light-50 hover:bg-light-100 dark:hover:bg-gray-200 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                            Acceder al bot
                        </Button>
                    </div>

                    {/* Card 2: Solicitud Cupo */}
                    <div className="bg-light-50 dark:bg-dark-900 rounded-[2.5rem] p-10 text-center relative overflow-hidden shadow-xl border border-transparent dark:border-dark-800 transition-colors">
                         <div className="w-20 h-20 rounded-full bg-light-200/10 flex items-center justify-center mx-auto mb-6">
                            <Wallet className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Solicita un cupo Platam para tus clientes</h2>
                        <p className="text-light-200 text-sm mb-8 max-w-2xl mx-auto">
                            Solicita la línea de crédito Platam para tus clientes personas o empresas y ofréceles una forma rápida y sencilla de acceder a financiamiento para sus negocios. Para solicitarla, asegúrate de estar con tu cliente, ya que él debe suministrarte toda la información necesaria. Después de completar la solicitud, le informaremos por WhatsApp sobre el estado de su solicitud y le enviaremos el contrato por el mismo medio.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button className="bg-white text-light-50 hover:bg-light-100 dark:hover:bg-gray-200 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                                Comenzar solicitud para personas
                            </Button>
                            <Button className="bg-white text-light-50 hover:bg-light-100 dark:hover:bg-gray-200 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                                Comenzar solicitud para empresas
                            </Button>
                        </div>
                    </div>

                    {/* Card 3: Montar Pedido */}
                    <div className="bg-light-50 dark:bg-dark-900 rounded-[2.5rem] p-10 text-center relative overflow-hidden shadow-xl border border-transparent dark:border-dark-800 transition-colors">
                         <div className="w-20 h-20 rounded-full bg-light-200/10 flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Monta tu pedido en Platam</h2>
                        <p className="text-light-200 text-sm mb-8 max-w-2xl mx-auto">
                            Solicita los préstamos de tus clientes con Platam. Ingresa la información del pedido que el cliente quiere financiar y recibe una respuesta por WhatsApp.
                        </p>
                        <Button className="bg-white text-light-50 hover:bg-light-100 dark:hover:bg-gray-200 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                            Montar pedido
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}