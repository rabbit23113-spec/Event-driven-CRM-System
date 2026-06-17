import Hero from "@/app/layout/hero";
import Advantages from "@/app/components/landing/advantages";
import CTA from "@/app/components/landing/cta";

export default function Home() {
    return (
        <div className={"min-h-screen justify-center items-center flex flex-col gap-30 pt-24 pb-24"}>
            <Hero/>
            <Advantages/>
            <CTA />
        </div>
    );
}
