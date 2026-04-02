"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const AuthUserService_1 = require("../../services/user/AuthUserService");
class AuthUserController {
    async handle(request, response) {
        const { email, password } = request.body;
        const authUserService = new AuthUserService_1.AuthUserService();
        const auth = await authUserService.execute({
            email,
            password,
        });
        return response.json(auth);
    }
}
exports.AuthUserController = AuthUserController;
