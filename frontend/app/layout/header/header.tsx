"use client"

import Link from "next/link";
import {CustomButton} from "@/app/components/button/button";
import {Popover, Transition} from "@headlessui/react";
import {Fragment} from "react";

export const Header = () => {
    return (
        <header className={`h-16 bg-background border border-border text-foreground flex items-center px-6`}>
            <div className={"flex items-center w-full justify-between"}>
                <img className={"w-13 h-13"} src={"../../favicon.ico"}/>
                <nav className={"flex items-center gap-3"}>
                    <Popover className="relative">
                        <Popover.Button
                            className={"text-foreground font-medium outline-0"}>Основное</Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute z-10 bg-card px-3 py-3 my-4 w-screen max-w-max rounded-md shadow-lg">
                                <div className="grid grid-cols-1 gap-3">
                                    <Link className={"text-foreground-secondary font-medium hover:text-foreground"}
                                          href={"/"}>Главная</Link>
                                    <Link className={"text-foreground-secondary font-medium hover:text-foreground"}
                                          href={"/dashboard"}>Дашборд</Link>
                                    <Link className={"text-foreground-secondary font-medium hover:text-foreground"}
                                          href={"/audit"}>Журнал аудита</Link>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                    <Popover className="relative">
                        <Popover.Button
                            className={"text-foreground font-medium outline-0"}>Бизнес</Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute z-10 bg-card px-3 py-3 my-4 w-screen max-w-max rounded-md shadow-lg">
                                <div className="grid grid-cols-1 gap-3">
                                    <Link className={"text-foreground-secondary font-medium hover:text-foreground"}
                                          href={"/leads"}>Лиды</Link>
                                    <Link className={"text-foreground-secondary font-medium hover:text-foreground"}
                                          href={"/clients"}>Клиенты</Link>
                                    <Link className={"text-foreground-secondary font-medium hover:text-foreground"}
                                          href={"/deals"}>Сделки</Link>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                    <Popover className="relative">
                        <Popover.Button
                            className={"text-foreground font-medium outline-0"}>Продуктивность</Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute z-10 bg-card px-3 py-3 my-4 w-screen max-w-max rounded-md shadow-lg">
                                <div className="grid grid-cols-1 gap-3">
                                    <Link className={"text-foreground-secondary font-medium hover:text-foreground"}
                                          href={"/tasks"}>Задачи</Link>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                    <Link className={"text-foreground font-medium outline-0"}
                          href={"/settings"}>Настройки</Link>
                </nav>
                <div className={"flex items-center gap-2"}>
                    {/* here will be authentication logic */}
                    <Link href={"/signin"}>
                        <CustomButton variant={"outline"}>Вход</CustomButton>
                    </Link>
                    <Link href={"/signup"}>
                        <CustomButton variant={"primary"}>Регистрация</CustomButton>
                    </Link>
                </div>
            </div>
        </header>
    )
}