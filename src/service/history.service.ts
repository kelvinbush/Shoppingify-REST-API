import { CreateHistoryListInput } from '../utils/my-types';
import { getRepository } from 'typeorm';
import { HistoryList } from '../entity/HistoryList';
import { HistoryListItem } from '../entity/HistoryListItem';
import { User } from '../entity/User';
import { checkUser } from './active-list.service';
import { Item } from '../entity/Item';

export async function createHistoryList(input: CreateHistoryListInput, userId: string) {
  const historyListRepository = getRepository(HistoryList);
  const listItemRepository = getRepository(HistoryListItem);
  const userRepo = getRepository(User);
  const itemRepo = getRepository(Item);
  try {
    const user = await userRepo.findOne({ id: userId });
    checkUser(user);
    const historyList = historyListRepository.create({
      name: input.name,
      isComplete: input.isComplete,
      user
    });
    await historyListRepository.save(historyList);
    const historyListItems = input.listItems.map(async (item) => {
      const itemToAdd = itemRepo.findOne({ id: item.itemId });
      const historyListItem = new HistoryListItem();
      historyListItem.item = await itemToAdd;
      historyListItem.history = historyList;
      historyListItem.quantity = item.quantity;
      await listItemRepository.save(historyListItem);
    });
    await Promise.all(historyListItems);
    return historyList;
  } catch (error) {
    throw error;
  }
}

export async function getHistoryList(userId: string) {
  const historyListRepository = getRepository(HistoryList);
  const userRepo = getRepository(User);
  try {
    const user = await userRepo.findOne({ id: userId });
    checkUser(user);
    return await historyListRepository.find({
      where: { user }
    });
  } catch (error) {
    throw error;
  }
}


export async function getHistoryListItem(historyListId: string) {
  const historyListItemRepository = getRepository(HistoryListItem);
  const historyListRepository = getRepository(HistoryList);
  try {
    const historyList = await historyListRepository.findOne({ id: historyListId });
    checkUser(historyList.user);
    return await historyListItemRepository.find({
      where: { history: historyList },
      relations: ['item']
    });
  } catch (error) {
    throw error;
  }
}
