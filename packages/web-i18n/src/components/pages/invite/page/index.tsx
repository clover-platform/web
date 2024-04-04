import {Button, useMessage} from "@atom-ui/core";
import {LanguageIcon} from "@/components/common/language-icon";
import {FC, useState} from "react";
import {InviteDetail} from "@/types/pages/module";
import {MemberRole} from "@/components/pages/member/role";
import {accept} from "@/rest/member.invite";
import {useRouter, useSearchParams} from "next/navigation";

export type InvitePageBodyProps = {
    loading: boolean;
    isLogin: boolean;
    detail?: InviteDetail;
}

export const InvitePageBody: FC<InvitePageBodyProps> = (props) => {
    const { isLogin, detail } = props;
    const search = useSearchParams();
    const token = search.get("t");
    const [submitting, setSubmitting] = useState(false);
    const msg = useMessage();
    const router = useRouter();

    const login = () => {
        location.href = `/{#LANG#}/login/?from=${encodeURIComponent(location.href)}`
    }

    const register = () => {
        location.href = `/{#LANG#}/register/?from=${encodeURIComponent(location.href)}`
    }

    const acceptInvite = async () => {
        setSubmitting(true);
        const { success, message, data } = await accept({token: token!});
        setSubmitting(false);
        if(success) {
            router.push("/{#LANG#}/i18n/dashboard/?id=" + data);
        }else{
            msg.error(message);
        }
    }

    return <div className={"w-[360px] space-y-4 mt-8"}>
        <div className={"text-base"}>
            {"{#邀请你加入翻译项目#}"}
        </div>
        <div className={"space-y-2"}>
            <div className={"space-x-2 text-muted-foreground"}>
                <span>作为</span>
                { detail?.roles.map((role) => <MemberRole key={role} value={Number(role)} />) }
                <span>加入</span>
            </div>
            <div className={"flex justify-center items-start border shadow rounded-md p-3"}>
                <div className={"mr-2"}>
                    <LanguageIcon className={"!w-12 !h-10"} code={detail?.source||""}/>
                </div>
                <div className={"flex-1 space-y-1"}>
                    <div className={"text-base"}>{detail?.name}</div>
                    <div className={"text-muted-foreground"}>目标语言</div>
                    <div className={"bg-muted p-2 space-y-1 rounded-md"}>
                        {
                            detail?.targets.map((target, index) => {
                                const items = [
                                    <div key={`${target.id}-item`} className={"flex justify-center items-center"}>
                                        <div className={"mr-2"}>
                                            <LanguageIcon className={"w-8 h-6 shadow"} code={target.code}/>
                                        </div>
                                        <div className={"text-md text-muted-foreground flex-1"}>
                                            {target.name}
                                        </div>
                                    </div>
                                ]
                                if(index < detail.targets.length - 1) {
                                    items.push(<div key={`${target.id}-border`} className={"h-0.5 bg-white -mx-2"}/>)
                                }
                                return items;
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className={"!mt-8 flex space-x-2"}>
            {
                isLogin ? <Button loading={submitting} onClick={acceptInvite} className={"w-full"}>{"{#加入#}"}</Button> : <>
                    <Button onClick={login} className={"flex-1"}>{"{#登录#}"}</Button>
                    <Button onClick={register} variant={"outline"} className={"flex-1"}>{"{#注册#}"}</Button>
                </>
            }
        </div>
    </div>;
}
