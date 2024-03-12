import {LoginLayout} from "@clover/public/components/layout/login";

export const Guide = () => {
    return <LoginLayout showLogo={false}>
        <div className={"container flex items-center flex-col"}>
            <div className={"text-xl font-bold"}>{"{#你需要加入或者创建团队#}"}</div>
            <div>1</div>
        </div>
    </LoginLayout>
}
