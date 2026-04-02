"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    async execute({ email, password }) {
        const user = await prisma_1.default.user.findFirst({
            where: {
                email: email,
            }
        });
        if (!user) {
            throw new Error("Email/Password incorret");
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(password, user.password);
        if (!passwordMatch) {
            throw new Error("Email/Password incorret");
        }
        const token = (0, jsonwebtoken_1.sign)({
            name: user.name,
            email: user.email,
        }, "4f93ac9d10cb751b8c9c646bc9dbccb9", {
            subject: user.id,
            expiresIn: '30d'
        });
        return {
            id: user.id,
            name: user.name,
            token: token
        };
    }
}
exports.AuthUserService = AuthUserService;
