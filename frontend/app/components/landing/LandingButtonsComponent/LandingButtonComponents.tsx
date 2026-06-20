import CustomButton from "@/app/components/misc/CustomButtonComponent";

export const LandingButtonComponents = () => {
    return <div className={"flex gap-4"}>
        <CustomButton variant={"primary"}>
            Начать бесплатно
        </CustomButton>
        <CustomButton variant={"outline"}>
            Демо-версия
        </CustomButton>
    </div>
}