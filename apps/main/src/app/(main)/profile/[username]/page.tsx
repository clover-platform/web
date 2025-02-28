import {keywords, title} from "@clover/public/utils/seo";
import {t} from '@clover/public/locale';
import {Metadata} from "next";
import {ProfilePage} from "@/components/pages/profile";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("个人资料")),
    keywords: keywords(),
  }
}

const Page = () => <ProfilePage />

export default Page;
