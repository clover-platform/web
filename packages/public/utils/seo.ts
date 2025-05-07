import {t} from '@clover/public/utils/i18next';

export const title = (title: string) => {
  const titles = [
    t("幸运草"),
  ];
  if (title) {
    titles.unshift(title);
  }
  return titles.join(' - ');
}

export const keywords = (keyword?: string | Array<string>) => {
  const list = [t("幸运草"), t("任务管理"), t("甘特图"), t("问题管理")];
  if (typeof keyword === 'string') {
    list.push(keyword);
  } else if (Array.isArray(keyword)) {
    list.push(...keyword);
  }
  return list.join(', ');
}
