import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/presentation/shared/session/jwt-auth.guard";

@Controller('/api/v1/auth/signup')
export class SignupController {
  constructor(){}

  @UseGuards(JwtAuthGuard)
  @Get()
  async test(): Promise<void> {
    console.log('called')
  }
}
