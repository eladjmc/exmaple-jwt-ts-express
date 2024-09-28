var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getUsers, saveUsers } from '../dal/userDAL.js';
import bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';
export const createUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield getUsers();
    const passwordHash = yield bcrypt.hash(password, 10);
    const newUser = {
        id: uuid4(),
        username,
        passwordHash,
        token: null, // field
    };
    users.push(newUser);
    yield saveUsers(users);
    return newUser;
});
export const authenticateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield getUsers();
    const user = users.find(u => u.username === username);
    if (user && (yield bcrypt.compare(password, user.passwordHash))) {
        return user;
    }
    return null;
});
export const updateUserToken = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex].token = token;
        yield saveUsers(users);
    }
});
export const getUserByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield getUsers();
    const user = users.find(u => u.token === token);
    return user || null;
});
