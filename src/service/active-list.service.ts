import { CreateActiveListInput } from '../utils/my-types';
import { getRepository } from 'typeorm';
import { CurrentList } from '../entity/CurrentList';
import { ActiveListItem } from '../entity/ActiveListItem';
import { Item } from '../entity/Item';
import { User } from '../entity/User';

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

export async function getCurrentList(userId: string) {
  try {
    const user = await getRepository(User).findOne({ id: userId });
    checkUser(user);
    const result = await getRepository(ActiveListItem).find({
      where: { current: user.activeList },
      relations: ['item'],
    });
    return { name: user.activeList.name, list: result };
  } catch (e) {
    throw e;
  }
}

function checkUser(user: User) {
  if (!user) throw Error('User does not exist');
}
