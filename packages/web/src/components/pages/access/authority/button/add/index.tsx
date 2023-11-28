import {FC, useState} from "react";
import {Button} from "@atom-ui/core";
import AddAuthorityDialog from "@/components/pages/access/authority/dialog/add";

export interface AddAuthorityButtonProps {
    onSuccess?: () => void;
}

const AddAuthorityButton: FC<AddAuthorityButtonProps> = (props) => {
    const {
        onSuccess  = () => {}
    } = props;

    const [visible, setVisible] = useState(false);

    return <>
        <Button onClick={() => setVisible(true)}>
            {"{#添加#}"}
        </Button>
        <AddAuthorityDialog
            visible={visible}
            onCancel={() => setVisible(false)}
            onSuccess={() => {
                setVisible(false);
                onSuccess && onSuccess();
            }}
        />
    </>
};

export default AddAuthorityButton;
