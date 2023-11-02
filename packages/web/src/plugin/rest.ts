// Rest 配置
import * as Rest from '@clover/common/utils/rest.js';
import {get} from "@/utils/headers";

Rest.config({
    useTransId: true,
    onResponse: (data: any, config: any) => {
        const { needLogin = true } = config.config;
        const { code } = data
        if (code === 401 && needLogin) { // 未登录
            // goLogin().then();
        }
    }
});

// 别名配置
Rest.alias({
    '@account': {
        url: '/api/account',
        headers: get
    }
});
