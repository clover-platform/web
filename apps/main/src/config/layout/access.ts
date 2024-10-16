import {TabItem} from "@/components/layout/access";
import { t } from '@easykit/common/utils/locale';

export const TABS: TabItem[] = [
    {
        value: 'role',
        label: t("角色管理"),
        url: '/{#LANG#}/access/',
    },
    {
        value: 'authority',
        label: t("权限管理"),
        url: '/{#LANG#}/access/authority/',
    }
]
