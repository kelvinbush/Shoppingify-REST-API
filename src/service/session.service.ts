import { get } from 'lodash';
import { signJwt, verifyJwt } from '../utils/jwt';
import config from 'config';
import { AuthSession } from '../entity/AuthSession';
import { getRepository } from 'typeorm';
import logger from '../utils/logger';
import { User } from '../entity/User';

export async function createNewSession(user: User, userAgent: string) {
  try {
    const sessionRepo = getRepository(AuthSession);
    const session = sessionRepo.create({ user: user, userAgent: userAgent });
    await sessionRepo.save(session);
    return session;
  } catch (e: any) {
    logger.error(e.message);
  }
}

export async function findUserAuthSessions(userId: string) {
  return await getRepository(AuthSession)
    .createQueryBuilder('auth_session')
    .where('auth_session.userId = :userId', { userId })
    .andWhere('auth_session.valid = :valid', { valid: true })
    .printSql()
    .getMany();
}

export async function updateSession(userId: string) {
  try {
    await getRepository(AuthSession)
      .createQueryBuilder()
      .delete()
      .from('auth_session')
      .where('userId = :userId', { userId })
      .execute();
  } catch (e: any) {
    logger.error(e.message);
  }
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken, 'refreshTokenPublicKey');
  if (!decoded || !get(decoded, 'session')) {
    logger.error('decoding failed');
    return false;
  }

  const session = await getRepository(AuthSession).findOne({
    id: get(decoded, 'session'),{

   }
  });
  
  logger.info(session);
  if (!session || !session.valid) {
    logger.error('invalid session');
    return false;
  }

  const user = session.user;
  if (!user) {
    logger.error('user not found');
    return false;
  }

  logger.info('new token reissued');
  return signJwt(
    { ...user, session: session.id },
    'accessTokenPrivateKey',
    { expiresIn: config.get('accessTokenTtl') } // 15 minutes
  );
}
