import {IconAdd} from "@arco-iconbox/react-clover";
import {Action} from "@clover/public/components/common/action";
import {FC, useCallback, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Spin, useMessage} from "@atom-ui/core";
import {create} from "@/rest/page";

export type AddPageActionProps = {
    className?: string;
    parent?: number;
}

export const AddPageAction: FC<AddPageActionProps> = (props) => {
    const {
        className, parent
    } = props;
    const search = useSearchParams();
    const id = search.get("id");
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const msg = useMessage();

    const add = useCallback(async () => {
        setSubmitting(true);
        const { success, message, data } = await create({
            parent: parent,
            bookId: Number(id)
        })
        setSubmitting(false);
        if(success) {
            router.push(`/{#LANG#}/book/page/edit/?id=${id}&page=${data}`);
        }else{
            msg.error(message);
        }
    }, [id, parent])

    return <Action
        disabled={submitting}
        className={className}
        onClick={add}
    >
        { submitting ? <Spin className={"w-3 h-3"}/> : <IconAdd/> }
    </Action>
}
