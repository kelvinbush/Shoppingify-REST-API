import { CreateActiveListInput } from '../utils/my-types';
import { getRepository } from 'typeorm';
import { CurrentList } from '../entity/CurrentList';
import { ActiveListItem } from '../entity/ActiveListItem';

export async function createActiveList(data: CreateActiveListInput) {
  try {
    const currentRepo = getRepository(CurrentList);
    const current = new CurrentList();
    const activeListItems: ActiveListItem[] = [];

    for (const element of data.listItems) {
      const item = new ActiveListItem();
      item.item = element.item;
      item.current = current;
      item.quantity = element.quantity;
      activeListItems.push(item);
    }

    current.name = data.name;
    current.items = activeListItems;
    return await currentRepo.save(current);
  } catch (e) {
    throw e;
  }
}
