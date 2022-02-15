import logger from '../utils/logger';
import { getRepository } from 'typeorm';
import { CategoryItem } from '../entity/CategoryItem';
import { Item } from '../entity/Item';
import { AddItemInput } from '../schema/createItemSchema';
import { UserItem } from '../entity/UserItem';
import { User } from '../entity/User';
import { AdminItem } from '../entity/AdminItem';

export async function addNewUserItem(
  item: AddItemInput['body'],
  userId: string
): Promise<UserItem | AdminItem> {
  try {
    const user = await getUserById(userId);
    const category = await getOrCreateCategory(item.category);

    const itemRepo = getRepository(Item);
    let newItem = itemRepo.create({ ...item, category });
    await itemRepo.save(newItem);

    if (user.isAdmin) {
      const adminItemRepo = getRepository(AdminItem);
      const adminItem = adminItemRepo.create({ item: newItem, user });
      return await adminItemRepo.save(adminItem);
    }

    const userItemRepo = getRepository(UserItem);

    const userItem = userItemRepo.create({ item: newItem, user });
    return await userItemRepo.save(userItem);
  } catch (e) {
    throw e;
  }
}

async function getUserById(id: string): Promise<User> {
  try {
    const userRepo = getRepository(User);
    return await userRepo.findOne({ id });
  } catch (e) {
    logger.error(e.message);
  }
}

async function getOrCreateCategory(name: string): Promise<CategoryItem> {
  const categoryRepo = getRepository(CategoryItem);
  try {
    let category = await categoryRepo.findOne({ name });
    if (!category) {
      const newCategory = categoryRepo.create({ name });
      category = await categoryRepo.save(newCategory);
    }
    return category;
  } catch (e) {
    logger.error(e.message);
  }
}
