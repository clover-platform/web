import {useEffect, useState} from "react";
import {roleDetail} from "@/rest/access";

export const useRole = (id: number): [any, boolean, number] => {
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState({});
    const [key, setKey] = useState(Date.now());

    const load = async () => {
        setLoading(true);
        const { success, data } = await roleDetail(id);
        setLoading(false);
        if(success) {
            data.authorities = data.authorities.map((id: any) => `${id}`);
            setRole(data);
            setKey(Date.now());
        }
    }

    useEffect(() => {
        load().then();
    }, []);

    return [role, loading, key];
}
