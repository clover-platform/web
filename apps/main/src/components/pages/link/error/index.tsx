'use client';

import {Button, Result, Space} from "@easykit/design";
import React from "react";
import Link from "next/link";
import { t } from '@easykit/common/utils/locale';
import {useLocaleCode} from "@easykit/common/hooks";

const LinkErrorPage = () => {
    const lc = useLocaleCode();

    const buttons = <Space>
        <Link href={`/${lc}/login/`}>
            <Button>{t("返回登录")}</Button>
        </Link>
        <Link href={`/${lc}/`}>
            <Button variant={"outline"}>{t("返回首页")}</Button>
        </Link>
    </Space>

    return <Result
        status='error'
        subTitle={t("快捷登录出现问题，请稍后重试")}
        extra={buttons}
    />
};

export default LinkErrorPage;
