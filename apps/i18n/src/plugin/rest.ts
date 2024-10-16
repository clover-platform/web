// 别名配置
import { alias } from "@easykit/common/utils/rest";
import { get } from "@clover/public/utils/headers.client";

alias({
    '@i18n': {
        url: '/api/i18n',
        headers: get
    },
});
