import {ButtonHTMLAttributes, HTMLProps} from "react";
import {cn} from "@/app/utils/classes";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "outline" | "success" | "danger";
}

export const CustomButton = ({variant, className, children, ...props}: ButtonProps) => {
    const base = "px-3 py-2 rounded-md text-3.5";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover",
        outline: "border border-border text-foreground",
        success: "bg-success text-white",
        danger: "bg-danger text-white",
    };
    return <button {...props} className={cn(base, variants[variant], className)}>{children}</button>

}