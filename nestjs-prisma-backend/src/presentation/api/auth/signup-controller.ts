import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TenantGuard } from "src/presentation/shared/auth/tenant/tenant-guard";

@Controller('/api/v1/auth/signup')
export class SignupController {
  constructor(){}

  @UseGuards(AuthGuard('jwt'), TenantGuard)
  @Get()
  async create(
    @Request() req
  ): Promise<void> {
    console.log(req.currentTenant)
  }
}
