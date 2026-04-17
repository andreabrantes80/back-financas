import { prismaClient } from "../../prisma";

class ListGoalsService {
  async execute(user_id: string) {

    const goals = await prismaClient.goal.findMany({
      where: { user_id }
    });

    // pegar total do usuário
    const balance = await prismaClient.receive.findMany({
      where: { user_id }
    });

    const total = balance.reduce((acc, item) => {
      return item.type === 'deposit'
        ? acc + item.value
        : acc - item.value;
    }, 0);

    // montar resposta com progresso
    const goalsWithProgress = goals.map(goal => {
      const progress = (total / goal.target) * 100;

      return {
        ...goal,
        current: total,
        progress: progress > 100 ? 100 : progress,
        remaining: goal.target - total
      };
    });

    return goalsWithProgress;
  }
}

export { ListGoalsService };