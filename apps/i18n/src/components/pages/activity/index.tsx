'use client';

import {TitleBar} from "@clover/public/components/common/title-bar";
import {useEffect, useMemo, useRef, useState} from "react";
import {list as listRest} from "@/rest/activity";
import {Activity, ActivityGroup} from "@/types/pages/activity";
import dayjs from 'dayjs';
import {ActivityList} from "@/components/pages/activity/list";
import {Button} from "@easykit/design";
import {useSearchParams} from "next/navigation";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {ModuleLayoutProps} from "@/components/layout/module";
import { t } from '@easykit/common/utils/locale';
import {useModule} from "@/hooks/use.module";

export const ActivityPage = () => {
    useLayoutConfig<ModuleLayoutProps>({
        active: "activity",
        path: [
            {
                title: t("动态"),
                type: "item",
            }
        ],
    })
    const m = useModule();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Activity[]>([]);
    const [total, setTotal] = useState(0);
    const pageRef = useRef(1);

    const load = async (options?: {append?: boolean}) => {
        const { append= false } = options || {};
        if(!append) setList([]);
        setLoading(true);
        const { success, data: result } = await listRest({
            page: pageRef.current,
            size: 10,
            module: m
        });
        const { data , total } = result!;
        setLoading(false);
        if(success) {
            setList([
                ...(append ? list : []),
                ...data
            ]);
            setTotal(total);
        }
    }

    const loadMore = async () => {
        pageRef.current += 1;
        load({append: true}).then();
    }

    useEffect(() => {
        load().then();
    }, [])

    const items = useMemo<ActivityGroup[]>(() => {
        // 分组逻辑
        const groupedByFormattedCreateTime = list.reduce((accumulator: { [key: string]: Activity[] }, currentValue: Activity) => {
            const formattedDate = dayjs(currentValue.createTime).format('YYYY-MM-DD');
            if (!accumulator[formattedDate]) {
                accumulator[formattedDate] = [];
            }
            accumulator[formattedDate].push(currentValue);
            return accumulator;
        }, {});

        // 对键进行倒序排序
        const sortedKeys = Object.keys(groupedByFormattedCreateTime).sort((a, b) => dayjs(b).diff(dayjs(a)));

        // 根据排序后的键组织成新的数组
        return sortedKeys.map(key => ({
            time: key,
            list: groupedByFormattedCreateTime[key]
        }));
    }, [list])

    return <>
        <TitleBar title={t("动态")} border={false} />
        <ActivityList
            loading={loading}
            items={items}
        />
        {
            !loading && total > list.length ? <div className={"w-full flex justify-center"}>
                <Button onClick={loadMore} variant="link">{t("加载更多")}</Button>
            </div> : null
        }
    </>
}
