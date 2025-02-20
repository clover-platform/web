import {keywords, title} from "@clover/public/utils/seo";
import { t } from '@clover/public/locale';
import {Metadata} from "next";
import {OTPBindPage} from "@/components/pages/otp-bind";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("绑定二次验证")),
        keywords: keywords(),
    }
}

const Page = () => <OTPBindPage />

export default Page;
