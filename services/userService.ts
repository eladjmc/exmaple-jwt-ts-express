import { User } from '../models/User';
import { getUsers, saveUsers } from '../dal/userDAL.js';
import bcrypt from 'bcrypt';

export const createUser = async (username: string, password: string): Promise<User> => {
  const users = await getUsers();
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: users.length + 1,
    username,
    passwordHash,
  };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
};

export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
  const users = await getUsers();
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    return user;
  }
  return null;
};
