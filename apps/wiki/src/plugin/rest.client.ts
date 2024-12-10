// 别名配置
import { alias } from "@clover/public/utils/rest";
import { get } from "@clover/public/utils/headers.client";

alias({
    '@wiki': {
        url: '/api/wiki',
        headers: get
    },
});
