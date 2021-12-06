import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('/api/v1/auth/signup')
export class SignupController {
  constructor(){}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async test(): Promise<void> {
    console.log('called')
  }
}
