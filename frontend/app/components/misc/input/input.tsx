import {HTMLProps} from "react";

type InputProps = HTMLProps<HTMLInputElement> & { label: string };

export const Input = (props: InputProps) => {
    return (
        <div className={"flex flex-col gap-2 w-lg"}>
            <div className={"text-foreground"}>
                {props.label}
            </div>
            <input {...props} className={"p-3 w-full bg-card rounded-md text-sm text-foreground outline-0 focus:shadow-sm"}/>
        </div>
    )
}