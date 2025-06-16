import { apiList } from "@/rest/access";
import type { AccessApi } from '@/types/module/access/api'
import { t } from '@clover/public/locale'
import { ComboSelect, type ComboSelectProps, cn } from '@easykit/design'
import type { ComboSelectOptionProps } from '@easykit/design/components/uix/combo-select'
import { type FC, useEffect, useState } from 'react'

type COLOR_MAP_TYPE = {
    [key: string]: string;
};

const COLOR_MAP: COLOR_MAP_TYPE = {
    'get': "bg-[#61affe]",
    'post': "bg-[#49cc90]",
    'delete': "bg-[#f93e3e]",
    'put': "bg-[#fca130]",
}

export const ApiItem = (item: AccessApi) => {
    return (
      <div className={'flex items-center justify-start'}>
        <div className={cn('mr-1 rounded px-2 py-0.5 text-[12px] text-white', COLOR_MAP[item.method.toLowerCase()])}>
          {item.method}
        </div>
        <div className={'flex-1'}>{item.path}</div>
      </div>
    )
}

export const ApiSelector: FC<ComboSelectProps> = ({ref, ...props}) => {
    const [options, setOptions] = useState<ComboSelectOptionProps<AccessApi>[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true)
        const { success, data } = await apiList();
        setLoading(false);
        if(success) {
            setOptions(data?.map((item) => {
                return {
                    label: <ApiItem {...item} />,
                    value: `${item.id}`,
                    raw: item,
                }
            }) || []);
        }
    }

    useEffect(() => {
        load().then();
    }, []);

    return (
      <ComboSelect
        {...props}
        ref={ref}
        search={true}
        className={'max-h-[150px] w-full overflow-auto'}
        placeholder={t('请选择')}
        searchPlaceholder={t('关键词')}
        options={options}
        loading={loading}
        multiple={true}
        title={t('接口')}
        clearText={t('清空选择')}
        filter={(value: string, search: string) => {
          const result = options.filter(
            (option) =>
              value === option.value && (option.raw?.path.includes(search) || option.raw?.method.includes(search))
          )
          return result.length
        }}
      />
    )
};
