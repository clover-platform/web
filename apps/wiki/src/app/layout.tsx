import { RootLayout as PublicRootLayout } from "@/components/layout/root";
import { PropsWithChildren, FC } from "react";
import {changeLanguage} from "@easykit/common/utils/locale";
import {loadState} from "@clover/public/components/layout/root/utils";
import {HTMLLayout} from "@clover/public/components/layout/html";
import {getLocale} from "@clover/public/utils/locale";

export type RootLayoutProps = PropsWithChildren<{}>;

const RootLayout: FC<RootLayoutProps> = async (props) => {
    const locale = await getLocale();
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
