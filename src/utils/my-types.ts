import { Item } from '../entity/Item';

export interface CreateActiveListInput {
  name: string;
  listItems: ActiveListItemInput[];
}

export interface ActiveListItemInput {
  itemId: string;
  quantity: number;
}


