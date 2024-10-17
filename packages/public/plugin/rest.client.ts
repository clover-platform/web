// Rest 配置
import { config, alias } from '@easykit/common/utils/rest';
import bus from '@easykit/common/events';
import { UNAUTHORIZED } from "@clover/public/events/auth";
import { get } from "@clover/public/utils/headers.client";

config({
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
alias({
    '@main': {
        url: '/api/main',
        headers: get
    },
    '@assets': {
        url: '/api/assets',
        headers: get
    },
    '@account': {
        url: '/api/account',
        headers: get
    },
});