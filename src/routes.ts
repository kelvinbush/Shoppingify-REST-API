import { Express, Request, Response } from 'express';
import validateResource from './middleware/validateResource';
import { createSessionSchema } from './schema/createSessionSchema';
import { createSessionHandler, deleteSessionHandler, getSessionsHandler } from './controller/session.controller';
import requireUser from './middleware/requireUser';
import { createUserSchema } from './schema/createUserSchema';
import { createUserHandler } from './controller/user.controller';
import { createItemSchema } from './schema/createItemSchema';
import { createItemHandler, getAllItemsHandler } from './controller/item.controller';
import {
  addToActiveListHandler,
  createActiveListHandler, deleteActiveListItemHandler,
  getActiveListHandler,
  toggleItemSelectHandler, updateCurrentListNameHandler,
  updateItemQuantityHandler
} from './controller/active-list.controller';

function routes(app: Express) {
  app.get('/health-check', (req: Request, res: Response) =>
    res.send({ message: `We are live baby 😁😁` })
  );

  // sessions
  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createSessionHandler
  );
  app.get('/api/sessions', requireUser, getSessionsHandler);
  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  // users
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  //items
  app.post(
    '/api/items',
    [requireUser, validateResource(createItemSchema)],
    createItemHandler
  );
  app.get('/api/items', requireUser, getAllItemsHandler);

  // active-list
  app.post('/api/active', requireUser, createActiveListHandler);
  app.get('/api/active', requireUser, getActiveListHandler);
  app.patch('/api/active', requireUser, toggleItemSelectHandler);
  app.post('/api/active-add', requireUser, addToActiveListHandler);
  app.patch('/api/active-add', requireUser, updateItemQuantityHandler);
  app.patch('/api/active-del', requireUser, deleteActiveListItemHandler);
  app.patch('/api/active-name', requireUser, updateCurrentListNameHandler);
}

export default routes;
