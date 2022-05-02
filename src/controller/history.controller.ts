import { Request, Response } from 'express';
import logger from '../utils/logger';
import { createHistoryList } from '../service/history.service';
import { CreateHistoryListInput } from '../utils/my-types';

export async function createHistoryHandler(req: Request, res: Response) {
  try {
    await createHistoryList(req.body as CreateHistoryListInput, res.locals.user.id);
    return res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    return res.sendStatus(500);
  }
}
