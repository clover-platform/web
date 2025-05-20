import {RootLayout as PublicRootLayout} from "@/components/layout/root";
import {PropsWithChildren, FC} from "react";
import {loadState} from "@clover/public/components/layout/root/utils.server";
import {HTMLLayout} from "@clover/public/components/layout/html";
import {languages} from "@/rest/common";
import { Metadata } from "next";
import "@clover/public/plugin/rest.server";
import "@clover/public/plugin/locales";
import "@/plugin/locales";
import "@/assets/style/index.css";
import { getLocale } from "@clover/public/utils/locale.server";

export type RootLayoutProps = PropsWithChildren;

export const metadata: Metadata = {
  icons: {
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ],
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16' }
    ],
    other: [
      { url: '/site.webmanifest', rel: 'manifest' }
    ] 
  }
};

const RootLayout: FC<RootLayoutProps> = async (props) => {
  const locale = await getLocale();
  const initState = await loadState();
  const {success, data} = await languages();
  
  return <HTMLLayout>
    <PublicRootLayout
      {...initState}
      locale={locale}
      languages={success ? data! : []}
    >
      {props.children}
    </PublicRootLayout>
  </HTMLLayout>
}

export default RootLayout;
