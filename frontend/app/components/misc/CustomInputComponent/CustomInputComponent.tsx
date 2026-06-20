import {HTMLProps} from "react";

type InputProps = HTMLProps<HTMLInputElement> & { label: string };

export const CustomInputComponent = (props: InputProps) => {
    return (
        <div className={"flex flex-col gap-2 w-lg"}>
            <div className={"text-foreground text-lg font-medium"}>
                {props.label}
            </div>
            <input {...props} className={"p-3 w-full bg-card rounded-md text-sm text-foreground outline-0"}/>
        </div>
    )
}