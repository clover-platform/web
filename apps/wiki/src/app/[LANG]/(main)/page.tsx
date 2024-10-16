import {keywords, title} from "@clover/public/utils/seo";
import { Metadata } from "next";
import {st} from "@clover/public/utils/locale";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(st("首页")),
        keywords: keywords(),
    }
}

const Page = () => <></>

export default Page;
