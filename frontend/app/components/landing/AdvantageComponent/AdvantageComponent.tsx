export const AdvantageComponent = (props: { title: string, description: string }) => {
    return (
        <div className={"rounded-md gap-2 bg-card flex flex-col justify-center items-start p-5"}>
            <h2 className={"font-semibold font-roboto text-lg"}>{props.title}</h2>
            <p>
                {props.description}
            </p>
        </div>
    )
}