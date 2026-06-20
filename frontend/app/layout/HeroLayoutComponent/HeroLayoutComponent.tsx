import CTAButtons from "@/app/components/landing/LandingButtonsComponent";
import AdvantagesGridComponent from "@/app/components/landing/AdvantagesGridComponent";

export const HeroLayoutComponent = () => {
    return <section className={"flex items-center justify-around w-full h-max px-8"}>
        <section className={"w-1/3 flex flex-col gap-8 text-foreground"}>
            <article className={"flex flex-col gap-6"}>
                <h1 className={"font-bold font-roboto text-xl"}>
                    Управляйте продажами эффективнее
                </h1>
                <p className={"text-foreground"}>
                    Соберите клиентов, сделки и задачи в одной системе. Получайте полную картину по каждому
                    клиенту, контролируйте процессы и развивайте бизнес без хаоса в данных.
                </p>
            </article>
            <CTAButtons/>
        </section>
        <AdvantagesGridComponent />
    </section>
}