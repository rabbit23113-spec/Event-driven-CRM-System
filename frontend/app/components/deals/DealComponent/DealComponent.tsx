import {Menu, MenuButton, MenuItems} from "@headlessui/react";

export const DealComponent = (props: {
    title: string,
    value: number,
    status: string,
    clientId: string,
    ownerId: string,
    createdAt: Date;
    updatedAt: Date;
}) => {
    return (
        <div className={"p-3 bg-card text-foreground border border-border rounded-md flex gap-6 flex-col"}>
            <div className={"flex justify-between items-center gap-4"}>
                <div className={"text-2xl"}>{props.title}</div>
                <div className={"p-2.5 bg-primary text-card rounded-md"}>{props.status}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Название</div>
                <div className={"text-sm text-foreground-secondary"}>{props.title}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Сотрудник</div>
                <div className={"text-sm text-foreground-secondary"}>{props.ownerId}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Клиент</div>
                <div className={"text-sm text-foreground-secondary"}>{props.clientId}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Сумма</div>
                <div className={"text-sm text-foreground-secondary rounded-md"}>{props.value} ₽</div>
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