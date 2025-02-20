import {FC, PropsWithChildren, ReactNode, useEffect, useMemo} from "react";
import {Header} from "@clover/public/components/layout/main/header";
import {Footer} from "@clover/public/components/layout/main/footer";
import {useAtomValue} from "jotai";
import {accountInfoState} from "@clover/public/state/account";
import {useRouter} from "next/navigation";

export type MainLayoutProps = PropsWithChildren<{
    headerExtend?: ReactNode;
}>;

export const MainLayout: FC<MainLayoutProps> = (props) => {
    const {headerExtend, children} = props;
    const account = useAtomValue(accountInfoState);
    const router = useRouter();

    const requireOtp = useMemo(() => !account.otpBind && account.requireOtp, [account])

    useEffect(() => {
        if(requireOtp) {
            router.push('/otp-bind');
        }
    }, [requireOtp, router])

    return requireOtp ? null : <div className={"flex justify-center items-center flex-col min-h-[100vh]"}>
        <Header extend={headerExtend}/>
        <div className={"flex-1 w-full bg-secondary"}>
            {children}
        </div>
        <Footer />
    </div>
}
