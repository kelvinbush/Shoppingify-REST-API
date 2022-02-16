import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import logger from '../utils/logger';
import { CreateUserInput } from '../schema/createUserSchema';

export async function createUser(input: CreateUserInput['body']) {
  const { name, email, password, isAdmin } = input;
  const userRepo = getRepository(User);
  try {
    const user = userRepo.create({ name, email, password, isAdmin });
    await userRepo.save(user);
    return { name, email, password, isAdmin };
  } catch (e: any) {
    if (e.errno == 1062) {
      throw new Error('1062');
    }
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await getPartialUserByEmail(email);
  if (!user) return false;
  const isValid = await user.comparePassword(password);
  logger.info(password);
  if (!isValid) return false;
  return user;
}

export async function getPartialUserByEmail(email: string) {
  try {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.password',
        'user.activeListId',
      ])
      .where('user.email = :email', { email })
      .getOne();
    if (!user) return false;
    return user;
  } catch (e) {
    logger.error(e);
  }
}
