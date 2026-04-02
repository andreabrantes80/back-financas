"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteReceiveService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteReceiveService {
    async execute({ item_id, user_id }) {
        const receive = await prisma_1.default.receive.findFirst({
            where: {
                id: item_id
            }
        });
        await prisma_1.default.receive.delete({
            where: {
                id: item_id
            }
        });
        if (!receive) {
            throw new Error("Recebimento não encontrado");
        }

        const findUser = await prisma_1.default.user.findFirst({
            where: {
                id: user_id,
            }
        });
        const valueUpdated = receive.type === 'despesa' ? findUser.balance += receive.value : findUser.balance -= receive.value;
        const updateUser = await prisma_1.default.user.update({
            where: {
                id: user_id,
            },
            data: {
                balance: valueUpdated
            }
        });
        return { status: 'updated' };
    }
}
exports.DeleteReceiveService = DeleteReceiveService;
