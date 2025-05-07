import {st} from '@clover/public/utils/locale.server';

export const title = async (title: string) => {
  const titles = [
    await st("幸运草"),
  ];
  if (title) {
    titles.unshift(title);
  }
  return titles.join(' - ');
}

export const keywords = async (keyword?: string | Array<string>) => {
  const list = [await st("幸运草"), await st("任务管理"), await st("甘特图"), await st("问题管理")];
  if (typeof keyword === 'string') {
    list.push(keyword);
  } else if (Array.isArray(keyword)) {
    list.push(...keyword);
  }
  return list.join(', ');
}
