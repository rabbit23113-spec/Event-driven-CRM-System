import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";
import LinkBlock from "@/app/components/linkBlock";

export const HeaderNav = () => {
    return <nav className={"flex gap-8"}>
        <Popover className={"relative"}>
            <PopoverButton className={"text-foreground text-3.5 outline-0 hover:text-primary-hover"}>
                Основное
            </PopoverButton>
            <PopoverPanel className={"absolute z-50 top-full left=0 m-4 border border-border rounded-md"}>
                <div className={"h-fit rounded-md flex flex-col items-start justify-start bg-card"}>
                    <LinkBlock href={"/"} name={"Главная"} iconName={"home-03"} />
                    <LinkBlock href={"/"} name={"Дашборд"} iconName={"dashboard-square-01"} />
                    <LinkBlock href={"/"} name={"Настройки"} iconName={"setting-01"} />
                    <LinkBlock href={"/"} name={"Журнал аудита"} iconName={"audit-02"} />
                </div>
            </PopoverPanel>
        </Popover>
        <Popover className={"relative"}>
            <PopoverButton className={"text-foreground text-3.5 outline-0 hover:text-primary-hover"}>
                Коммерция
            </PopoverButton>
            <PopoverPanel className={"absolute top-full z-50 left=0 m-4 border border-border rounded-md "}>
                <div className={"h-fit rounded-md flex flex-col items-start justify-start bg-card"}>
                    <LinkBlock href={"/"} name={"Сделки"} iconName={"briefcase-01"} />
                    <LinkBlock href={"/"} name={"Лиды"} iconName={"user-question-01"} />
                    <LinkBlock href={"/"} name={"Клиенты"} iconName={"user"} />
                </div>
            </PopoverPanel>
        </Popover>
        <Popover className={"relative"}>
            <PopoverButton className={"text-foreground text-3.5 outline-0 hover:text-primary-hover"}>
                Задачи и аналитика
            </PopoverButton>
            <PopoverPanel className={"absolute top-full z-50 left=0 m-4 border border-border rounded-md"}>
                <div className={"h-fit rounded-md flex flex-col items-start justify-start bg-card"}>
                    <LinkBlock href={"/"} name={"Аналитика"} iconName={"analytics-01"} />
                    <LinkBlock href={"/"} name={"Задачи"} iconName={"sticky-note-02"} />
                </div>
            </PopoverPanel>
        </Popover>
    </nav>
}