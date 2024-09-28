import { User } from '../models/User.js';
import { getUsers, saveUsers } from '../dal/userDAL.js';
import bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';

export const createUser = async (username: string, password: string): Promise<User> => {
  const users = await getUsers();
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: uuid4(),
    username,
    passwordHash,
    token: null, // field
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

export const updateUserToken = async (userId: string, token: string | null): Promise<void> => {
  const users = await getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].token = token;
    await saveUsers(users);
  }
};

export const getUserByToken = async (token: string): Promise<User | null> => {
  const users = await getUsers();
  const user = users.find(u => u.token === token);
  return user || null;
};
