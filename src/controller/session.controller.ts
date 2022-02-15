import { Request, Response } from "express";
import config from "config";
import { validatePassword } from "../service/user.service";
import {
  createNewSession,
  findUserAuthSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt";

export async function createSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);
  if (!user) return res.status(401).send("Invalid email or password");

  const session = await createNewSession(user, req.get("user-agent") || "");

  const accessToken = signJwt(
    { ...user, session: session.id },
    "accessTokenPrivateKey",
    { expiresIn: config.get("accessTokenTtl") }
  );

  const refreshToken = signJwt(
    { ...user, session: session.id },
    "refreshTokenPrivateKey",
    { expiresIn: config.get("refreshTokenTtl") }
  );
  res.setHeader("accessToken", accessToken);
  res.setHeader("refreshToken", refreshToken);
  const { password, ...result } = user;

  return res.send({ accessToken, refreshToken, user: result });
}

export async function getSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const sessions = await findUserAuthSessions(userId);
  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user.id;
  try {
    await updateSession(userId);
    return res.send({
      accessToken: null,
      refreshToken: null,
    });
  } catch (e) {
    return res.status(409);
  }
}
