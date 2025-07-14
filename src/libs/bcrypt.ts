import bcrypt from "bcryptjs";

export function hash(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
}