"use client"

import Link from "next/link";

export const Footer = () => {
    return (
        <footer
            className={`py-6 bg-background border border-border text-foreground flex items-center px-6 absolute bottom-0 w-full`}>
            <div className={"flex items-center w-full justify-between"}>
                <img className={"w-13 h-13"} src={"../../favicon.ico"}/>
                <nav className={"flex items-start justify-center gap-4"}>
                            <div className={"flex items-center flex-col w-full justify-between gap-1.5"}>
                                <div className={"text-foreground text-sm font-medium outline-0"}>Основное</div>
                                <div className={"flex flex-col gap-1"}>
                                    <Link className={"text-foreground-secondary text-xs font-medium hover:text-foreground"} href={"/"}>Главная</Link>
                                    <Link className={"text-foreground-secondary text-xs font-medium hover:text-foreground"} href={"/dashboard"}>Дашборд</Link>
                                    <Link className={"text-foreground-secondary text-xs font-medium hover:text-foreground"} href={"/audit"}>Журнал аудита</Link>
                                </div>
                            </div>
                            <div className={"flex items-center flex-col w-full justify-center gap-1.5"}>
                                <div className={"text-foreground text-sm font-medium outline-0"}>Бизнес</div>
                                <div className={"flex flex-col gap-1"}>
                                    <Link className={"text-foreground-secondary text-xs font-medium hover:text-foreground"} href={"/leads"}>Лиды</Link>
                                    <Link className={"text-foreground-secondary text-xs font-medium hover:text-foreground"} href={"/clients"}>Клиенты</Link>
                                    <Link className={"text-foreground-secondary text-xs font-medium hover:text-foreground"} href={"/deals"}>Сделки</Link>
                                </div>
                            </div>
                            <div className={"flex items-center flex-col w-full justify-center gap-1.5"}>
                                <div className={"text-foreground text-sm font-medium outline-0"}>Продуктивность</div>
                                <div>
                                    <div className={"flex flex-col gap-1"}>
                                        <Link className={"text-foreground-secondary text-xs font-medium hover:text-foreground"} href={"/tasks"}>Задачи</Link>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex items-center flex-col w-full justify-center gap-1.5"}>
                                <div className={"text-foreground text-sm font-medium outline-0"}>Настройки</div>
                                <div className={"flex flex-col gap-1"}>
                                    <Link className={"text-foreground-secondary text-xs font-medium hover:text-foreground"} href={"/settings"}>Настройки</Link>
                                </div>
                            </div>
                </nav>
                <div className="text-xs text-muted-foreground text-center">
                    © {new Date().getFullYear()} Event Sourcing CRM. All rights reserved.
                </div>
            </div>
        </footer>
    )
}