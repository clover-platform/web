import {keywords, title} from "@/utils/seo";
import { Button } from '@clover/core/components/ui/button';

export const metadata = {
    title: title("{#首页#}"),
    keywords: keywords(),
}

const Page = () => <>
    <Button>Test</Button>
</>

export default Page;
