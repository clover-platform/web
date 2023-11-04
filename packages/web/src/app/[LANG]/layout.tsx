import langList from "@/config/lang.list";
import {PropsWithChildren} from "react";

export const generateStaticParams = async () => {
    return langList.map((lang) => ({
        LANG: lang.code
    }))
}

const AppMultiLanguageLayout = (props: PropsWithChildren) => {
    return props.children;
};

export default AppMultiLanguageLayout;
