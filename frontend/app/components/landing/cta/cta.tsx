import CTAButtons from "@/app/components/landing/ctaButtons";

export const CTA = () => {
    return <div className="flex flex-col gap-12 items-center justify-center">
        <div className={"text-4xl font-medium"}>Повысьте продуктивность, используя нашу CRM</div>
        <CTAButtons/>
    </div>
}