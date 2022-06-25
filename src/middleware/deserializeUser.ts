import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt';
import { reIssueAccessToken } from '../service/session.service';
import logger from '../utils/logger';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );

  const refreshToken = get(req, 'headers.x-refresh');

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken, 'accessTokenPublicKey');

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      console.log('found new token');
      res.setHeader('x-access-token', newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string, 'accessTokenPublicKey');

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
