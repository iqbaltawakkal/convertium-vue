import prisma from '~/server/db';
import { verifyToken } from '~/utils/auth';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, firstName, lastName, salutation } = body;

  const token = getCookie(event, 'auth_token');

  // Verify the token
  const payload = await verifyToken(token || '');

  const updateUser = await prisma.user.update({
    where: { id: payload.userId },
    data: body,
  })

  if (!updateUser) {
    throw createError({ statusCode: 500, message: 'User update failed' });
  }

  return { message: 'Update successful' };
});