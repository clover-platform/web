import {ModulePage} from "@/components/pages/module";
import { st } from '@clover/public/utils/locale.server';
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("国际化")),
    keywords: await keywords(),
  }
}

export default function Page() {
  return <ModulePage /> 
}
