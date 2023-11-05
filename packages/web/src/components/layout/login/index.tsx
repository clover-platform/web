import {PropsWithChildren} from "react";
import Logo from "@/components/common/logo";
import {IconCheck} from "@arco-design/web-react/icon";

const LoginLayout = (props: PropsWithChildren) => {
    return <div className={"flex justify-center w-full min-h-[100vh] flex-col"}>
        <div className={"p-[15px] justify-start items-center border-0 border-solid border-b-[1px] border-b-[rgba(40,44,52,.1)] flex lg:hidden"}>
            <Logo theme={"dark"} />
        </div>
        <div className={"flex justify-center w-full items-stretch flex-1"}>
            <div className={`bg-[#2E3340] flex-1 text-white flex-col items-stretch lg:flex hidden relative z-10`}>
                <div className={"p-[15px] flex items-start"}>
                    <Logo />
                </div>
                <div className={"flex-1 h-full flex justify-center items-center"}>
                    <div className={"2xl:w-[728px] xl:w-[100%] mx-[40px] lg:w-[500px]"}>
                        <div className={"bg-[url(~@/assets/image/login/bg.svg)] bg-contain bg-no-repeat bg-left opacity-[0.8] h-[280px] ml-[-30px]"}/>
                        <div className={"text-[28px] font-bold"}>{"{#愉快的开始你的研发#}"}</div>
                        <div className={"my-[20px] text-[18px] opacity-[0.7]"}>
                            {"{#文档管理、任务管理、甘特图、问题跟踪还有国际化都变得更简单。#}"}
                        </div>
                        <ul>
                            <li>
                                <IconCheck /> {"{#最适合个人和团队#}"}
                            </li>
                            <li>
                                <IconCheck /> {"{#提供免费订阅计划#}"}
                            </li>
                            <li>
                                <IconCheck /> {"{#数百个应用程序和集成#}"}
                            </li>
                        </ul>
                        <div className={"mt-[40px] text-[16px] opacity-[0.7]"}>{"{#感谢优秀的平台#}"}</div>
                        <div className={"w-[560px] h-[63px] bg-[url(~@/assets/image/support.png)] bg-contain lg:w-[100%] xl:w-[560px]"} />
                    </div>
                </div>
            </div>
            <div className={"flex-1 flex justify-center items-center"}>
                { props.children }
            </div>
        </div>
    </div>
};

export default LoginLayout;
