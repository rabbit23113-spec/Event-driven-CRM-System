import CustomButton from "@/app/components/button";

export const HeaderAuthButtons = () => {
    return <div className={"flex gap-3"}>
        <CustomButton variant={"primary"}>Регистрация</CustomButton>
        <CustomButton variant={"outline"}>Вход</CustomButton>
    </div>
}