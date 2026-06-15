import Image from "next/image";
import {CustomButton} from "@/app/components/button/button";

export default function Home() {
    return (
        <div>
            <div className={"flex justify-center items-center w-full h-screen gap-20"}>
                <div>
                    <div className={"flex flex-col items-start justify-center w-200 gap-5"}>
                        <div className={"font-semibold text-foreground text-[40px] line leading-12"}>Контролируйте каждый этап работы с клиентами</div>
                        <div className={"font-medium text-foreground-secondary"}>Все изменения клиентов, сделок и задач сохраняются в виде событий. Полная прозрачность, аудит и контроль над бизнес-процессами.
                        </div>
                        <div className={"flex items-center justify-center gap-2"}>
                            <CustomButton variant={"primary"}>Начать бесплатно</CustomButton>
                            <CustomButton variant={"outline"}>Войти в систему</CustomButton>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={"flex items-center w-200 flex-wrap"}>
                        <div
                            className={"bg-[url('./images/functionality.png')] bg-cover bg-center bg-no-repeat h-80 w-90 flex justify-center mr-4 rounded-md"}>
                            <div className={"relative top-50 bg-card h-max py-2 px-3 rounded-md border border-border"}>
                                <div>Удобный функционал</div>
                                <div>Описание удобного функционала</div>
                            </div>
                        </div>
                        <div className={"bg-[url('./images/tasks.png')] bg-cover bg-center bg-no-repeat h-80 w-90 flex justify-center rounded-md"}>
                            <div className={"relative top-50 bg-card h-max py-2 px-3 rounded-md border border-border w-70"}>
                                <div>Аналитика</div>
                                <div>Доступная аналитика о каждом совершенном действии</div>
                            </div>
                        </div>
                        <div
                            className={"bg-[url('./images/kanban-doska.png')] bg-cover bg-center bg-no-repeat h-80 w-180 flex justify-center rounded-md mt-4"}>
                            <div className={"relative top-50 bg-card h-max py-2 px-3 rounded-md border border-border"}>
                                <div>Kanban-доска задач</div>
                                <div>Особенно полезно для менеджеров</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
