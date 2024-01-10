import { readFile } from 'fs/promises';
import { join } from 'path';
import type { IConfigTreeItem, IMenuData } from '../../types';
import { getConfig } from '../getConfig';

export const getData = async (): Promise<IMenuData[]> => {
  const menuFilePath = join(process.cwd(), 'src/_generated/menu.json');
  try {
    const fileData = await readFile(menuFilePath, 'utf-8');
    const menuData = JSON.parse(fileData);
    return menuData;
  } catch (e) {
    return Promise.reject('Could not load menu data');
  }
};

export const getPages = async (): Promise<IConfigTreeItem[]> => {
  const { pages } = await getConfig();

  const cleanup = (pages: IConfigTreeItem[]): IConfigTreeItem[] => {
    const innerPages = Object.entries(pages);

    return innerPages.map(([key, page]: [string, IConfigTreeItem]) => {
      if (page.children) page.children = cleanup(page.children);

      return { ...page, id: key } as IConfigTreeItem;
    });
  };

  return cleanup(pages);
};
