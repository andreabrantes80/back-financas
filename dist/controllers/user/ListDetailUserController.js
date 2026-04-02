"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDetailUserController = void 0;
const ListDetailUserService_1 = require("../../services/user/ListDetailUserService");
class ListDetailUserController {
    async handle(request, response) {
        const user_id = request.user_id;
        const listDetailUserService = new ListDetailUserService_1.ListDetailUserService();
        const user = await listDetailUserService.execute(user_id);
        return response.json(user);
    }
}
exports.ListDetailUserController = ListDetailUserController;
