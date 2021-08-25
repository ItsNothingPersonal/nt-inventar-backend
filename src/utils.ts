import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { Context } from './context';
import { NTClaim } from './ntclaim';

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: process.env.JWKS_URI as string,
});

export function getJWT(req: Request): string | undefined {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw new Error('no token found');
    }
    return token;
  }
}

async function getPublicKey(kid: string): Promise<string> {
  return (await client.getSigningKey(kid)).getPublicKey();
}

export async function testJWT(
  context: Context
): Promise<{ isValid: Boolean; verifyResult: JwtPayload }> {
  let isValid = false;
  let verifyResult: JwtPayload = {};

  if (context.jwt) {
    const publicKey = await getPublicKey(
      process.env.AUTH_PUBLIC_KEY_KID as string
    );

    try {
      verifyResult = jwt.verify(context.jwt, publicKey, {
        audience: [process.env.AUTH0_AUDIENCE as string],
        issuer: process.env.ISSUER_BASE_URL as string,
      }) as JwtPayload;
      isValid = true;
    } catch (error) {
      console.error(`error while verifying token:${error}`);
    }
  }
  return { isValid, verifyResult };
}

export async function hasUserRole(
  context: Context,
  role: string
): Promise<boolean> {
  const { isValid, verifyResult } = await testJWT(context);

  return (
    isValid &&
    (verifyResult as NTClaim)[
      'https://www.naechtlichestheater.de/jwt/claims'
    ].userRoles.includes(role)
  );
}

export async function hasWriteAccess(context: Context): Promise<boolean> {
  const { isValid, verifyResult } = await testJWT(context);
  return (
    isValid &&
    (verifyResult as NTClaim)['https://www.naechtlichestheater.de/jwt/claims']
      .inventarWriteAccess
  );
}
