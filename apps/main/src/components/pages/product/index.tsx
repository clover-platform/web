"use client";

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {WebLayoutProps} from "@/components/layout/web";

export const ProductPage = () => {
  useLayoutConfig<WebLayoutProps>({
    active: "product",
  })

  return <div>
    ProductPage
  </div>
}
