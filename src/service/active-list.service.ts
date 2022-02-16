import { CreateActiveListInput } from '../utils/my-types';
import { getRepository } from 'typeorm';
import { CurrentList } from '../entity/CurrentList';
import { ActiveListItem } from '../entity/ActiveListItem';
import { Item } from '../entity/Item';
import { User } from '../entity/User';
import logger from '../utils/logger';

export async function createActiveList(
  data: CreateActiveListInput,
  userId: string
) {
  try {
    const userRepo = getRepository(User);
    const currentRepo = getRepository(CurrentList);
    const activeRepo = getRepository(ActiveListItem);
    const itemRepo = getRepository(Item);
    const user = await userRepo.findOne({ id: userId });
    if (!user) return false;
    const userList = user.activeList;
    checkData(userList);
    const current = currentRepo.create({ name: data.name });
    await currentRepo.save(current);
    user.activeList = current;
    await userRepo.save(user);
    for (const listItem of data.listItems) {
      const item = await itemRepo.findOne({ id: listItem.itemId });
      const activeItem = activeRepo.create({
        item: item,
        quantity: listItem.quantity,
        current,
      });
      await activeRepo.save(activeItem);
    }
    return true;
  } catch (e) {
    throw e;
  }
}

// validate.js
function checkData(data: CurrentList) {
  logger.info(data);
  if (data != null) throw Error('List already exists');
}
