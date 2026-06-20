"use client"

import HeaderNavigationComponent from "@/app/components/header/HeaderNavigationComponent";
import CustomButton from "@/app/components/misc/CustomButtonComponent";
import Link from "next/link";

export const HeaderLayoutComponent = () => {
    return (
        <header className={"w-full h-8 p-8 bg-card border-b border-border flex items-center justify-between top-0 fixed"}>
            <HeaderNavigationComponent/>
            <Link href="/signup">
                <CustomButton variant={"primary"}>Войти</CustomButton>
            </Link>
        </header>
    )
}