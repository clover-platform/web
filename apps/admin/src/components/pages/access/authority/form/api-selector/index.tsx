import {cn, ComboSelect, ComboSelectProps} from "@easykit/design";
import {FC, useEffect, useState} from "react";
import { ComboSelectOptionProps } from "@easykit/design/components/uix/combo-select";
import { apiList } from "@/rest/access";
import { t } from '@easykit/common/utils/locale'
import {AccessApi} from "@/types/pages/access/api";

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
    return <div className={"flex justify-start items-center"}>
        <div className={cn(
            "py-0.5 px-2 rounded text-white mr-1 text-[12px]",
            COLOR_MAP[item.method.toLowerCase()]
        )}>
            {item.method}
        </div>
        <div className={"flex-1"}>
            {item.path}
        </div>
    </div>
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

    return <ComboSelect
        {...props}
        ref={ref}
        search={true}
        className={"w-full max-h-[150px] overflow-auto"}
        placeholder={t("请选择")}
        searchPlaceholder={t("关键词")}
        options={options}
        loading={loading}
        multiple={true}
        title={t("接口")}
        clearText={t("清空选择")}
        filter={(value: string, search: string) => {
            const result = options.filter((option) => (value === option.value && (option.raw?.path.includes(search) || option.raw?.method.includes(search))));
            return result.length;
        }}
    />
};
