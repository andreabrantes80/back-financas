// import { prismaClient } from "../../prisma";

// interface UserRequest {
//   user_id: string;
//   date: string;
// }

// interface ItemProp{
//   id: string;
//   description: string;
//   value: number;
//   type: string;
//   date: Date;
//   user_id: string;
// }

// class ListUserBalanceService{
//   async execute({ user_id, date }: UserRequest){

//     if (!user_id) {
//       throw new Error("Invalid user");
//     }

//     const dashboard = [];
//     const findUser = await prismaClient.user.findFirst({
//       where:{
//         id: user_id,
//       }
//     })

//     if (!findUser) {
//       throw new Error("User not found");
//     }

//     const data = {
//       tag: 'saldo',
//       saldo: findUser.balance
//     }

//     const findReceive = await prismaClient.receive.findMany({
//       where:{
//         date: date,
//         user_id: user_id,
//         type: 'receita'
//       }
//     })
//     console.log(findReceive);

//     const findExpenses = await prismaClient.receive.findMany({
//       where:{
//         date: date,
//         user_id: user_id,
//         type: 'despesa'
//       }
//     })
//     console.log(findExpenses);


//   //  const resultRevenue = findReceive.reduce(getSoma, 0);

//   //  const resultExpenses = findExpenses.reduce(getSoma, 0);

//   //   function getSoma(total: number, num: ItemProp) {
//   //     return total + num.value;
//   //   }

//     const resultRevenue = findReceive.reduce((total, item) => {
//   return total + item.value;
//     }, 0);
//     console.log(resultRevenue);

// const resultExpenses = findExpenses.reduce((total, item) => {
//   return total + item.value;
// }, 0);
//     console.log(resultExpenses);

//     const sumDailyRevenue = {
//       tag: 'receita',
//       saldo: resultRevenue
//     }

//     const sumDailyExpense = {
//       tag: 'despesa',
//       saldo: resultExpenses
//     }

//     dashboard.push(data, sumDailyRevenue, sumDailyExpense);

//     return dashboard;
//   }

// }


// export { ListUserBalanceService }

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

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      }
    });

    if (!findUser) {
      throw new Error("User not found");
    }

    // 🔥 saldo total do usuário
    const data = {
      tag: 'saldo',
      saldo: findUser.balance
    };

    // 🔥 corrigindo filtro de data (intervalo do dia)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // 🚀 apenas 1 query (melhor performance)
    const allMovements = await prismaClient.receive.findMany({
      where: {
        user_id: user_id,
        date: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });

    // 🔥 soma receitas
    const resultRevenue = allMovements
      .filter(item => item.type === 'receita')
      .reduce((total, item) => {
        return total + item.value;
      }, 0);

    // 🔥 soma despesas
    const resultExpenses = allMovements
      .filter(item => item.type === 'despesa')
      .reduce((total, item) => {
        return total + item.value;
      }, 0);

    const sumDailyRevenue = {
      tag: 'receita',
      saldo: resultRevenue
    };

    const sumDailyExpense = {
      tag: 'despesa',
      saldo: resultExpenses
    };

    dashboard.push(data, sumDailyRevenue, sumDailyExpense);

    return dashboard;
  }
}

export { ListUserBalanceService };