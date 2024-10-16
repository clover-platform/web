'use client';

import { TitleBar } from "@clover/public/components/common/title-bar";
import {
    Button,
    Space,
    Table,
    TableBody,
    Separator,
    ValueFormatter,
    TableHeader,
    TableRow,
    TableHead,
    Loading, TableCell, Empty, ScrollArea, ScrollBar
} from "@easykit/design";
import Link from "next/link";
import { i18n } from "@easy-kit/i18n/utils";
import { DetailInfoItem } from "@/components/pages/dashboard/detail/info-item";
import { DetailTitle } from "@/components/pages/dashboard/detail/title";
import { dashboard } from "@/rest/module";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {LanguageItem} from "@/components/pages/dashboard/language-item";
import { MemberItem } from "@/components/pages/dashboard/member-item";
import {Member, ModuleCount, ModuleDetail} from "@/types/pages/module";
import { useRecoilValue } from "recoil";
import { languagesState } from "@/state/public";
import {Language, LanguageWithCount} from "@/types/pages/public";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {ModuleLayoutProps} from "@/components/layout/module";
import { t } from '@easykit/common/utils/locale';

export const DashboardPage = () => {
    useLayoutConfig<ModuleLayoutProps>({
        active: "dashboard",
        path: [
            {
                title: t("概览"),
                type: "item",
            }
        ],
    })
    const search = useSearchParams();
    const id = search.get("id");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState<LanguageWithCount[]>([]);
    const [detail, setDetail] = useState<ModuleDetail>({});
    const [members, setMembers] = useState<Member[]>([]);
    const [count, setCount] = useState<ModuleCount>();
    const all = useRecoilValue(languagesState);

    const load = async () => {
        setLoading(true);
        const { success, data} = await dashboard(Number(id));
        if(success) {
            const { detail, languages, members, count } = data;
            setDetail(detail);
            setLanguages(languages);
            setMembers(members);
            setCount(count);
        }
        setLoading(false);
    }

    useEffect(() => {
        load().then();
    }, []);

    const onRowClick = (item: Language) => {
        router.push(`/{#LANG#}/i18n/worktop/?id=${id}&target=${item.code}`);
    }

    const actions = <Space>
        <Link href={"/{#LANG#}/i18n/worktop/?id=" + id}>
            <Button>{t("工作台")}</Button>
        </Link>
    </Space>;

    return <>
        <TitleBar
            title={t("概览")}
            actions={actions}
            border={false}
        />
        <Loading loading={loading}>
            <div className={"flex justify-start items-start"}>
                <div className={"flex-1 mr-4 w-0 flex-shrink-0"}>
                    <ScrollArea className={"w-full pb-2"}>
                        <Table className={"min-w-[600px]"}>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t("语言")}</TableHead>
                                    <TableHead className={"w-64"}>{t("进度")}</TableHead>
                                    <TableHead className={"w-24"}></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    languages.length === 0 && <TableRow>
                                        <TableCell colSpan={3}>
                                            <Empty />
                                        </TableCell>
                                    </TableRow>
                                }
                                { languages.map((item) => <LanguageItem onClick={() => onRowClick(item)} key={item.id} {...item} />) }
                            </TableBody>
                        </Table>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
                <div className={"w-96 bg-muted p-4 rounded-md"}>
                    <DetailTitle title={t("详情")}>
                        {i18n(t("编号：%id"), {id})}
                    </DetailTitle>
                    <div className={"space-y-3"}>
                        <DetailInfoItem label={t("源语言")}>
                            { all.filter((item) => item.code === detail.source).map((item) => item.name).join("") || '' }
                        </DetailInfoItem>
                        <DetailInfoItem label={t("项目成员")}>
                            {count?.memberCount || '--'}
                        </DetailInfoItem>
                        <DetailInfoItem label={t("词条")}>
                            {count?.wordCount || '--'}
                        </DetailInfoItem>
                        <DetailInfoItem label={t("创建时间")}>
                            <ValueFormatter value={detail.createTime} formatters={["time"]}/>
                        </DetailInfoItem>
                        <DetailInfoItem label={t("更新时间")}>
                            <ValueFormatter value={detail.updateTime} formatters={["time"]}/>
                        </DetailInfoItem>
                    </div>
                    <Separator className={"my-4"}/>
                    <DetailTitle title={t("管理员")}/>
                    <div className={"space-y-3"}>
                        { members.map((item) => <MemberItem key={item.id} {...item} />) }
                    </div>
                </div>
            </div>
        </Loading>
    </>
}
