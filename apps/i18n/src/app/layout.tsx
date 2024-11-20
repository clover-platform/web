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
import {languages} from "@/rest/common";

export type RootLayoutProps = PropsWithChildren<{}>;

const RootLayout: FC<RootLayoutProps> = async (props) => {
    const locale = await getLocale();
    await changeLanguage(locale);
    const initState = await loadState();
    const { success, data } = await languages();

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
