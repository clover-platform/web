import { DropdownButton, DropdownCategoryTitle } from '@/components/ui/Dropdown'
import { Icon } from '@/components/ui/Icon'
import { Surface } from '@/components/ui/Surface'
import { Toolbar } from '@/components/ui/Toolbar'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { useCallback } from 'react'
import { t } from '@easykit/common/utils/locale';

const FONT_SIZES = [
    { label: t("极小"), value: '12px' },
    { label: t("小"), value: '14px' },
    { label: t("默认"), value: '' },
    { label: t("大"), value: '18px' },
    { label: t("超大"), value: '24px' },
]

export type FontSizePickerProps = {
  onChange: (value: string) => void // eslint-disable-line no-unused-vars
  value: string
}

export const FontSizePicker = ({ onChange, value }: FontSizePickerProps) => {
    const currentValue = FONT_SIZES.find(size => size.value === value)
    const currentSizeLabel = currentValue?.label.split(' ')[0] || t("默认")

    const selectSize = useCallback((size: string) => () => onChange(size), [onChange])

    return (
        <Dropdown.Root>
            <Dropdown.Trigger asChild>
                <Toolbar.Button active={!!currentValue?.value}>
                    {currentSizeLabel}
                    <Icon name="ChevronDown" className="w-2 h-2" />
                </Toolbar.Button>
            </Dropdown.Trigger>
            <Dropdown.Content asChild>
                <Surface className="flex flex-col gap-1 px-2 py-4">
                    {FONT_SIZES.map(size => (
                        <DropdownButton
                            isActive={value === size.value}
                            onClick={selectSize(size.value)}
                            key={`${size.label}_${size.value}`}
                        >
                            <span style={{ fontSize: size.value }}>{size.label}</span>
                        </DropdownButton>
                    ))}
                </Surface>
            </Dropdown.Content>
        </Dropdown.Root>
    )
}
