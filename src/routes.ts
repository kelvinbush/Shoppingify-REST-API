import { Express, Request, Response } from 'express';
import validateResource from './middleware/validateResource';
import { createSessionSchema } from './schema/createSessionSchema';
import {
  createSessionHandler,
  deleteSessionHandler,
  getSessionsHandler,
} from './controller/session.controller';
import requireUser from './middleware/requireUser';
import { createUserSchema } from './schema/createUserSchema';
import { createUserHandler } from './controller/user.controller';
import { createItemSchema } from './schema/createItemSchema';
import { createItemHandler } from './controller/item.controller';

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
}

export default routes;
