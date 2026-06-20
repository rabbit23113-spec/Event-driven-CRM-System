import CustomButton from "@/app/components/misc/CustomButtonComponent";
import Lead from "@/app/components/leads/lead";

const LeadsPage = () => {
    return (
        <div className={"min-h-screen w-full justify-center items-center flex flex-col gap-8 pt-24 pb-24 relative"}>
            <div className={"w-full border-b border-border px-24 flex justify-between items-center h-18 top-0 absolute"}>
                <div>Лиды</div>
                <CustomButton variant={"primary"}>Создать</CustomButton>
                <img src={"/images/filter.svg"}/>
            </div>
            <div className={"grid gap-24 grid-cols-4"}>
                <Lead name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      source={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Lead name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      source={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Lead name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      source={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Lead name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      source={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Lead name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      source={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Lead name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      source={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Lead name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      source={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Lead name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      source={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
            </div>
        </div>
    )
}

export default LeadsPage;