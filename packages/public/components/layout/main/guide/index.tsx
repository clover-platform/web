import {LoginLayout} from "@clover/public/components/layout/login";
import { GuideNav } from "@clover/public/components/layout/main/guide/nav";
import { useState } from "react";
import { GuideCreate } from "@clover/public/components/layout/main/guide/create";

export type GuideStep = 'nav' | 'create';

export const Guide = () => {
    const [step, setStep] = useState<GuideStep>('nav');

    return <LoginLayout showLogo={false}>
        <div className={"container flex-1 flex justify-center items-center flex-col"}>
            {step === 'nav' && <GuideNav onCreate={() => setStep("create")} />}
            {step === 'create' && <GuideCreate onBack={() => setStep("nav")} />}
        </div>
    </LoginLayout>
}
