"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListReceivesService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListReceivesService {
    async execute({ date, user_id }) {
        const receives = await prisma_1.default.receive.findMany({
            where: {
                date: date,
                user_id: user_id,
            },
            orderBy: {
                created_at: "desc"
            }
        });
        return receives;
    }
}
exports.ListReceivesService = ListReceivesService;
