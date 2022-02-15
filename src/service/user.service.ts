import { getRepository } from "typeorm";
import { User } from "../entity/User";
import logger from "../utils/logger";
import { UserInput } from "../utils/mu-types";

export async function createUser(input: UserInput): Promise<UserInput> {
  const { name, email, password } = input;
  const userRepo = getRepository(User);
  try {
    const user = userRepo.create({ name, email, password });
    await userRepo.save(user);
    return { name, email, password };
  } catch (e: any) {
    if (e.errno == 1062) {
      throw new Error("1062");
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
  if (!isValid) return false;
  return user;
}

export async function getPartialUserByEmail(email: string) {
  try {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.name",
        "user.email",
        "user.password",
        "user.activeListId",
      ])
      .where("user.email = :email", { email })
      .getOne();
    if (!user) return false;
    return user;
  } catch (e) {
    logger.error(e);
  }
}

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
