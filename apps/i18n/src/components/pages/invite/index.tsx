'use client';

import {InvitePageLoading} from "@/components/pages/invite/loading";
import {InvitePageBody} from "@/components/pages/invite/page";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {InviteDetail} from "@/types/pages/module";
import {InvitePageExpired} from "@/components/pages/invite/expired";
import {InvitePageJoined} from "@/components/pages/invite/joined";
import {detail as detailRest} from "@/rest/member.invite";
import {useRecoilValue} from "recoil";
import {isLoginState} from "@clover/public/state/account";

export const InvitePage = () => {
    const search = useSearchParams();
    const token = search.get('t');
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState<InviteDetail|undefined>();
    const [expired, setExpired] = useState<boolean>(false);
    const [joined, setJoined] = useState<boolean>(false);
    const [moduleId, setModuleId] = useState<number>();
    const isLogin = useRecoilValue(isLoginState);

    const load = async () => {
        setLoading(true);
        const { success, data, code } = await detailRest(token!);
        if(success) {
            setDetail(data as InviteDetail);
        }else{
            if(code === 10033) {
                setExpired(true);
            }else if(code === 10032) {
                setJoined(true);
                setModuleId(data as number);
            }else{ // 其他情况
                setExpired(true);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        load().then();
    }, [])

    return loading ?
        <InvitePageLoading /> :
        <>
            { expired && <InvitePageExpired /> }
            { joined && <InvitePageJoined moduleId={moduleId!} /> }
            { (!expired && !joined) && <InvitePageBody isLogin={isLogin} loading={loading} detail={detail} /> }
        </>
}
