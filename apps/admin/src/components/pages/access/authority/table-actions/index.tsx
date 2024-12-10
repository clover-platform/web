import {getActions} from "@/config/pages/access/authority/table";
import {Action, Dropdown, useMessage, useAlert} from "@easykit/design";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { FC, useState } from "react";
import EditAuthorityDialog from "@/components/pages/access/authority/dialog/edit";
import {deleteAuthority} from "@/rest/access";
import { t } from '@clover/public/locale';

export interface TableActionsProps {
    item: any;
    onReload?: () => void;
}

const TableActions: FC<TableActionsProps> = (props) => {
    const {
        item = {},
        onReload,
    } = props;

    const [visible, setVisible] = useState(false);
    const [id, setId] = useState<number>();
    const alert = useAlert();
    const msg = useMessage();

    return <>
        <Dropdown
            align={"end"}
            className={"w-30"}
            items={getActions()}
            onItemClick={({id: key}) => {
                if(key === "edit") {
                    setId(item.id);
                    setVisible(true);
                }else if(key === "delete") {
                    alert.confirm({
                        title: t("删除？"),
                        description: t("是否要删除这条记录，所有的子权限以及关联的角色权限将会失效，是否继续？"),
                        cancelText: t("取消"),
                        okText: t("删除"),
                        onOk: async () => {
                            const {success, message} = await deleteAuthority(item.id);
                            if(success) {
                                onReload && onReload();
                            }else{
                                msg.error(message);
                            }
                            return success;
                        }
                    })
                }
            }}
        >
            <Action className={"w-6 h-6 p-0"}>
                <DotsHorizontalIcon />
            </Action>
        </Dropdown>
        <EditAuthorityDialog
            visible={visible}
            dataId={id}
            onCancel={() => setVisible(false)}
            onSuccess={() => {
                setVisible(false);
                onReload && onReload();
            }}
        />
    </>;
};

export default TableActions;
