import {keywords, title} from "@/utils/seo";
import HomePage from "@/components/pages/home";

export const metadata = {
    title: title("{#首页#}"),
    keywords: keywords(),
}

const Page = () => <HomePage />

export default Page;
