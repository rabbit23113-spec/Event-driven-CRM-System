"use client"

import Logo from "@/app/components/misc/logo";
import HeaderAuthButtons from "@/app/components/header/headerAuthButtons";
import HeaderNav from "@/app/components/header/headerNav";

export const Header = () => {
    return (
        <header className={"border border-border h-28 w-full flex items-center justify-between px-24"}>
            <Logo />
            <HeaderNav />
            <HeaderAuthButtons />
        </header>
    )
}