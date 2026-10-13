import "reflect-metadata";
import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppController } from "./app.controller";
import { PrismaService } from "./prisma.service";

@Module({ controllers: [AppController], providers: [PrismaService] })
class AppModule {}

async function main() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(Number(process.env.PORT ?? 8080));
}

main();
