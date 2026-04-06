import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // Agora o TypeScript vai entender o 'process.env'
    url: process.env.DATABASE_URL,
  },
});