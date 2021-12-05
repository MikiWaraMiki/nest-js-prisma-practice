import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('/api/v1/auth/signup')
export class SignupController {
  constructor(){}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body('email') email: string): Promise<void> {
    console.log(email)
  }
}
