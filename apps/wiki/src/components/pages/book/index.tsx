'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {BookLayoutProps} from "@/components/layout/book";
import { t } from '@easykit/common/utils/locale';
import {Book} from "@/types/pages/book";
import {FC, useState} from "react";
import {HomeHeader} from "@/components/pages/book/home/header";
import {HomeCatalog} from "@/components/pages/book/home/catalog";
import {Divider} from "@easykit/design";
import {HomeEditor} from "@/components/pages/book/home/editor";

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
    const [editing, setEditing] = useState(false);
    const [homeContent, setHomeContent] = useState<string | undefined>(data?.homePage?.content);

    return <div className={"space-y-4"}>
        <HomeHeader data={data} onEdit={() => setEditing(true)} />
        <HomeEditor
            path={data?.path!}
            editing={editing} value={homeContent!}
            onSuccess={(content) => {
                setHomeContent(content);
                setEditing(false);
            }}
            onCancel={() => setEditing(false)}
        />
        { editing ? null : <Divider orientation={"center"} /> }
        <HomeCatalog />
    </div>
}
