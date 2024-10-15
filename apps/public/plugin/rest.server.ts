// Rest 配置
import { config, alias } from '@easy-kit/common/utils/rest';
import { NextResponse } from "next/server";
import { get } from "@clover/public/utils/headers.server";

config({
    useTransId: true,
    onResponse: (data: any, response: any) => {
        const { needLogin = true } = response?.config || {};
        const { code } = data
        if (code === 401 && needLogin) { // 未登录
            // NextResponse.redirect('/login/');
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
