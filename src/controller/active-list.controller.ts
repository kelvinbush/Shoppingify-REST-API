import { Request, Response } from 'express';
import logger from '../utils/logger';
import {
  createActiveList,
  getCurrentList,
} from '../service/active-list.service';
import { CreateActiveListInput } from '../utils/my-types';

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
    const result = await getCurrentList(req.body);
    return res.send({ result });
  } catch (e) {
    logger.error(e);
    return res.sendStatus(500);
  }
}
