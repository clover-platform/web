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
    Loading, TableCell, Empty
} from "@atom-ui/core";
import Link from "next/link";
import { i18n } from "@easy-kit/i18n/utils";
import { DetailInfoItem } from "@/components/pages/module/dashboard/detail/info-item";
import { DetailTitle } from "@/components/pages/module/dashboard/detail/title";
import { dashboard } from "@/rest/module";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {Language, LanguageItem} from "@/components/pages/module/dashboard/language-item";
import {User, users} from "@clover/public/rest/account";

export type ModuleDetail = {
    id?: number;
    source?: string;
    memberSize?: number;
    wordSize?: number;
    createTime?: string;
    updateTime?: string;
}

export type Member = User & {
    type: number;
}

export const DashboardPage = () => {
    const search = useSearchParams();
    const id = search.get("id");
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [detail, setDetail] = useState<ModuleDetail>({});
    const [members, setMembers] = useState<Member[]>([]);

    const load = async () => {
        setLoading(true);
        const { success, data} = await dashboard(Number(id));
        if(success) {
            const { detail, languages, members } = data;
            setDetail(detail);
            setLanguages(languages);
            const ids = members.map((item: any) => item.id);
            const result = await users(ids);
            if(success) {
                setMembers(result.data?.map((user) => {
                    return {
                        ...user,
                        type: members.find((item: {id: number, type: number}) => item.id === user.id)?.type || 0
                    };
                }) || []);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        load().then();
    }, []);

    const actions = <Space>
        <Link href={"/{#LANG#}/i18n/module/worktop/"}>
            <Button>{"{#工作台#}"}</Button>
        </Link>
    </Space>;

    return <>
        <TitleBar
            title={"{#概览#}"}
            actions={actions}
            border={false}
        />
        <Loading loading={loading}>
            <div className={"flex justify-start items-start"}>
                <div className={"flex-1 mr-4"}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{"{#语言#}"}</TableHead>
                                <TableHead className={"w-64"}>{"{#进度#}"}</TableHead>
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
                            { languages.map((item) => <LanguageItem key={item.id} {...item} />) }
                        </TableBody>
                    </Table>
                </div>
                <div className={"w-96 bg-muted p-4 rounded-md"}>
                    <DetailTitle title={"{#详情#}"}>
                        {i18n("{#编号：%id#}", {id})}
                    </DetailTitle>
                    <div className={"space-y-3"}>
                        <DetailInfoItem label="{#源语言#}">
                            {detail.source || '--'}
                        </DetailInfoItem>
                        <DetailInfoItem label="{#项目成员#}">
                            {detail.memberSize || '--'}
                        </DetailInfoItem>
                        <DetailInfoItem label="{#词条#}">
                            {detail.wordSize || '--'}
                        </DetailInfoItem>
                        <DetailInfoItem label="{#创建时间#}">
                            <ValueFormatter value={detail.createTime} formatters={["time"]}/>
                        </DetailInfoItem>
                        <DetailInfoItem label="{#更新时间#}">
                            <ValueFormatter value={detail.updateTime} formatters={["time"]}/>
                        </DetailInfoItem>
                    </div>
                    <Separator className={"my-4"}/>
                    <DetailTitle title={"{#管理员#}"}/>
                </div>
            </div>
        </Loading>
    </>
}
