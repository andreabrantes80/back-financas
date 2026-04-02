"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListReceivesController = void 0;
const ListReceivesService_1 = require("../../services/receive/ListReceivesService");
class ListReceivesController {
    async handle(request, response) {
        const date = request.query.date;
        const user_id = request.user_id;
        const listReceivesService = new ListReceivesService_1.ListReceivesService();
        const user = await listReceivesService.execute({
            user_id,
            date
        });
        return response.json(user);
    }
}
exports.ListReceivesController = ListReceivesController;
