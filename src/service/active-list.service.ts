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
    checkUser(user);
    const userList = user.activeList;
    checkList(userList);
    const current = currentRepo.create({ name: data.name });
    await currentRepo.save(current);
    await userRepo.update({ id: user.id }, { activeList: current });
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

export async function getCurrentList(listId: string) {
  try {
    return await getRepository(ActiveListItem)
      .createQueryBuilder('active_list_item')
      .where('active_list_item.currentId = :id', { id: listId })
      .printSql()
      .getMany();
  } catch (e) {
    throw e;
  }
}

function checkList(data: CurrentList) {
  logger.info(data);
  if (data != null) throw Error('List already exists');
}

function checkUser(user: User) {
  logger.info(user);
  if (!user) throw Error('User does not exist');
}
