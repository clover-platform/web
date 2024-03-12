// Rest 配置
import * as Rest from '@easy-kit/common/utils/rest';
import {get} from "@clover/public/utils/headers";
import bus from '@easy-kit/common/events';
import {UNAUTHORIZED} from "@clover/public/events/auth";

Rest.config({
    useTransId: true,
    onResponse: (data: any, response: any) => {
        const { needLogin = true } = response?.config || {};
        const { code } = data
        if (code === 401 && needLogin) { // 未登录
            bus.emit(UNAUTHORIZED);
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
