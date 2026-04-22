import { prismaClient } from "../../prisma";

interface DeleteGoalRequest {
  goal_id: string;
  user_id: string;
}

class DeleteGoalService {
  async execute({ goal_id, user_id }: DeleteGoalRequest) {

    if (!goal_id || !user_id) {
      throw new Error("Dados inválidos");
    }

    // 🔒 verifica se a meta existe e pertence ao usuário
    const goal = await prismaClient.goal.deleteMany({
      where: {
        id: goal_id,
        user_id: user_id
      }
    });

    if (!goal) {
      throw new Error("Meta não encontrada");
    }

    // 🗑️ deleta
    await prismaClient.goal.delete({
      where: {
        id: goal_id
      }
    });

    return { message: "Meta deletada com sucesso" };
  }
}

export { DeleteGoalService };