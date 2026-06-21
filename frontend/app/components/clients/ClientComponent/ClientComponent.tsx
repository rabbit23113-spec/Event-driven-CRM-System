"use client"

export const ClientComponent = (props: {
    name: string,
    status: string,
    email: string,
    phone: string,
    ownerId: string,
    companyName: string,
    createdAt: Date,
    updatedAt: Date,
    onClick?: () => void,
}) => {
    return (
        <div onClick={props.onClick} className={"p-3 bg-card text-foreground border border-border rounded-md flex gap-5 flex-col hover:bg-card-hover"}>
            <div className={"flex justify-between items-center gap-3.5"}>
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
                <div className={"font-medium"}>Ответственный</div>
                <div className={"text-sm text-foreground-secondary"}>{props.ownerId}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Компания</div>
                <div className={"text-sm text-foreground-secondary"}>{props.companyName}</div>
            </div>
        </div>
    )
}