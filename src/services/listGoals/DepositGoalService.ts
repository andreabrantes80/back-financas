import { prismaClient } from "../../prisma";

interface DepositRequest {
  goal_id: string;
  user_id: string;
  value: number;
}

class DepositGoalService {
  async execute({ goal_id, user_id, value }: DepositRequest) {

    // 🔒 validações
    if (!goal_id || !user_id) {
      throw new Error("Dados inválidos");
    }

    if (!value || value <= 0) {
      throw new Error("Valor inválido");
    }

    // 🔍 buscar meta
    const goal = await prismaClient.goal.findFirst({
      where: {
        id: goal_id,
        user_id
      }
    });

    if (!goal) {
      throw new Error("Meta não encontrada");
    }

    // 🔍 buscar usuário
    const user = await prismaClient.user.findUnique({
      where: { id: user_id }
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // 💰 valida saldo
    if (user.balance < value) {
      throw new Error("Saldo insuficiente");
    }

    // 🔥 TRANSAÇÃO (ESSENCIAL)
    await prismaClient.$transaction(async (tx) => {

      // 💸 desconta do saldo
      await tx.user.update({
        where: { id: user_id },
        data: {
          balance: {
            decrement: value
          }
        }
      });

      // 🎯 adiciona na meta
      await tx.goal.update({
        where: { id: goal_id },
        data: {
          current: {
            increment: value
          }
        }
      });

      // 🧾 histórico (opcional mas recomendado)
      await tx.receive.create({
        data: {
          description: `Depósito na meta: ${goal.name}`,
          value: value,
          type: "withdraw", // saiu do saldo
          date: new Date(),
          user_id
        }
      });

    });

    return {
      message: "Depósito realizado com sucesso"
    };
  }
}

export { DepositGoalService };