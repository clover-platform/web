import {encrypt} from "@clover/public/utils/crypto";
import {login} from "@clover/public/rest/auth";
import {setToken} from "@clover/public/utils/token";
import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";
import {useMessage} from "@atom-ui/core";

export const useLoginSubmit = () => {
    const router = useRouter();
    const params = useSearchParams();
    const from = params.get("from");
    const [loading, setLoading] = useState(false);
    const msg = useMessage();

    const submit = async (data: any) => {
        setLoading(true);
        data.password = encrypt(data.password);
        const { message, success, data: result } = await login(data);
        setLoading(false);
        if(success) {
            setToken(result);
            if(from && !from.includes(location.origin)) {
                location.href = from;
            }else{
                router.push(from || "/{#LANG#}/");
            }
        }else{
            msg.error(message);
        }
    }

    return {
        loading, submit
    }
}
