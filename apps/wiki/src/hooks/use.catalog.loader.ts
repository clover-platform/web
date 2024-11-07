import {useParams} from "next/navigation";
import {useCallback} from "react";
import {Catalog} from "@/types/pages/book";
import {catalog} from "@/rest/page";
import {catalogLoadingState, catalogState} from "@/state/page";
import {useGlobalLoading} from "@/hooks/use.global.loading";
import {useRecordState} from "@/hooks/use.record.state";

export const useCatalogLoader = (): [boolean, (showLoading?: boolean) => Promise<void>, Catalog[], (data: Catalog[]) => void] => {
    const params = useParams();
    const {bookPath} = params;
    const [loading, setLoading] = useGlobalLoading<string>(catalogLoadingState, bookPath as string);
    const [data, setData] = useRecordState<Catalog[]>(catalogState, bookPath as string);

    const load = useCallback(async (showLoading?: boolean) => {
        if(showLoading) setLoading(true);
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
