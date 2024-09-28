var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as userService from "../services/userService.js";
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(401).json({ message: "Authorization header missing" });
        return;
    }
    const token = authHeader;
    if (!token) {
        res.status(401).json({ message: "Invalid authorization format" });
        return;
    }
    try {
        const user = yield userService.getUserByToken(token);
        if (!user) {
            res.status(403).json({ message: "Invalid or expired token" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
export default authMiddleware;
