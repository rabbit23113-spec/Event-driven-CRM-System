"use client"

import Link from "next/link";

export const Footer = () => {
    return (
        <footer className={"h-50 w-full border border-border flex items-center justify-between px-24"}>
            <div className={"text-foreground font-medium text-3.5"}>
                CRM v0.1
            </div>
            <div className={"flex items-start justify-between gap-8"}>
                <div className={"flex items-start justify-center gap-3.5 flex-col"}>
                    <div className={"text-foreground text-3.5 font-medium"}>Основное</div>
                    <div className={"flex flex-col gap-2"}>
                        <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/"}>Главная</Link>
                        <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/"}>Дашборд</Link>
                        <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/"}>Журнал аудита</Link>
                        <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/"}>Настройки</Link>
                    </div>
                </div>
                <div className={"flex items-start justify-center gap-3.5 flex-col"}>
                    <div className={"text-foreground text-3.5 font-medium"}>Коммерция</div>
                    <div className={"flex flex-col gap-2"}>
                        <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/"}>Сделки</Link>
                        <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/"}>Лиды</Link>
                        <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/"}>Клиенты</Link>
                    </div>
                </div>
                <div className={"flex items-start justify-center gap-3.5 flex-col"}>
                    <div className={"text-foreground text-3.5 font-medium"}>Задачи и аналитика</div>
                    <div className={"flex flex-col gap-2"}>
                        <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/"}>Аналитика</Link>
                        <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/"}>Задачи</Link>
                    </div>
                </div>
            </div>
            <div className="text-3.5 text-foreground">
                © {new Date().getFullYear()} CRM v0.1. Все права защищены.
            </div>
        </footer>
    )
}