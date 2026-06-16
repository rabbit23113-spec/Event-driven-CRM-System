"use client"

import Input from "@/app/components/input";
import {Checkbox} from "@headlessui/react";
import {useState} from "react";
import CustomButton from "@/app/components/button";

const SignUpPage = () => {
    const [enabled, setEnabled] = useState(false)
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
            <div className={"flex gap-2"}>
                <Checkbox
                    checked={enabled}
                    onChange={setEnabled}
                    className="group block size-4.5 rounded bg-card data-checked:bg-primary shadow-sm"
                >
                    <svg className="stroke-white opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Checkbox>
                <div className={"text-sm"}>
                    Подтверждаю согласие на обработку <span className={"font-medium text-primary"}>персональных данных</span>
                </div>

            </div>
            <div className={"text-sm"}>
                Уже есть аккаунт? <span className={"font-medium text-primary"}>Войти</span>
            </div>
            <CustomButton variant={"primary"}>Зарегистрироваться</CustomButton>
        </div>
    </div>
}

export default SignUpPage;