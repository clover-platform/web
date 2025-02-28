import {tt} from "@clover/public/locale";

export type FooterNavItem = {
  title: string;
  href: string;
}

export type FooterNavGroup = {
  title: string;
  items: FooterNavItem[];
}

export const getNavGroups = (): FooterNavGroup[] => {
  return [
    {
      title: tt("资源"),
      items: [
        {
          title: tt("文档"),
          href: "#"
        },
        {
          title: tt("API"),
          href: "#"
        },
        {
          title: tt("SDK"),
          href: "#"
        },
        {
          title: tt("案例"),
          href: "#"
        },
        {
          title: tt("博客"),
          href: "#"
        }
      ]
    },
    {
      title: tt("更多"),
      items: [
        {
          title: tt("产品"),
          href: "#"
        },
        {
          title: tt("价格"),
          href: "#"
        },
        {
          title: tt("Github"),
          href: "#"
        },
        {
          title: tt("发布日志"),
          href: "#"
        },
      ]
    },
    {
      title: tt("关于"),
      items: [
        {
          title: tt("Easy Kit"),
          href: "#"
        },
        {
          title: tt("幸运草"),
          href: "#"
        },
        {
          title: tt("隐私政策"),
          href: "#"
        },
      ]
    },
  ]
}
