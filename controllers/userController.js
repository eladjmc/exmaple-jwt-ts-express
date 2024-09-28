var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as userService from '../services/userService.js';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your_jwt_secret'; // In production, use environment variables
export const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userService.createUser(username, password);
        res.json({ id: user.id, username: user.username });
    }
    catch (error) {
        next(error);
    }
});
export const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userService.authenticateUser(username, password);
        if (user) {
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }
        else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    }
    catch (error) {
        next(error);
    }
});
