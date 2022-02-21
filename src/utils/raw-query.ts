import { ActiveListItemInput } from './my-types';
import { ActiveListItem } from '../entity/ActiveListItem';
import { getRepository } from 'typeorm';

export const createActiveListQuery = (
  item: ActiveListItemInput,
  currentId: string
): string => {
  let complete =  `('${item.itemId}${currentId}','${item.quantity}','${item.itemId}','${currentId}')`;

  return `INSERT INTO active_list_item (id, quantity, itemId, currentId) VALUES${complete};`;
};
