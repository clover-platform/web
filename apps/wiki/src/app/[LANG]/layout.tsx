import { RootLayout as PublicRootLayout } from "@/components/layout/root";
import { PropsWithChildren, FC } from "react";
import "@/plugin/rest.server";
import "@clover/public/plugin/rest.server";
import "@clover/public/plugin/locales";
import '@/assets/style/index.scss';
import {changeLanguage} from "@easykit/common/utils/locale";
import {loadState} from "@clover/public/components/layout/root/utils";

export type RootLayoutProps = PropsWithChildren<{
    params: {
        LANG: string;
    };
}>;

const RootLayout: FC<RootLayoutProps> = async (props) => {
    const { LANG } = props.params;
    await changeLanguage(LANG);
    const initState = await loadState();

    return <PublicRootLayout
        {...initState}
        locale={LANG}
    >
        {props.children}
    </PublicRootLayout>
}

export default RootLayout;
