import {Menu, MenuButton, MenuItems} from "@headlessui/react";

export const LeadComponent = (props: {
    name: string,
    status: string,
    email: string,
    phone: string,
    ownerId: string,
    source: string,
    createdAt: Date;
    updatedAt: Date;
}) => {
    return (
        <div className={"p-3 bg-card text-foreground border border-border rounded-md flex gap-6 flex-col"}>
            <div className={"flex justify-between items-center gap-6"}>
                <div className={"text-2xl"}>{props.name}</div>
                <div className={"p-2.5 bg-primary text-card rounded-md"}>{props.status}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>E-mail</div>
                <div className={"text-sm text-foreground-secondary"}>{props.email}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Телефон</div>
                <div className={"text-sm text-foreground-secondary"}>{props.phone}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Сотрудник</div>
                <div className={"text-sm text-foreground-secondary"}>{props.ownerId}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Источник</div>
                <div className={"text-sm text-foreground-secondary"}>{props.source}</div>
            </div>
            <Menu>
                <MenuButton
                    className={"outline-0 p-3 text-sm font-roboto font-medium min-w-20 rounded-md bg-card border border-border text-foreground hover:bg-card-hover"}>
                    Действия
                </MenuButton>
                <MenuItems anchor="bottom" className={"p-6 border border-border rounded-md bg-card flex flex-col gap-4"}>
                    <div className={"font-medium text-sm"}>Изменить</div>
                    <div className={"font-medium text-sm"}>Удалить</div>
                </MenuItems>
            </Menu>
        </div>

    )
}