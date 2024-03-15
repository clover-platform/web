import langList from "@clover/public/config/lang.list";
import {PropsWithChildren} from "react";

export const generateStaticParams = async () => {
    return langList.map((lang) => ({
        LANG: lang.code
    }))
}

const MultiLanguageLayout = (props: PropsWithChildren) => {
    return props.children;
};
export default MultiLanguageLayout
