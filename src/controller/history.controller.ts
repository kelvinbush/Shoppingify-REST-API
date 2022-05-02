import { Request, Response } from 'express';
import logger from '../utils/logger';
import { createHistoryList, getHistoryList, getHistoryListItem } from '../service/history.service';
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


export async function getHistoryHandler(req: Request, res: Response) {
  try {
    const history = await getHistoryList(res.locals.user.id);
    return res.status(200).json(history);
  } catch (e) {
    logger.error(e);
    return res.sendStatus(500);
  }
}

export async function getHistoryByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const history = await getHistoryListItem(id);
    return res.status(200).json(history);
  } catch (e) {
    logger.error(e);
    return res.sendStatus(500);
  }
}
