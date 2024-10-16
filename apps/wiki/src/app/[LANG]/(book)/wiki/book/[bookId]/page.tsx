import {keywords, title} from "@clover/public/utils/seo";
import {BookPage} from "@/components/pages/book";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("知识库")),
    keywords: keywords(),
}

const Page = () => <BookPage />

export default Page;
