"use client"

import Input from "@/app/components/misc/input";
import {Checkbox} from "@headlessui/react";
import CustomButton from "@/app/components/misc/button";
import CustomCheckbox from "@/app/components/misc/checkbox";
import Link from "next/link";

const SignUpPage = () => {
    return <div className={"min-h-screen w-full justify-center items-center flex flex-col gap-8 pt-24 pb-24"}>
        <div className={"flex flex-col gap-8 justify-center items-start"}>
            <div className={"text-foreground text-2xl"}>
                Зарегистрируйтесь, чтобы начать использование
            </div>
            <div className={"flex flex-col gap-12"}>
                <Input label={"Имя"} placeholder={"Введите имя"}/>
                <Input label={"Фамилия"} placeholder={"Введите фамилию"}/>
                <Input label={"E-mail"} placeholder={"Введите e-mail"}/>
                <Input label={"Пароль"} placeholder={"Придумайте пароль"}/>
                <Input label={"Повторите пароль"} placeholder={"Повторите пароль"}/>
            </div>
            <CustomCheckbox label={<p>Подтверждаю согласие на обработку <span className={"font-medium text-primary"}>персональных данных</span></p>} />
            <div className={"text-sm"}>
                Уже есть аккаунт? <Link className={"font-medium text-primary"} href={"/signin"}>Войти</Link>
            </div>
            <CustomButton variant={"primary"}>Зарегистрироваться</CustomButton>
        </div>
    </div>
}

export default SignUpPage;