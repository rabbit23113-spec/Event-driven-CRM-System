import Link from "next/link";
import Image from "next/image";

export const LinkBlock = (props: { iconName: string, name: string, href: string }) => {
    return (
        <Link className={"text-3.5 hover:bg-card-hover"} href={props.href}>
            <div className={"w-70 flex items-center justify-left p-3"}>
                <div className={"h-12 w-12 flex items-center justify-center"}>
                    <Image src={`/images/${props.iconName}.svg`} alt={props.name} width={25} height={25}/>
                </div>
                <div className={"text-3.5 "}>{props.name}</div>
            </div>
        </Link>
    )
}