import Deal from "@/app/components/deals/deal";
import CustomButton from "@/app/components/misc/button";

const DealsPage = () => {
    return (
        <div className={"min-h-screen w-full justify-center items-center flex flex-col gap-8 pt-24 pb-24 relative"}>
            <div
                className={"w-full border-b border-border px-24 flex justify-between items-center h-18 top-0 absolute"}>
                <div>Лиды</div>
                <CustomButton variant={"primary"}>Создать</CustomButton>
                <img src={"/images/filter.svg"}/>
            </div>
            <div className={"grid gap-24 grid-cols-4"}>
                <Deal title={"Заказ оборудования"} value={2000000} status={"Новый"} clientId={"reconquista@yandex.ru"}
                      ownerId={"Timofey Stepanov"}
                      createdAt={new Date()} updatedAt={new Date()}/>
                <Deal title={"Заказ оборудования"} value={2000000} status={"Новый"} clientId={"reconquista@yandex.ru"}
                      ownerId={"Timofey Stepanov"}
                      createdAt={new Date()} updatedAt={new Date()}/>
                <Deal title={"Заказ оборудования"} value={2000000} status={"Новый"} clientId={"reconquista@yandex.ru"}
                      ownerId={"Timofey Stepanov"}
                      createdAt={new Date()} updatedAt={new Date()}/>
                <Deal title={"Заказ оборудования"} value={2000000} status={"Новый"} clientId={"reconquista@yandex.ru"}
                      ownerId={"Timofey Stepanov"}
                      createdAt={new Date()} updatedAt={new Date()}/>
                <Deal title={"Заказ оборудования"} value={2000000} status={"Новый"} clientId={"reconquista@yandex.ru"}
                      ownerId={"Timofey Stepanov"}
                      createdAt={new Date()} updatedAt={new Date()}/>
                <Deal title={"Заказ оборудования"} value={2000000} status={"Новый"} clientId={"reconquista@yandex.ru"}
                      ownerId={"Timofey Stepanov"}
                      createdAt={new Date()} updatedAt={new Date()}/>
                <Deal title={"Заказ оборудования"} value={2000000} status={"Новый"} clientId={"reconquista@yandex.ru"}
                      ownerId={"Timofey Stepanov"}
                      createdAt={new Date()} updatedAt={new Date()}/>
                <Deal title={"Заказ оборудования"} value={2000000} status={"Новый"} clientId={"reconquista@yandex.ru"}
                      ownerId={"Timofey Stepanov"}
                      createdAt={new Date()} updatedAt={new Date()}/>
            </div>
        </div>
    )
}

export default DealsPage;