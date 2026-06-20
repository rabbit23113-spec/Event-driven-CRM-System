"use client"

import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {RechartsDevtools} from "@recharts/devtools";
import TaskComponent from "@/app/components/tasks/task";
import CustomButton from "@/app/components/misc/CustomButtonComponent";

const DashboardPage = () => {
    const data = [
        {name: 'Янв', сумма: 150000},
        {name: 'Февр', сумма: 200000},
        {name: 'Мар', сумма: 190000},
        {name: 'Апр', сумма: 210000},
        {name: 'Май', сумма: 220000},
        {name: 'Июн', сумма: 230000},
        {name: 'Июл', сумма: 185000},
        {name: 'Авг', сумма: 300000},
        {name: 'Сен', сумма: 280000},
        {name: 'Окт', сумма: 260000},
        {name: 'Ноя', сумма: 310000},
        {name: 'Дек', сумма: 330000},
    ];
    return (
        <div className={"min-h-screen w-full justify-around items-center flex my-10 flex-col"}>
            <div className={"font-medium text-4xl"}>
                Быстрая аналитика
            </div>
            <div className={"flex justify-center gap-20 items-center w-full p-15"}>
                <div>
                    <div className={"font-medium"}>
                        Статистика
                    </div>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div className={"flex justify-between w-80 h-85 p-5 shadow-sm rounded-md flex-col"}>
                            <div className={"font-medium text-2xl"}>Число клиентов</div>
                            <div className={"w-full flex justify-end text-4xl font-bold"}>28</div>
                        </div>
                        <div className={"flex justify-between w-80 h-85 p-5 shadow-sm rounded-md flex-col"}>
                            <div className={"font-medium text-2xl"}>Активные сделки</div>
                            <div className={"w-full flex justify-end text-4xl font-bold"}>17</div>
                        </div>
                        <div className={"flex justify-between w-80 h-85 p-5 bg-error text-card rounded-md flex-col"}>
                            <div className={"font-medium text-2xl"}>Проваленные задачи</div>
                            <div className={"w-full flex justify-end text-4xl font-bold"}>3</div>
                        </div>
                        <div
                            className={"flex justify-between w-80 h-85 p-5 text-card bg-foreground shadow-sm rounded-md flex-col"}>
                            <div className={"font-medium text-2xl"}>Сумма активных сделок</div>
                            <div className={"w-full flex justify-end text-4xl font-bold"}>2.000.000 ₽</div>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <div className={"font-medium text-2xl"}>График выручки по месяцам</div>
                    <div className="w-200 h-160 bg-card">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Line type="monotone" dataKey="сумма" stroke="#8884d8"/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className={"font-medium text-4xl"}>
                Мои задачи
            </div>
            <div>
                <div className={"flex justify-bas flex-col gap-6 items-start w-full p-15"}>
                    <div className={"flex gap-4"}>
                        <TaskComponent
                            title={"Разработать макет"}
                            description={""}
                            priority={"Высокий"}
                            assignee_id={"Stepan Efimov"} dueDate={new Date()}
                            createdAt={new Date()} updatedAt={new Date()}
                        />
                        <TaskComponent
                            title={"Разработать макет"}
                            description={""}
                            priority={"Высокий"}
                            assignee_id={"Stepan Efimov"} dueDate={new Date()}
                            createdAt={new Date()} updatedAt={new Date()}
                        />
                        <TaskComponent
                            title={"Разработать макет"}
                            description={""}
                            priority={"Высокий"}
                            assignee_id={"Stepan Efimov"} dueDate={new Date()}
                            createdAt={new Date()} updatedAt={new Date()}
                        />
                        <TaskComponent
                            title={"Разработать макет"}
                            description={""}
                            priority={"Высокий"}
                            assignee_id={"Stepan Efimov"} dueDate={new Date()}
                            createdAt={new Date()} updatedAt={new Date()}
                        />
                        <TaskComponent
                            title={"Разработать макет"}
                            description={""}
                            priority={"Высокий"}
                            assignee_id={"Stepan Efimov"} dueDate={new Date()}
                            createdAt={new Date()} updatedAt={new Date()}
                        />
                    </div>
                    <CustomButton variant={"primary"}>Перейти ко всем задачам</CustomButton>
                </div>
            </div>
            <div className={"flex flex-col gap-6 items-center justify-center"}>
                <div className={"font-medium text-4xl"}>
                    Быстрые действия
                </div>
                <div className={"flex gap-4"}>
                    <CustomButton variant={"primary"}>Новый лид</CustomButton>
                    <CustomButton variant={"primary"}>Новая сделка</CustomButton>
                    <CustomButton variant={"primary"}>Новый клиент</CustomButton>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;