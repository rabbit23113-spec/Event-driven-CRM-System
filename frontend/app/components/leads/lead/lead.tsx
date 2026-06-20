import CustomButton from "@/app/components/misc/CustomButtonComponent";

export const Lead = (props: {
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
        <div className={"p-3 bg-card text-foreground border border-border rounded-md flex gap-5 flex-col"}>
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
                <div className={"font-medium"}>Сотрудник</div>
                <div className={"text-sm text-foreground-secondary"}>{props.ownerId}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Источник</div>
                <div className={"text-sm text-foreground-secondary"}>{props.source}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Создано</div>
                <div className={"text-sm text-foreground-secondary"}>{props.createdAt.toLocaleString()}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Обновлено</div>
                <div className={"text-sm text-foreground-secondary"}>{props.updatedAt.toLocaleString()}</div>
            </div>
            <div className={"flex justify-between items-center"}>
                <CustomButton variant={"outline"}><img src={"/images/edit-01.svg"} alt={"edit"}/></CustomButton>
                <CustomButton variant={"primary"}><img src={"/images/delete-01.svg"} alt={"delete"}/></CustomButton>
            </div>
        </div>
    )
}