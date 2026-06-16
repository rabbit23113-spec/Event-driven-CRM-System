import Opportunity from "@/app/components/opportunity";

export const Advantages = () => {
    return <div className={"flex items-center justify-center flex-col gap-16"}>
        <div className={"text-4xl font-medium text-foreground"}>
            Максимум возможностей. Бесплатно
        </div>
        <div className={"grid grid-cols-2 grid-rows-2 gap-16 place-items-center"}>
            <Opportunity
                icon={"constellation"}
                title={"Все данные в одном месте"}
                description={"Вся информация о клиентах, сделках и задачах собрана в одном месте и всегда доступна вашей команде."}
            />
            <Opportunity
                icon={"transaction"}
                title={"Гибкий контроль продаж"}
                description={"Отслеживайте каждую сделку на всех этапах воронки и не упускайте потенциальных клиентов."}
            />
            <Opportunity
                icon={"chart-03"}
                title={"Повышение продуктивности"}
                description={"Смело забудьте про рутину и сосредоточьтесь исключительно на важных задачах."}
            />
            <Opportunity
                icon={"user-group-02"}
                title={"Работа в команде"}
                description={"Командная работа становится особенно связной и продуктивной за счет аудита и доски задач в реальном времени."}
            />
        </div>
    </div>
}