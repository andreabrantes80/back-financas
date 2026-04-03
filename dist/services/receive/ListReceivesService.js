"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListReceivesService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListReceivesService {
    async execute({ user_id, date }) {
        if (!user_id) {
            throw new Error("Usuário não encontrado");
        }
        const whereClause = { user_id };
        if (date) {
            whereClause.date = date;
        }
        const receives = await prisma_1.default.receive.findMany({
            where: whereClause,
            orderBy: { date: 'desc' },
        });
        return receives;
    }
}
exports.ListReceivesService = ListReceivesService;
