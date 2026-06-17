export const Opportunity = (props: { icon: string, title: string, description: string }) => {
    return (
        <div className={"w-134 h-26.75 bg-card flex gap-6 items-center justify-center"}>
            <div className={"p-2 border border-border rounded-md flex items-center justify-center"}>
                <img className={"object-contain w-full h-full"} src={`/images/${props.icon}.svg`} alt={props.title} />
            </div>
            <div className={"flex flex-col gap-2"}>
                <div className={"text-foreground"}>{props.title}</div>
                <div className={"text-sm text-foreground-secondary"}>{props.description}</div>
            </div>
        </div>
    )
}