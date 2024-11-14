// 别名配置
import { alias } from "@easykit/common/utils/rest";
import { get } from "@clover/public/utils/headers.client";

alias({
    '@access': {
        url: '/api/account/access',
        headers: get
    },
});
