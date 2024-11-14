import { RootLayout as PublicRootLayout } from "@/components/layout/root";
import { PropsWithChildren, FC } from "react";
import "@/plugin/rest.server";
import "@clover/public/plugin/rest.server";
import "@/plugin/locales";
import "@clover/public/plugin/locales";
import '@/assets/style/index.scss';
import {changeLanguage} from "@easykit/common/utils/locale";
import {loadState} from "@clover/public/components/layout/root/utils";
import {HTMLLayout} from "@clover/public/components/layout/html";
import {getLocale} from "@clover/public/utils/locale";

export type RootLayoutProps = PropsWithChildren<{}>;

const RootLayout: FC<RootLayoutProps> = async (props) => {
    const locale = getLocale();
    await changeLanguage(locale);
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
