import prisma from "../../prisma";

class CreateReceiveService {
    async execute({ description, type, value, date, user_id }) {
        if (!user_id) {
            throw new Error("Invalid user");
        }

        const findUser = await prisma.user.findFirst({
            where: { id: user_id },
        });

        if (!findUser) {
            throw new Error("Usuário não encontrado");
        }

        const newBalance =
            type === "receita"
                ? findUser.balance + Number(value)
                : findUser.balance - Number(value);

        await prisma.user.update({
            where: { id: user_id },
            data: { balance: newBalance },
        });

        const newReceive = await prisma.receive.create({
            data: { description, type, value, date, user_id },
        });

        return newReceive;
    }
}

export { CreateReceiveService };