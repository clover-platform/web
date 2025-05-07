import {keywords, title} from "@clover/public/utils/seo";
import {Metadata} from "next";
import {ProfilePage} from "@/components/pages/profile";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("个人资料")),
    keywords: await keywords(),
  }
}

const Page = () => <ProfilePage />

export default Page;
