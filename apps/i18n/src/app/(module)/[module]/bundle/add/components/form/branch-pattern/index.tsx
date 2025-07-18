import { IconAdd } from "@arco-iconbox/react-clover";
import { Action } from "@clover/public/components/common/action";
import { Input } from '@easykit/design'
import { MinusIcon } from "@radix-ui/react-icons";
import { type FC, useState } from 'react'
import { useTranslation } from "react-i18next";
export type BranchPatternProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
};

export const BranchPattern: FC<BranchPatternProps> = (props) => {
  const { value, onChange } = props
  const [branches, setBranches] = useState<string[]>(value || [''])
  const { t } = useTranslation()

  const add = () => {
    const newBranches = [...branches, '']
    setBranches(newBranches)
    onChange?.(newBranches)
  }

  const remove = (index: number) => {
    const newBranches = branches.filter((_, i) => i !== index)
    setBranches(newBranches)
    onChange?.(newBranches)
  }

  return (
    <div className="space-y-2">
      {branches.map((_branch, index) => {
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index} className="relative">
            <Input
              value={branches[index]}
              onChange={(e) => {
                branches[index] = e.target.value
                const newBranches = [...branches]
                setBranches(newBranches)
                onChange?.(newBranches)
              }}
              placeholder={t('匹配分支')}
            />
            <div className="absolute top-1 right-1 flex">
              {index === 0 ? null : (
                <Action onClick={() => remove(index)} className="!p-0 h-7 w-7">
                  <MinusIcon />
                </Action>
              )}
              <Action onClick={add} className="!p-0 h-7 w-7">
                <IconAdd />
              </Action>
            </div>
          </div>
        )
      })}
    </div>
  )
}
