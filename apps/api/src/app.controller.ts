import { BadRequestException, Body, Controller, Get, HttpCode, Post, ServiceUnavailableException } from "@nestjs/common";
import { normalizeEmail } from "./email";
import { PrismaService } from "./prisma.service";

@Controller()
export class AppController {
  constructor(private readonly db: PrismaService) {}

  // Ready only when the database answers.
  @Get("health")
  async health() {
    try {
      await this.db.$queryRaw`SELECT 1`;
      return { status: "ok" };
    } catch {
      throw new ServiceUnavailableException("database unreachable");
    }
  }

  @Post("signups")
  @HttpCode(200)
  async signup(@Body() body: { email?: unknown }) {
    const email = normalizeEmail(body?.email);
    if (!email) throw new BadRequestException("enter a valid email address");
    // Signing up twice is not an error.
    await this.db.signup.upsert({ where: { email }, create: { email }, update: {} });
    return { email };
  }

  @Get("signups")
  async list() {
    const signups = await this.db.signup.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
    return { count: await this.db.signup.count(), signups };
  }
}
