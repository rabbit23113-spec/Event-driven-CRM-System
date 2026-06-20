import AdvantageComponent from "@/app/components/landing/AdvantageComponent";

export const AdvantagesGridComponent = () => {
    return <section className={"w-1/2 grid grid-cols-2 gap-4"}>
        <AdvantageComponent
            title={"Все клиенты в одном месте"}
            description={"Храните контакты, историю взаимодействий, сделки и задачи в единой системе. Больше не нужно искать информацию в таблицах, мессенджерах или заметках."}
        />
        <AdvantageComponent
            title={"Контроль продаж"}
            description={"Отслеживайте статус каждой сделки, контролируйте воронку продаж и не позволяйте потенциальным клиентам теряться на любом этапе."}
        />
        <AdvantageComponent
            title={"Автоматизация"}
            description={"Создавайте задачи и автоматизируйте повторяющиеся процессы, чтобы команда могла сосредоточиться на продажах."}
        />
        <AdvantageComponent
            title={"Аналитика в реальном времени"}
            description={"Получайте актуальную статистику по сделкам, клиентам и эффективности менеджеров, чтобы принимать решения на основе данных."}
        />
    </section>
}