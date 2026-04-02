import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Andrezo",
      email: "andrezo@example.com",
      password: "123456",
      balance: 100.0,
    },
  });
  console.log(user);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });