import {keywords, title} from "@clover/public/utils/seo";
import { t } from '@clover/public/locale';
import {Metadata} from "next";
import {ProductPage} from "@/components/pages/product";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("产品")),
        keywords: keywords(),
    }
}

const Page = () => <ProductPage />

export default Page;
