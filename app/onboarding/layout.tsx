import { Header } from "@/components/transversal/sections/Header";
import { ThemeToggle } from "@/components/transversal/buttons/ThemeToggle";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-light-50 dark:bg-dark-950 transition-colors duration-300 font-sans">
                <Header
                    primaryLogo={
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-white rounded"></div>
                            </div>
                            <span className="text-xl font-bold text-light-50 dark:text-white">Platam Pay</span>
                        </div>
                    }
                    secondaryLogo={
                        <div className="text-lg font-serif italic text-light-500 dark:text-dark-300 leading-tight">
                            ELENA <span className="block text-[10px] not-italic font-sans text-light-400 dark:text-dark-400">Centro de Belleza</span>
                        </div>
                    }
                    navigation={[
                        { label: "Solicitud de cupo para personas", href: "#" },
                        { label: "Comenzar solicitud para empresas", href: "#" },
                        { label: "Montar pedido", href: "#" },
                    ]}
                    actions={
                        <ThemeToggle />
                    }
                    sticky
                />
                <main>
                    {children}
                </main>
            </div>
    );
}