import CustomButton from "@/app/components/button";

export const NotFoundPage = () => {
    return <div className="flex flex-col gap-12 items-center justify-center h-screen">
        <h1 className={"text-4xl text-foreground font-medium"}>404. Страница не найдена</h1>
        <CustomButton variant={"primary"}>Вернуться на главную</CustomButton>
    </div>
}