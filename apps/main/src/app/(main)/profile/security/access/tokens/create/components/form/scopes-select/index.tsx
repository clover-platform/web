import { getScopes } from '../../../../config/scopes'

import { type FC, useMemo } from 'react'
import { CheckboxGroup, type CheckboxGroupOptionProps } from '@easykit/design'

export type ScopesSelectProps = {
  value?: string[]
  onChange?: (value: string[]) => void
}

export const ScopesSelect: FC<ScopesSelectProps> = (props) => {
  const options = useMemo<CheckboxGroupOptionProps[]>(
    () =>
      getScopes().map((s) => {
        return {
          value: s.key,
          label: (
            <div>
              <div>{s.key}</div>
              <div className="text-secondary-foreground/50">{s.description}</div>
            </div>
          ),
        }
      }),
    []
  )

  return <CheckboxGroup {...props} checkboxClassName="mt-1" itemClassName="w-full !items-start" options={options} />
}
