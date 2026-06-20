import CustomButton from "@/app/components/misc/CustomButtonComponent";
import Client from "@/app/components/clients/client";

const ClientsPage = () => {
    return (
        <div className={"min-h-screen w-full justify-center items-center flex flex-col gap-8 pt-24 pb-24 relative"}>
            <div className={"w-full border-b border-border px-24 flex justify-between items-center h-18 top-0 absolute"}>
                <div>Клиенты</div>
                <CustomButton variant={"primary"}>Создать</CustomButton>
                <img src={"/images/filter.svg"}/>
            </div>
            <div className={"grid gap-24 grid-cols-4 mt-16"}>
                <Client name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      companyName={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Client name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      companyName={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Client name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      companyName={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Client name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      companyName={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Client name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      companyName={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Client name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      companyName={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Client name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      companyName={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
                <Client name={"ООО Реконкиста"} status={"Новый"} email={"reconquista@yandex.ru"}
                      phone={"+7 900 123-45-67"} ownerId={"Timofey Stepanov"}
                      companyName={"ВКонтакте"} createdAt={new Date()} updatedAt={new Date()} />
            </div>
        </div>
    )
}

export default ClientsPage;