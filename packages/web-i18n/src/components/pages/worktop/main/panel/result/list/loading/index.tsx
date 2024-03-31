import { ResultItemLoading } from "@/components/pages/worktop/main/panel/result/list/item/loading";

const LOADING_ITEM = [0,1,2]
export const ResultListLoading = () => {
    return LOADING_ITEM.map((item) => <ResultItemLoading key={item}/>)
}
