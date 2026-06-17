import CustomButton from "@/app/components/misc/button";
import CTAButtons from "@/app/components/landing/ctaButtons";

export const Hero = () => {
    return <div className={"flex items-center justify-center gap-29"}>
        <div className={"flex flex-col gap-12 text-foreground w-165"}>
            <div className={"flex flex-col gap-6"}>
                <div className={"font-medium text-4xl"}>
                    Управляйте продажами эффективнее
                </div>
                <div className={"text-foreground"}>
                    Соберите клиентов, сделки и задачи в одной системе. Получайте полную картину по каждому
                    клиенту, контролируйте процессы и развивайте бизнес без хаоса в данных.
                </div>
            </div>
            <CTAButtons />
        </div>
        <div className={"flex flex-col gap-5"}>
            <img className={"object-cover h-57.5 w-132.5 rounded-md"} src={"/images/landing-clients.png"}/>
            <div className={"flex gap-5"}>
                <img className={"object-cover h-57.5 w-62.5 rounded-md"} src="/images/functionality.png"/>
                <img className={"object-cover h-57.5 w-62.5 rounded-md"} src="/images/kanban-doska.png"/>
            </div>
        </div>
    </div>
}