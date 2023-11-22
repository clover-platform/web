import { ACTIONS } from "@/config/pages/access/authority/table";
import { Action, Dropdown } from "@clover/core";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { FC, useState } from "react";
import EditAuthorityDialog from "@/components/pages/access/authority/dialog/edit";

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
    const [id, setId] = useState("");

    return <>
        <Dropdown
            className={"w-30"}
            items={ACTIONS}
            onItemClick={({id}) => {
                setId(item.id);
                setVisible(true);
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
