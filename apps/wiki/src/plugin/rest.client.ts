// 别名配置
import { alias } from "@easy-kit/common/utils/rest";
import { get } from "@clover/public/utils/headers.client";

alias({
    '@wiki': {
        url: '/api/wiki',
        headers: get
    },
});
