import { ActiveListItemInput } from './my-types';
import { ActiveListItem } from '../entity/ActiveListItem';
import { getRepository } from 'typeorm';

export const createActiveListQuery = (
  data: ActiveListItemInput[],
  currentId: string
): string => {
  let complete = ``;
  const activeRepo = getRepository(ActiveListItem);

  data.forEach((item) => {
    complete += `('${item.itemId}${currentId}','${item.quantity}','${item.itemId}','${currentId}'),`;
  });
  complete = complete.slice(0, -1);

  return `INSERT INTO active_list_item (id, quantity, itemId, currentId) VALUES${complete};`;
};
