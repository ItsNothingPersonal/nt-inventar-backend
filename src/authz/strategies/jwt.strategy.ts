import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.ISSUER_BASE_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.ISSUER_BASE_URL}`,
      algorithms: ['RS256'],
    });
  }

  validate(payload: unknown): unknown {
    const hasInventarWriteAccess = Boolean(
      JSON.parse(
        payload['https://www.naechtlichestheater.de/jwt/claims']
          .inventarWriteAccess,
      ),
    );

    if (!hasInventarWriteAccess) {
      throw new UnauthorizedException(
        'Dieser Account hat keine Inventar-Schreibrechte!',
      );
    }

    return payload;
  }
}
