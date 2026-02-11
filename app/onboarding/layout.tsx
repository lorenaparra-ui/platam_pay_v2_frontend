import { ConfigDataProvider } from "@providers/ConfigDataProvider";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ConfigDataProvider>
                    {children}
                </ConfigDataProvider>
            </body>
        </html>
    );
}
