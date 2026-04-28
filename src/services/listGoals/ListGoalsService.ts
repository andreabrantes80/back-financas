import { prismaClient } from "../../prisma";

class ListGoalsService {
  async execute(user_id: string) {

    const goals = await prismaClient.goal.findMany({
      where: { user_id }
    });


    // montar resposta com progresso
    const goalsWithProgress = goals.map(goal => {
       const current = goal.current || 0;
      const target = goal.target || 0;

      const progress = target > 0
        ? Math.min((current / target) * 100, 100)
        : 0;

      const remaining = Math.max(target - current, 0);

      return {
        ...goal,
        progress,
        remaining
      };
    });

    return goalsWithProgress;
  }
}

export { ListGoalsService };