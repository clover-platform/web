import {keywords, title} from "@clover/public/utils/seo";
import {t} from '@clover/public/utils/i18next';
import {Metadata} from "next";
import {MFAPage} from "@/components/pages/profile/security/mfa";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("二次验证")),
    keywords: keywords(),
  }
}

const Page = () => <MFAPage />

export default Page;
