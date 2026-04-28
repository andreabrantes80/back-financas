import { prismaClient } from "../../prisma";

class ListGoalsService {
  async execute(user_id: string) {

    if (!user_id) {
      throw new Error("Usuário inválido");
    }

    const goals = await prismaClient.goal.findMany({
      where: { user_id },
      orderBy: {
        created_at: 'desc'
      }
    });

    const goalsWithProgress = goals.map(goal => {

      const current = Number(goal.current) || 0;
      const target = Number(goal.target) || 0;

      const progress = target > 0
        ? Math.min((current / target) * 100, 100)
        : 0;

      const remaining = Math.max(target - current, 0);

      return {
        id: goal.id,
        name: goal.name,
        target,
        current,
        progress,
        remaining,
        created_at: goal.created_at
      };
    });

    return goalsWithProgress;
  }
}

export { ListGoalsService };