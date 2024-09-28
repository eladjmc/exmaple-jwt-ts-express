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
export const createUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield getUsers();
    const passwordHash = yield bcrypt.hash(password, 10);
    const newUser = {
        id: users.length + 1,
        username,
        passwordHash,
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
