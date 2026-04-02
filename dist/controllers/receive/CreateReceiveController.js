"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReceiveController = void 0;
const CreateReceiveService_1 = require("../../services/receive/CreateReceiveService");
class CreateReceiveController {
    async handle(request, response) {
        const { description, value, type, date } = request.body;
        const user_id = request.user_id;
        const createReceiveService = new CreateReceiveService_1.CreateReceiveService();
        const user = await createReceiveService.execute({
            description,
            value,
            type,
            date,
            user_id,
        });
        return response.json(user);
    }
}
exports.CreateReceiveController = CreateReceiveController;
