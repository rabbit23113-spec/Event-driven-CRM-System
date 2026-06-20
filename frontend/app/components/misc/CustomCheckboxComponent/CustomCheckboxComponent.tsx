import {JSX, useState} from "react";
import {Checkbox, CheckboxProps} from "@headlessui/react";

export const CustomCheckboxComponent = (props: CheckboxProps & { label: string | JSX.Element }) => {
    const [enabled, setEnabled] = useState(false)
    return <div className={"flex gap-2"}>
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
            {props.label}
        </div>
    </div>
}