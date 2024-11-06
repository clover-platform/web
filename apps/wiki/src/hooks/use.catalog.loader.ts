import {useParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {Catalog} from "@/types/pages/book";
import {catalog} from "@/rest/page";

export const useCatalogLoader = (): [boolean, () => Promise<void>, Catalog[], (data: Catalog[]) => void] => {
    const params = useParams();
    const {bookPath} = params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Catalog[]>([]);

    const load = useCallback(async () => {
        setLoading(true);
        const { success, data } = await catalog({
            bookPath: bookPath as string
        });
        setLoading(false);
        if(success) {
            setData(data!);
        }else{
            setData([]);
        }
    }, [bookPath]);

    useEffect(() => {
        load().then();
    }, [load]);

    return [loading, load, data, setData];
}
