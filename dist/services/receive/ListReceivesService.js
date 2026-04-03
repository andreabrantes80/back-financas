import prisma from "../../prisma";

class ListUserBalanceService {
    async execute({ user_id }) {
        const findUser = await prisma.user.findFirst({
            where: { id: user_id },
        });

        if (!findUser) {
            throw new Error("Usuário não encontrado");
        }

        return { saldo: findUser.balance };
    }
}

export { ListUserBalanceService };