import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback } from 'react'
import * as PopoverMenu from '@/components/ui/PopoverMenu'

import { Toolbar } from '@/components/ui/Toolbar'
import { isRowGripSelected } from './utils'
import { Icon } from '@/components/ui/Icon'
import { MenuProps, ShouldShowProps } from '@/components/menus/types'
import { t } from '@easykit/common/utils/locale';

export const TableRowMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
        ({ view, state, from }: ShouldShowProps) => {
            if (!state || !from) {
                return false
            }

            return isRowGripSelected({ editor, view, state, from })
        },
        [editor],
    )

    const onAddRowBefore = useCallback(() => {
        editor.chain().focus().addRowBefore().run()
    }, [editor])

    const onAddRowAfter = useCallback(() => {
        editor.chain().focus().addRowAfter().run()
    }, [editor])

    const onDeleteRow = useCallback(() => {
        editor.chain().focus().deleteRow().run()
    }, [editor])

    return (
        <BaseBubbleMenu
            editor={editor}
            pluginKey="tableRowMenu"
            updateDelay={0}
            tippyOptions={{
                zIndex: 40,
                appendTo: () => {
                    return appendTo?.current
                },
                placement: 'left',
                offset: [0, 15],
                popperOptions: {
                    modifiers: [{ name: 'flip', enabled: false }],
                },
            }}
            shouldShow={shouldShow}
        >
            <Toolbar.Wrapper isVertical>
                <PopoverMenu.Item
                    iconComponent={<Icon name="ArrowUpToLine" />}
                    close={false}
                    label={t("上方插入")}
                    onClick={onAddRowBefore}
                />
                <PopoverMenu.Item
                    iconComponent={<Icon name="ArrowDownToLine" />}
                    close={false}
                    label={t("下方插入")}
                    onClick={onAddRowAfter}
                />
                <PopoverMenu.Item icon="Trash" close={false} label={t("删除")} onClick={onDeleteRow} />
            </Toolbar.Wrapper>
        </BaseBubbleMenu>
    )
})

TableRowMenu.displayName = 'TableRowMenu'

export default TableRowMenu
