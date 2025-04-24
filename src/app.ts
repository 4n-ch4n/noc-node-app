import { Server } from './presentation/server';
import { MongoDatabase } from './data/mongo';
import { envs } from './config/plugins/envs.plugin';
import { PrismaClient } from '@prisma/client';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  })

  Server.start();
}