import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { passportJwtSecret } from "jwks-rsa";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Auth0PayloadInterface } from "src/presentation/shared/auth/jwt/auth0-payload-interface";

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
      algorithms: ['RS256']
    })
  }

  async validate(payload: Auth0PayloadInterface): Promise<any> {
    return payload
  }
}
