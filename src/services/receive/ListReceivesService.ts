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
    // if (date) {
    //   whereClause.date = date;
    // }
    if (date) {
      whereClause.date = {
      contains: date
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