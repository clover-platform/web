'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {BookLayoutProps} from "@/components/layout/book";
import { t } from '@easykit/common/utils/locale';
import {Book} from "@/types/pages/book";
import {FC} from "react";
import {HomeHeader} from "@/components/pages/book/home/header";
import {HomeCatalog} from "@/components/pages/book/home/catalog";
import {Divider} from "@easykit/design";

export type BookPageProps = {
    data?: Book;
}

export const BookPage: FC<BookPageProps> = (props) => {
    useLayoutConfig<BookLayoutProps>({
        path: [
            {
                title: t("知识库"),
                type: "item",
            }
        ],
        active: "home",
    });
    const { data } = props;
    return <div>
        <HomeHeader data={data} />
        <Divider orientation={"center"} />
        <HomeCatalog />
    </div>
}
