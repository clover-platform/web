import { LinkEditorPanel } from '@/components/panels'
import { Icon } from '@/components/ui/Icon'
import { Toolbar } from '@/components/ui/Toolbar'
import * as Popover from '@radix-ui/react-popover'
import { t } from '@easykit/common/utils/locale';

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void
}

export const EditLinkPopover = ({ onSetLink }: EditLinkPopoverProps) => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Toolbar.Button tooltip={t("设置链接")}>
                    <Icon name="Link" />
                </Toolbar.Button>
            </Popover.Trigger>
            <Popover.Content>
                <LinkEditorPanel onSetLink={onSetLink} />
            </Popover.Content>
        </Popover.Root>
    )
}
