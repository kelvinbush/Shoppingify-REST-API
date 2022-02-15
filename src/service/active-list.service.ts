import { CreateActiveListInput } from '../utils/my-types';
import { getManager, getRepository } from 'typeorm';
import { CurrentList } from '../entity/CurrentList';
import { createActiveListQuery } from '../utils/raw-query';

export async function createActiveList(data: CreateActiveListInput) {
  try {
    const currentRepo = getRepository(CurrentList);
    const current = currentRepo.create({ name: data.name });
    const list = await currentRepo.save(current);
    const rawData = await getManager().query(
      createActiveListQuery(data.listItems, list.id)
    );
    return;
  } catch (e) {
    throw e;
  }
}
