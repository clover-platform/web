// Rest 配置
import * as Rest from '@clover/common/utils/rest';
import {get} from "@/utils/headers";
import bus from '@clover/common/events';
import {LOGIN} from "@/events/account";

Rest.config({
    useTransId: true,
    onResponse: (data: any, config: any) => {
        const { code } = data
        if (code === 401) { // 未登录
            bus.emit(LOGIN);
        }
    }
});

// 别名配置
Rest.alias({
    '@account': {
        url: '/api/account',
        headers: get
    },
    '@access': {
        url: '/api/access',
        headers: get
    }
});
