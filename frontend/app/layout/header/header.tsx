"use client"

import Logo from "@/app/components/logo";
import HeaderAuthButtons from "@/app/components/headerAuthButtons";
import HeaderNav from "@/app/components/headerNav";

export const Header = () => {
    return (
        <header className={"border border-border h-28 w-full flex items-center justify-between px-24 sticky"}>
            <Logo />
            <HeaderNav />
            <HeaderAuthButtons />
        </header>
    )
}