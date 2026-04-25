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

    const result = await prismaClient.goal.deleteMany({
      where: {
        id: goal_id,
        user_id: user_id
      }
    });

    if (result.count === 0) {
      throw new Error("Meta não encontrada");
    }

    return { message: "Meta deletada com sucesso" };
  }
}

export { DeleteGoalService };