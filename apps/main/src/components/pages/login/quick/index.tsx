import {SUPPORT_WAY} from "@/config/pages/login/quick";

const QuickLogin = () => {
    return <div className={"flex flex-wrap justify-center"}>
        {
            SUPPORT_WAY.map((item) => {
                return <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/account/auth/link/${item.id}`} key={item.id} className={"my-[10px] mx-[15px] flex flex-col items-center justify-center"}>
                    <div className={"w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center"}>
                        {item.icon}
                    </div>
                    <div className={"mt-[10px] text-[14px] text-muted-foreground"}>{item.title}</div>
                </a>
            })
        }
    </div>
};

export default QuickLogin;
