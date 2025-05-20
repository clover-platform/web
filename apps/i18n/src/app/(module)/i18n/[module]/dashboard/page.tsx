import { keywords, title } from "@clover/public/utils/seo";
import { DashboardPage } from "@/components/pages/dashboard";
import { st } from '@clover/public/utils/locale.server';
import { Metadata } from "next";
import { ModulePageProps } from "@/types/pages/module";
import { dashboard } from "@/rest/module";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("概览")),
    keywords: await keywords(),
  };
}

const Page = async (props: ModulePageProps) => {
  const { module } = await props.params;
  const { data } = await dashboard(module);
  const { detail, languages, members, count } = (data || {});
  return <DashboardPage
    detail={detail}
    languages={languages}
    members={members}
    count={count}
  />
}

export default Page;
