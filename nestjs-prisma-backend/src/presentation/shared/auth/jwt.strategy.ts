import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { log } from "console";
import { passportJwtSecret } from "jwks-rsa";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { TenantAuthInfoRepository } from "src/domain/tenant-auth-info/tenant-auth-info-repository";
import { TenantName } from "src/domain/tenant/tenant-name";
import { TenantRepository } from "src/domain/tenant/tenant-repository";
import { UserAuthInfoRepository } from "src/domain/user-auth-info/user-auth-info-repository";
import { Auth0PayloadInterface } from "src/presentation/shared/auth/auth0-payload-interface";
import { UserSession } from "src/presentation/shared/session/user-session";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
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
    return payload
  }
}
