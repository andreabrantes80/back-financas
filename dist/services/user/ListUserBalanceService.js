"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserBalanceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListUserBalanceService {
    async execute({ user_id, date }) {
        if (!user_id) {
            throw new Error("Invalid user");
        }
        const dashboard = [];
        const findUser = await prisma_1.default.user.findFirst({
            where: {
                id: user_id,
            }
        });
        const data = {
            tag: 'saldo',
            saldo: findUser.balance
        };
        const findReceive = await prisma_1.default.receive.findMany({
            where: {
                date: date,
                user_id: user_id,
                type: 'receita'
            }
        });
        const findExpenses = await prisma_1.default.receive.findMany({
            where: {
                date: date,
                user_id: user_id,
                type: 'despesa'
            }
        });
        const resultRevenue = findReceive.reduce(getSoma, 0);
        const resultExpenses = findExpenses.reduce(getSoma, 0);
        function getSoma(total, num) {
            return total + num.value;
        }
        const sumDailyRevenue = {
            tag: 'receita',
            saldo: resultRevenue
        };
        const sumDailyExpense = {
            tag: 'despesa',
            saldo: resultExpenses
        };
        dashboard.push(data, sumDailyRevenue, sumDailyExpense);
        return dashboard;
    }
}
exports.ListUserBalanceService = ListUserBalanceService;
