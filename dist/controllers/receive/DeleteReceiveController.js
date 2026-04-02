"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteReceiveController = void 0;
const DeleteReceiveService_1 = require("../../services/receive/DeleteReceiveService");
class DeleteReceiveController {
    async handle(request, response) {
        const user_id = request.user_id;
        const item_id = request.query.item_id;
        const deleteReceiveService = new DeleteReceiveService_1.DeleteReceiveService();
        const deleteItem = await deleteReceiveService.execute({
            item_id,
            user_id,
        });
        return response.json(deleteItem);
    }
}
exports.DeleteReceiveController = DeleteReceiveController;
