"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserBalanceController = void 0;
const ListUserBalanceService_1 = require("../../services/user/ListUserBalanceService");
class ListUserBalanceController {
    async handle(request, response) {
        const user_id = request.user_id;
        const date = request.query.date;
        const listUserBalanceService = new ListUserBalanceService_1.ListUserBalanceService();
        const detail = await listUserBalanceService.execute({
            user_id,
            date,
        });
        return response.json(detail);
    }
}
exports.ListUserBalanceController = ListUserBalanceController;
