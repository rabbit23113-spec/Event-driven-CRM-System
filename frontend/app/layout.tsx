import type {Metadata} from "next";
import "./globals.css";
import Header from "@/app/layout/header";
import Footer from "@/app/layout/footer";

export const metadata: Metadata = {
    title: "Event Sourcing CRM",
    description: "Event Sourcing CRM",
    icons: {
        icon: "./favicon.ico",
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`h-full antialiased`}

        >
        <body className="bg-bg min-h-full flex flex-col">
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
