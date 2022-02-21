import { createUser } from '../service/user.service';
import { Request, Response } from 'express';
import logger from '../utils/logger';
import { CreateUserInput } from '../schema/createUserSchema';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send({ name: user.name, email: user.email });
  } catch (e: any) {
    logger.error(e.message);
    if (e.message == '1062') {
      return res.status(409).send({
        message: 'Could not add user',
        error: 'Email already exists',
      });
    }
    return res
      .status(500)
      .send({ message: 'Could not add user', error: e.message });
  }
}
