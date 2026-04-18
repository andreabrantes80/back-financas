import { prismaClient } from "../../prisma";

class CreateGoalService {
  async execute(name: string, target: number, user_id: string) {

    const goal = await prismaClient.goal.create({
      data: {
        name,
        target,
        user_id
      }
    });

    return goal;
  }
}

export { CreateGoalService };