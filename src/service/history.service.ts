import { CreateHistoryListInput } from '../utils/my-types';
import { getRepository } from 'typeorm';
import { HistoryList } from '../entity/HistoryList';
import { HistoryListItem } from '../entity/HistoryListItem';
import { User } from '../entity/User';
import { checkUser } from './active-list.service';
import { Item } from '../entity/Item';

/**
 * It creates a new history list, adds the items to the list, and returns the new history list
 * @param {CreateHistoryListInput} input - CreateHistoryListInput
 * @param {string} userId - The id of the user who is creating the list
 * @returns The historyList is being returned.
 */
export async function createHistoryList(
  input: CreateHistoryListInput,
  userId: string
) {
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
      user,
    });
    await historyListRepository.save(historyList);
    const historyListItems = input.listItems.map(async (item) => {
      const itemToAdd = await itemRepo.findOne({ id: item.itemId });
      const historyListItem = listItemRepository.create({
        item: itemToAdd,
        history: historyList,
        quantity: item.quantity,
      });
      await listItemRepository.save(historyListItem);
    });
    await Promise.all(historyListItems);
    return historyList;
  } catch (error) {
    throw error;
  }
}

/**
 * It gets the history list of a user
 * @param {string} userId - string - The userId of the user whose history list we want to get.
 * @returns An array of HistoryList objects
 */
export async function getHistoryList(userId: string) {
  const historyListRepository = getRepository(HistoryList);
  const userRepo = getRepository(User);
  try {
    const user = await userRepo.findOne({ id: userId });
    checkUser(user);
    return await historyListRepository.find({
      where: { user },
    });
  } catch (error) {
    throw error;
  }
}

/**
 * It returns a list of history list items that are associated with a history list
 * @param {string} historyListId - The id of the history list you want to get the items from.
 * @returns An array of HistoryListItem objects
 */
export async function getHistoryListItem(historyListId: string) {
  const historyListItemRepository = getRepository(HistoryListItem);
  const historyListRepository = getRepository(HistoryList);
  try {
    const historyList = await historyListRepository.findOne({
      id: historyListId,
    });
    return await historyListItemRepository.find({
      where: { history: historyList },
      relations: ['item'],
    });
  } catch (error) {
    throw error;
  }
}
