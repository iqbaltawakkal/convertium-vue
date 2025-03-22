import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode('secret-key')

// Generate JWT
export const generateToken = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);
};

// Verify JWT
export const verifyToken = async (token: string): Promise<any | null> => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as any;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};