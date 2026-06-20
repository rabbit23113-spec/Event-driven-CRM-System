import {ButtonHTMLAttributes, HTMLProps} from "react";
import {cn} from "@/app/utils/classes";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "outline" | "success" | "danger";
}

export const CustomButtonComponent = ({variant, className, children, ...props}: ButtonProps) => {
    const base = "p-3 text-sm font-roboto font-medium min-w-20 rounded-md";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover",
        outline: "bg-card border border-border text-foreground hover:bg-card-hover",
        success: "bg-success text-white",
        danger: "bg-danger text-white",
    };
    return <button {...props} className={cn(base, variants[variant], className)}>{children}</button>

}