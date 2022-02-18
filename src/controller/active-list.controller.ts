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
    const response = await getCurrentList(res.locals.user.id);
    return res.send({ response });
  } catch (e) {
    logger.error(e);
    return res.sendStatus(500);
  }
}
