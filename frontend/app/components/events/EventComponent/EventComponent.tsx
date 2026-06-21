export const EventComponent = (props: {
    domain: string;
    action: string;
    actorId: string;
    subjectId: string;
    createdAt: Date;
}) => {
    return (
        <div className={"rounded-md p-8 w-full gap-8 text-foreground flex items-center justify-center bg-card"}>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Домен</div>
                <div className={"text-sm"}>{props.domain}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Действие</div>
                <div className={"text-sm text-success"}>{props.action}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Совершил</div>
                <div className={"text-sm"}>{props.actorId}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Субъект</div>
                <div className={"text-sm"}>{props.subjectId}</div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"font-medium"}>Дата</div>
                <div className={"text-sm"}>{props.createdAt.toLocaleString()}</div>
            </div>
        </div>
    )
}