import {keywords, title} from "@clover/public/utils/seo";
import {Metadata} from "next";
import {MFAPage} from "@/components/pages/profile/security/mfa";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("二次验证")),
    keywords: await keywords(),
  }
}

const Page = () => <MFAPage />

export default Page;
