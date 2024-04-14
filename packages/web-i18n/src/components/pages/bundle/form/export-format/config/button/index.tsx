import {Action} from "@clover/public/components/common/action";
import {IconSetting} from "@arco-iconbox/react-clover";
import {FormatConfigModal} from "@/components/pages/bundle/form/export-format/config/modal";
import {FC, useState} from "react";
import {ExportFormatConfig} from "@/components/pages/bundle/form/export-format";

export type FormatConfigButtonProps = {
    config: ExportFormatConfig;
}

export const FormatConfigButton: FC<FormatConfigButtonProps> = (props) => {
    const { config } = props;
    const [visible, setVisible] = useState(false);
    return <>
        <Action onClick={() => setVisible(true)}>
            <IconSetting />
        </Action>
        <FormatConfigModal
            visible={visible}
            title={config.name}
            onCancel={() => setVisible(false)}
            onConfirm={() => setVisible(false)}
            content={config.configComponent!}
        />
    </>
}