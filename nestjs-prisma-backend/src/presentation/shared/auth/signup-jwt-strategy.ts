import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { log } from "console";
import { passportJwtSecret } from "jwks-rsa";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { TenantAuthInfoRepository } from "src/domain/tenant-auth-info/tenant-auth-info-repository";
import { TenantName } from "src/domain/tenant/tenant-name";
import { TenantRepository } from "src/domain/tenant/tenant-repository";
import { UserAuthInfoRepository } from "src/domain/user-auth-info/user-auth-info-repository";
import { TenantPrismaRepository } from "src/infra/repository/prisma/tenant-prisma-repository";
import { UserPrismaRepository } from "src/infra/repository/prisma/user-prisma-repository";
import { Auth0PayloadInterface } from "src/presentation/shared/auth/auth0-payload-interface";
import { UserSession } from "src/presentation/shared/session/user-session";

@Injectable()
export class SignUpJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(TenantPrismaRepository) private tenantRepository: TenantRepository,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
      passReqToCallback: true
    })
  }

  async validate(req: Request, payload: Auth0PayloadInterface): Promise<any> {
    const tenantDomain = req.headers['host']

    const tenant = await this.tenantRepository.findByTenantName(
      new TenantName(tenantDomain)
    )

    if(!tenant) {
      throw new InternalServerErrorException("Tenant Is Not Register")
    }

    return {
      auth0UserID: payload.sub,
      email: payload['meta_email'],
      tenantId: tenant.tenantId
    }
  }
}
