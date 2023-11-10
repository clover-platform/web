'use client';

import {Button, Result, Space} from "@arco-design/web-react";
import React from "react";
import Link from "next/link";

const LinkErrorPage = () => {
    const buttons = <Space>
        <Link href={"/{#LANG#}/login/"}>
            <Button size={"small"} type='primary'>{"{#返回登录#}"}</Button>
        </Link>
    </Space>

    return <Result
        status='error'
        subTitle='{#快捷登录出现问题，请稍后重试#}'
        extra={buttons}
    ></Result>
};

export default LinkErrorPage;
