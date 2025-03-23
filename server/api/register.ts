import prisma from '~/server/db';
import { generateToken } from '~/utils/auth';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  // Validate input
  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'All fields are required' });
  }

  // Check if user already exists
  const userExists = await prisma.user.findUnique({
    where: { email },
  });
  if (userExists) {
    throw createError({ statusCode: 400, message: 'User already exists' });
  }

  // Hash the password
  const saltRounds = 10; // Number of salt rounds for bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create new user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName: '',
      lastName: '',
      salutation: '',
      address: '',
      country: '',
      postalCode: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      spouseFirstName: '',
      spouseLastName: '',
      spouseSalutation: '',
      hobbiesInterests: '',
      favoriteSport: '',
      preferredMusic: '',
      preferredMovie: '',
    },
  });

  // Generate JWT
  const token = await generateToken({ userId: user.id });

  // Set HTTP-only cookie
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    maxAge: 2 * 60 * 60, // 2 hours
    sameSite: 'strict',
    secure: !import.meta.dev, // Enable in production
  });

  return { message: 'Registration successful' };
});