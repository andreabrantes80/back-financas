import { prismaClient } from "../../prisma";

interface UserRequest {
  user_id: string;
  date?: string;
}

class ListReceivesService {
  async execute({ user_id, date }: UserRequest) {
    if (!user_id) {
      throw new Error("Usuário não encontrado");
    }

    const whereClause: any = { user_id };
    if (date) {
       const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    whereClause.date = {
      gte: start,
      lte: end
    };
    }

    const receives = await prismaClient.receive.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
    });

    return receives;
  }
}

export { ListReceivesService };