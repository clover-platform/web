import {t} from "@clover/public/utils/locale.client";

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
      title: t("资源"),
      items: [
        {
          title: t("文档"),
          href: "#"
        },
        {
          title: t("API"),
          href: "#"
        },
        {
          title: t("SDK"),
          href: "#"
        },
        {
          title: t("案例"),
          href: "#"
        },
        {
          title: t("博客"),
          href: "#"
        }
      ]
    },
    {
      title: t("更多"),
      items: [
        {
          title: t("产品"),
          href: "#"
        },
        {
          title: t("价格"),
          href: "#"
        },
        {
          title: t("Github"),
          href: "#"
        },
        {
          title: t("发布日志"),
          href: "#"
        },
      ]
    },
    {
      title: t("关于"),
      items: [
        {
          title: t("Easy Kit"),
          href: "#"
        },
        {
          title: t("幸运草"),
          href: "#"
        },
        {
          title: t("隐私政策"),
          href: "#"
        },
      ]
    },
  ]
}
