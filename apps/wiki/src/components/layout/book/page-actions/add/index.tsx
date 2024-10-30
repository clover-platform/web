import {IconAdd} from "@arco-iconbox/react-clover";
import {Action} from "@clover/public/components/common/action";
import {FC, useCallback, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {Spin, Tooltip, useMessage} from "@easykit/design";
import {create} from "@/rest/page";
import bus from "@easykit/common/events";
import {ADD_PAGE} from "@/events/book";
import { t } from '@easykit/common/utils/locale';

export type AddPageActionProps = {
    className?: string;
    parent?: number;
}

export const AddPageAction: FC<AddPageActionProps> = (props) => {
    const {
        className, parent
    } = props;
    const params = useParams();
    const { bookPath } = params;
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const msg = useMessage();

    const add = useCallback(async (e: any) => {
        e.stopPropagation();
        setSubmitting(true);
        const { success, message, data } = await create({
            parent: parent,
            bookPath: bookPath as string,
        })
        setSubmitting(false);
        if(success) {
            bus.emit(ADD_PAGE, data);
            router.push(`/wiki/book/${bookPath}/page/${data?.id}/edit`);
        }else{
            msg.error(message);
        }
    }, [bookPath, parent])

    return <Tooltip content={t("创建")}>
        <Action
            disabled={submitting}
            className={className}
            onClick={add}
        >
            { submitting ? <Spin className={"w-3 h-3"}/> : <IconAdd/> }
        </Action>
    </Tooltip>
}
