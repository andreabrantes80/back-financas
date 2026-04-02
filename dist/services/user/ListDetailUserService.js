"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDetailUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListDetailUserService {
    async execute(user_id) {
        if (!user_id) {
            throw new Error("Invalid user");
        }
        const user = await prisma_1.default.user.findFirst({
            where: {
                id: user_id,
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
        if (user === null) {
            throw new Error("User not found");
        }
        return user;
    }
}
exports.ListDetailUserService = ListDetailUserService;
