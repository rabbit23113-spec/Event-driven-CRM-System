"use client"

import Copyright from "@/app/components/misc/CopyrightComponent";

export const FooterLayoutComponent = () => {
    return (
        <footer className={"h-6 bg-card w-full border-t border-border flex items-center justify-center p-6 absolute bottom-0"}>
            <Copyright />
        </footer>
    )
}