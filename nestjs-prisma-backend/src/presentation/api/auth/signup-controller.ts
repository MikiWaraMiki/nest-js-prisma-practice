import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('/api/v1/auth/signup')
export class SignupController {
  constructor(){}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async create(@Request() req): Promise<void> {
    console.log(req.user)
  }
}
