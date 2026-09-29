import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import dotenv from "dotenv";

const envPath = [
  fileURLToPath(new URL("../.env", import.meta.url)),
  fileURLToPath(new URL("../../.env", import.meta.url)),
].find((path) => existsSync(path));

if (envPath) {
  dotenv.config({ path: envPath });
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
