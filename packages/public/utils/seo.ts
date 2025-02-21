import isArray from "lodash/isArray";
import isString from "lodash/isString";
import {t} from '@clover/public/locale';

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
  if (isString(keyword)) {
    list.push(keyword);
  } else if (isArray(keyword)) {
    list.push(...keyword);
  }
  return list.join(', ');
}
