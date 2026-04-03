import prisma from "../../prisma";

class DeleteReceiveService {
    async execute({ item_id, user_id }) {
        const receive = await prisma.receive.findFirst({
            where: { id: item_id },
        });

        if (!receive) {
            throw new Error("Recebimento não encontrado");
        }

        const findUser = await prisma.user.findFirst({
            where: { id: user_id },
        });

        if (!findUser) {
            throw new Error("Usuário não encontrado");
        }

        await prisma.receive.delete({
            where: { id: item_id },
        });

        const valueUpdated =
            receive.type === "despesa"
                ? findUser.balance + receive.value
                : findUser.balance - receive.value;

        await prisma.user.update({
            where: { id: user_id },
            data: { balance: valueUpdated },
        });

        return { status: "updated" };
    }
}

export { DeleteReceiveService };