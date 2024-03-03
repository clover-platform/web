// Rest 配置
import * as Rest from '@easy-kit/common/utils/rest';
import {get} from "@/utils/headers";
import bus from '@easy-kit/common/events';
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
    '@main': {
        url: '/api/main',
        headers: get
    },
    '@account': {
        url: '/api/account',
        headers: get
    }
});
