import { prismaClient } from "../../prisma";

interface UserRequest {
  user_id: string;
  date: string;
}

class ListUserBalanceService {
  async execute({ user_id, date }: UserRequest) {

    if (!user_id) {
      throw new Error("Invalid user");
    }

    const dashboard = [];

    const findUser = await prismaClient.user.findUnique({
      where: { id: user_id }
    });

    if (!findUser) {
      throw new Error("User not found");
    }

    // 🔹 intervalo do dia
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // 🔹 buscar movimentações
    const movements = await prismaClient.receive.findMany({
      where: {
        user_id,
        date: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });

    // 🔹 somar depósitos
    const totalDeposit = movements
      .filter(item => item.type === 'deposit')
      .reduce((acc, item) => acc + item.value, 0);

    // 🔹 somar saídas
    const totalWithdraw = movements
      .filter(item => item.type === 'withdraw')
      .reduce((acc, item) => acc + item.value, 0);

    // 🔥 retorno padronizado
    dashboard.push(
      {
        tag: 'saldo',
        amount: findUser.balance
      },
      {
        tag: 'deposit',
        amount: totalDeposit
      },
      {
        tag: 'withdraw',
        amount: totalWithdraw
      }
    );

    return dashboard;
  }
}

export { ListUserBalanceService };