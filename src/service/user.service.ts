import { getRepository } from "typeorm";
import { User } from "../entity/User";

export async function getPartialUserByAuthSession(id: string) {
  const user = await getRepository(User)
    .createQueryBuilder("user")
    .select(["user.id", "user.name", "user.email"])
    .innerJoin("user.authSessions", "session")
    .where("session.id = :id", { id })
    .getOne();

  if (!user) return false;
  return user;
}
