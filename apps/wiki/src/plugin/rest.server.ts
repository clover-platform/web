// 别名配置
import { alias } from "@easy-kit/common/utils/rest";
import { get } from "@clover/public/utils/headers.server";

alias({
    '@wiki': {
        url: '/api/wiki',
        headers: get
    },
});
