// 别名配置
import { alias } from "@clover/public/utils/rest";
import { get } from "@clover/public/utils/headers.server";

alias({
    '@i18n': {
        url: '/api/i18n',
        headers: get
    },
});
