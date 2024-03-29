import { Request, Response } from 'express';
import logger from '../utils/logger';
import { AddItemInput } from '../schema/createItemSchema';
import { addNewUserItem, getAllItems } from '../service/item.service';

export async function createItemHandler(
  req: Request<{}, {}, AddItemInput['body']>,
  res: Response
) {
  try {
    await addNewUserItem(req.body, res.locals.user.id);
    return res.sendStatus(200);
  } catch (e: any) {
    logger.error(e.message);
    if (e.message == '1062') {
      return res.status(409).send({
        message: 'Could not add item',
        error: 'Name already exists',
      });
    }
    return res
      .status(500)
      .send({ message: 'Could not add item', error: e.message });
  }
}

export async function getAllItemsHandler(req: Request, res: Response) {
  try {
    const results = await getAllItems(res.locals.user.id);
    return res.send(results);
  } catch (e) {
    logger.error(e);
    return res.status(500);
  }
}
