import {StarFilledIcon, StarIcon} from "@radix-ui/react-icons";
import {Action} from "@clover/public/components/common/action";
import {FC, useCallback, useEffect} from 'react';
import {Spin, useMessage} from "@easykit/design";
import {collect as collectRest} from "@/rest/page";
import {useParams} from "next/navigation";
import {useCollectLoading} from "@/hooks/use.collect.loading";
import {useCollected} from "@/hooks/use.collected";

export type CollectActionProps = {
    id: number;
    collected: boolean;
}

export const CollectAction: FC<CollectActionProps> = (props) => {
    const { id: pageId } = props;
    const params = useParams();
    const { bookPath } = params
    const [loading, setLoading] = useCollectLoading(pageId);
    const msg = useMessage();
    const [collected, setCollected] = useCollected(pageId);

    useEffect(() => {
        setCollected(props.collected);
    }, [props.collected]);

    const collect = useCallback(async () => {
        setLoading(true);
        const {success, message} = await collectRest({
            bookPath: bookPath as string,
            id: pageId,
            collect: !collected
        });
        setLoading(false);
        if(!success) {
            msg.error(message);
        }else{
            setCollected(!collected);
        }
    }, [collected, bookPath, pageId])

    return <Action disabled={loading} onClick={collect}>
        {
            loading ? <Spin /> : (
                collected ? <StarFilledIcon/> : <StarIcon/>
            )
        }
    </Action>
}
