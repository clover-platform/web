import {RootLayout as PublicRootLayout} from "@/components/layout/root";
import {PropsWithChildren, FC} from "react";
import {loadState} from "@clover/public/components/layout/root/utils.server";
import {HTMLLayout} from "@clover/public/components/layout/html";
import {getLocale} from "@clover/public/utils/locale";
import { Metadata } from "next";

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

  return <HTMLLayout>
    <PublicRootLayout
      {...initState}
      locale={locale}
    >
      {props.children}
    </PublicRootLayout>
  </HTMLLayout>
}

export default RootLayout;
