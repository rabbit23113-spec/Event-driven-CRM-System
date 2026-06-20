import type {Metadata} from "next";
import "./globals.css";
import Footer from "@/app/layout/FooterLayoutComponent";
import { Open_Sans, Roboto } from "next/font/google";

export const metadata: Metadata = {
    title: "Event Sourcing CRM",
    description: "Event Sourcing CRM",
    icons: {
        icon: "./favicon.ico",
    }
};

export const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-opensans",
    display: "swap",
});

export const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-roboto",
    display: "swap",
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`h-full antialiased ${openSans} ${roboto}`}

        >
        <body className="bg-bg min-h-full flex flex-col">
        {children}
        </body>
        </html>
    );
}
