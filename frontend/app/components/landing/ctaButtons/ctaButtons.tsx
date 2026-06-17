import CustomButton from "@/app/components/misc/button";

export const CTAButtons = () => {
    return <div className={"flex gap-3"}>
        <CustomButton variant={"primary"}>
            Начать бесплатно
        </CustomButton>
        <CustomButton variant={"outline"}>
            Демо-версия
        </CustomButton>
    </div>
}