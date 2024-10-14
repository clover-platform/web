import {StarFilledIcon, StarIcon} from "@radix-ui/react-icons";
import {Action} from "@clover/public/components/common/action";
import {FC, useState, useCallback, useEffect} from 'react';
import {Spin, useMessage} from "@easykit/design";
import {collect as collectRest} from "@/rest/page";
import {useSearchParams} from "next/navigation";

export type CollectActionProps = {
    id: number;
    collected: boolean;
}

export const CollectAction: FC<CollectActionProps> = (props) => {
    const { id: pageId } = props;
    const search = useSearchParams();
    const id = search.get("id");
    const [loading, setLoading] = useState<boolean>(false);
    const msg = useMessage();
    const [collected, setCollected] = useState<boolean>(props.collected);

    useEffect(() => {
        setCollected(props.collected);
    }, [props.collected]);

    const collect = useCallback(async () => {
        setLoading(true);
        const {success, message} = await collectRest({
            bookId: Number(id),
            id: pageId,
            collect: !collected
        });
        setLoading(false);
        if(!success) {
            console.log(message);
            msg.error(message);
        }else{
            setCollected(!collected);
        }
    }, [collected, id, pageId])

    return <Action disabled={loading} onClick={collect}>
        {
            loading ? <Spin /> : (
                collected ? <StarFilledIcon/> : <StarIcon/>
            )
        }
    </Action>
}
