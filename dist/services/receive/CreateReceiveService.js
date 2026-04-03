"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReceiveService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateReceiveService {
    async execute({ description, type, value, date, user_id }) {
        if (!user_id) {
            throw new Error("Invalid user");
        }
        const findUser = await prisma_1.default.user.findFirst({
            where: { id: user_id },
        });
        if (!findUser) {
            throw new Error("Usuário não encontrado");
        }
        if (type === "receita") {
            await prisma_1.default.user.update({
                where: { id: user_id },
                data: { balance: findUser.balance + Number(value) },
            });
        }
        else {
            await prisma_1.default.user.update({
                where: { id: user_id },
                data: { balance: findUser.balance - Number(value) },
            });
        }
        const newReceive = await prisma_1.default.receive.create({
            data: { description, type, value, date, user_id },
        });
        return newReceive;
    }
}
exports.CreateReceiveService = CreateReceiveService;
