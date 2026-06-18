import CustomButton from "@/app/components/misc/button";

export const Deal = (props: {
    title: string,
    value: number,
    status: string,
    clientId: string,
    ownerId: string,
    createdAt: Date;
    updatedAt: Date;
}) => {
    return (
        <div className={"p-3 bg-card text-foreground border border-border rounded-md flex gap-5 flex-col"}>
            <div className={"flex justify-between items-center gap-3.5"}>
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
                <div className={"p-2 w-fit text-sm bg-foreground text-card rounded-md"}>{props.value} ₽</div>
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