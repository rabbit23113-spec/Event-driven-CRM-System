"use client"

import Link from "next/link";
import FooterNav from "@/app/components/footer/footerNav";
import Copyright from "@/app/components/misc/copyright";

export const Footer = () => {
    return (
        <footer className={"h-50 w-full border border-border flex items-center justify-between px-24"}>
            <div className={"text-foreground font-medium text-3.5"}>
                CRM v0.1
            </div>
            <FooterNav />
            <Copyright />
        </footer>
    )
}