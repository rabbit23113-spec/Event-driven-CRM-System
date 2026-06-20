import Hero from "@/app/layout/HeroLayoutComponent";
import Header from "@/app/layout/HeaderLayoutComponent";
import HeaderLayoutComponent from "@/app/layout/HeaderLayoutComponent";
import HeroLayoutComponent from "@/app/layout/HeroLayoutComponent";
import FooterLayoutComponent from "@/app/layout/FooterLayoutComponent";

export default function Home() {
    return (
        <div className={"h-screen justify-center items-center flex flex-col"}>
            <HeaderLayoutComponent />
            <HeroLayoutComponent />
            <FooterLayoutComponent />
        </div>
    );
}
