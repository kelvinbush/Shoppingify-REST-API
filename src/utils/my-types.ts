import { Item } from '../entity/Item';

export interface CreateActiveListInput {
  name: string;
  listItems: ActiveListItem[];
}

interface ActiveListItem {
  item: Item;
  quantity: number;
}
