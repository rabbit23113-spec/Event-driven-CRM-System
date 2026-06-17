import Link from "next/link";

export const FooterNav = () => {
    return <div className={"flex items-start justify-between gap-8"}>
        <div className={"flex items-start justify-center gap-3.5 flex-col"}>
            <div className={"text-foreground text-3.5 font-medium"}>Основное</div>
            <div className={"flex flex-col gap-2"}>
                <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/frontend/public"}>Главная</Link>
                <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/frontend/public"}>Дашборд</Link>
                <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/frontend/public"}>Журнал аудита</Link>
                <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/frontend/public"}>Настройки</Link>
            </div>
        </div>
        <div className={"flex items-start justify-center gap-3.5 flex-col"}>
            <div className={"text-foreground text-3.5 font-medium"}>Коммерция</div>
            <div className={"flex flex-col gap-2"}>
                <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/frontend/public"}>Сделки</Link>
                <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/frontend/public"}>Лиды</Link>
                <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/frontend/public"}>Клиенты</Link>
            </div>
        </div>
        <div className={"flex items-start justify-center gap-3.5 flex-col"}>
            <div className={"text-foreground text-3.5 font-medium"}>Задачи и аналитика</div>
            <div className={"flex flex-col gap-2"}>
                <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/frontend/public"}>Аналитика</Link>
                <Link className={"text-[14px] text-foreground-secondary hover:text-foreground"} href={"/frontend/public"}>Задачи</Link>
            </div>
        </div>
    </div>
}