import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export const DUMMY_PASSWORD_HASH =
  "$2a$12$C6UzMDM.H6dfI/f/IKcEe.7F7sN7y7T7C1r7Q9Q8V5bX4Hq3oW2mK";
