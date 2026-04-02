"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
class CreateUserService {
    async execute({ name, email, password, balance = 0 }) {
        if (!email) {
            throw new Error("Email incorrect");
        }
        const userAlreadyExists = await prisma_1.default.user.findFirst({
            where: {
                email: email,
            }
        });
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }
        const passwordHash = await (0, bcryptjs_1.hash)(password, 8);
        const user = await prisma_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                balance,
            },
            select: {
                id: true,
                name: true,
                email: true,
                balance: true,
                created_at: true,
                updated_at: true,
            }
        });
        return user;
    }
}
exports.CreateUserService = CreateUserService;
