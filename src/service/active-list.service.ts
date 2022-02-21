import { ActiveListItemInput, CreateActiveListInput } from '../utils/my-types';
import { getConnection, getManager, getRepository } from 'typeorm';
import { CurrentList } from '../entity/CurrentList';
import { ActiveListItem } from '../entity/ActiveListItem';
import { Item } from '../entity/Item';
import { User } from '../entity/User';
import { CategoryItem } from '../entity/CategoryItem';

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
        current
      });
      await activeRepo.save(activeItem);
    }
    return true;
  } catch (e) {
    throw e;
  }
}

export async function getCurrentList(user: User) {
  try {
    const myItems = await getManager()
      .createQueryBuilder(ActiveListItem, 'active')
      .select('item.id', 'id')
      .addSelect('active.id', 'activeId')
      .addSelect('item.name', 'name')
      .addSelect('active.quantity', 'quantity')
      .addSelect('active.isSelected', 'isSelected')
      .addSelect('category.name', 'category')
      .leftJoin(Item, 'item', 'item.id = active.itemId')
      .leftJoin(CategoryItem, 'category', 'category.id = item.category_id')
      .where('active.currentId = :id', { id: user.activeList.id })
      .getRawMany();
    return { name: user.activeList.name, list: myItems };
  } catch (e) {
    throw e;
  }
}

export async function toggleItemSelect(itemId, isSelected) {
  try {
    await getConnection()
      .createQueryBuilder()
      .update(ActiveListItem)
      .set({ isSelected })
      .where('id = :id', { id: itemId })
      .execute();
    return;
  } catch (e) {
    throw e;
  }
}

export async function addItemToList(input: ActiveListItemInput, current: CurrentList) {
  try {
    const item = await getConnection()
      .getRepository(Item)
      .createQueryBuilder('item')
      .where('item.id = :id', { id: input.itemId })
      .getOne();
    const activeRepo = getRepository(ActiveListItem);
    const activeItem = activeRepo.create({ item, current, isSelected: false, quantity: input.quantity });
    await activeRepo.save(activeItem);
    return;
  } catch (e) {
    throw e;
  }
}

function checkUser(user: User) {
  if (!user) throw Error('User does not exist');
}
