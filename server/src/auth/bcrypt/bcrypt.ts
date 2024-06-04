import * as bcrypt from 'bcrypt';
const saltRounds = 10;
export async function generateHashedPassword(password: string) {
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyHashAndPassword(
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}
