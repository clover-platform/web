import {useParams} from "next/navigation";
import {useCallback, useState} from "react";
import {Catalog} from "@/types/pages/book";
import {catalog} from "@/rest/page";
import {useRecoilState} from "recoil";
import {catalogState} from "@/state/page";

export const useCatalogLoader = (): [boolean, () => Promise<void>, Catalog[], (data: Catalog[]) => void] => {
    const params = useParams();
    const {bookPath} = params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useRecoilState(catalogState);

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

    return [loading, load, data, setData];
}
