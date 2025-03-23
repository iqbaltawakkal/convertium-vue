import prisma from '~/server/db';
import { generateToken } from '~/utils/auth';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, keepMeLoggedIn } = body;

  // Validate input
  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required' });
  }

  // Find user in the database
  const user: any = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = await generateToken({ userId: user.id });

  // Set HTTP-only cookie
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    maxAge: keepMeLoggedIn ? 60 * 60 * 24 * 400 : 2 * 60 * 60,
    sameSite: 'strict',
    secure: !import.meta.dev, // Enable in production
  });

  return { message: 'Login successful' };
});