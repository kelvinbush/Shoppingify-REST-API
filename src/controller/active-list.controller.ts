import { Request, Response } from 'express';
import logger from '../utils/logger';
import {
  addItemToList,
  createActiveList,
  deleteActiveListItem,
  getCurrentList,
  toggleItemSelect,
  updateCurrentListName,
  updateItemQuantity
} from '../service/active-list.service';
import { CreateActiveListInput } from '../utils/my-types';
import { User } from '../entity/User';

export async function createActiveListHandler(req: Request, res: Response) {
  try {
    await createActiveList(
      req.body as CreateActiveListInput,
      res.locals.user.id
    );
    return res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    return res.sendStatus(500);
  }
}

export async function getActiveListHandler(req: Request, res: Response) {
  try {
    const response = await getCurrentList(res.locals.user as User);
    return res.send(response);
  } catch (e) {
    logger.error(e);
    return res.sendStatus(500);
  }
}

export async function toggleItemSelectHandler(req: Request, res: Response) {
  try {
    await toggleItemSelect(req.body.itemId, req.body.isSelected);
    return res.send({ complete: true });
  } catch (e) {
    logger.error(e);
    return res.sendStatus(500);
  }
}

export async function addToActiveListHandler(req: Request, res: Response) {
  try {
    await addItemToList(req.body, res.locals.user.activeList);
    return res.send({ complete: true });
  } catch (e) {
    logger.error(e);
    return res.sendStatus(500);
  }
}

export async function updateItemQuantityHandler(req: Request, res: Response) {
  try {
    await updateItemQuantity(req.body);
    return res.send({ complete: true });
  } catch (e) {
    logger.error(e);
    return res.sendStatus(500);
  }
}

export async function updateCurrentListNameHandler(req: Request, res: Response) {
  logger.info(req.body);
  try {
    await updateCurrentListName(res.locals.user.activeList, req.body.name);
    return res.send({ complete: true });
  } catch (e) {
    logger.error(e);
    return res.sendStatus(500);
  }
}

export async function deleteActiveListItemHandler(req: Request, res: Response) {
  try {
    await deleteActiveListItem(req.body.activeId);
    return res.send({ complete: true });
  } catch (e) {
    logger.error(e);
    return res.sendStatus(500);
  }
}
