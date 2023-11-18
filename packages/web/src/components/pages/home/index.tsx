'use client';

import {useLayoutTitle} from "@clover/common/components/layout/admin/hooks";

const HomePage = () => {
    useLayoutTitle("{#首页#}");
    return "home";
};

export default HomePage;
