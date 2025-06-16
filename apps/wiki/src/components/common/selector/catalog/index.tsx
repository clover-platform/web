import {useCatalogLoader} from "@/hooks/use.catalog.loader";
import type { Catalog } from '@/types/module/book'
import { t } from "@clover/public/locale";
import { type TreeData, TreeSelect, type TreeSelectProps } from '@easykit/design'
import { uniq } from "es-toolkit";
import { type FC, useMemo } from 'react'

export type CatalogSelectorProps = Omit<TreeSelectProps, "treeData"> & {
    disabledKeys?: string[];
};

const findById = (data: Catalog[], key: string): Catalog|undefined => {
  // 迭代所有 children
  for(let i = 0; i < data.length; i++) {
    const item = data[i];
    if(`${item.id}` === key) {
      return item;
    }
    if(item.children) {
      const title = findById(item.children, key);
      if(title) {
        return title;
      }
    }
  }
}

const pushAllChildren = (item: Catalog, keys: string[]) => {
  item.children?.forEach(child => {
    keys.push(`${child.id}`);
    pushAllChildren(child, keys);
  });
}

const getAllDisabledKeys = (data: Catalog[], disabledKeys?: string[]): string[] => {
  const keys: string[] = [];
  disabledKeys?.forEach(key => {
    keys.push(key);
    const item = findById(data, key);
    if(item) {
      // 递归的children的 id 转换为 string 放入 keys
      pushAllChildren(item, keys);
    }
  });
  return uniq(keys);
}

const toTreeData = (data: Catalog[], disabledKeys?: string[]): TreeData[] => {
  return data?.map(item => {
    return {
      key: `${item.id}`,
      title: item.title,
      disabled: disabledKeys?.includes(`${item.id}`),
      children: toTreeData(item.children, disabledKeys)
    }
  })
}

export const CatalogSelector: FC<CatalogSelectorProps> = (props) => {
  const { disabledKeys } = props;
  const [loading, load, data] = useCatalogLoader();

  const treeData = useMemo(() => {
    const allDisabledKeys = getAllDisabledKeys(data, disabledKeys);
    return toTreeData(data, allDisabledKeys);
  }, [data, disabledKeys])

  return <TreeSelect
    {...props}
    placeholder={t("请选择目录")}
    clearable={true}
    treeData={treeData}
  />
}
