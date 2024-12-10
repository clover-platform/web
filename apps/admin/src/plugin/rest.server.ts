// 别名配置
import { alias } from "@clover/public/utils/rest";
import { get } from "@clover/public/utils/headers.server";

alias({
    '@access': {
        url: '/api/account/access',
        headers: get
    },
});
