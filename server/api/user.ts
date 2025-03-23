import prisma from '~/server/db';
import { verifyToken } from '~/utils/auth';

export default defineEventHandler(async (event) => {
    // Get the token from cookies
    const token = getCookie(event, 'auth_token');

    if (!token) {
        throw createError({ statusCode: 401, message: 'Unauthorized' });
    }

    // Verify the token
    const payload = await verifyToken(token);

    if (!payload) {
        throw createError({ statusCode: 401, message: 'Unauthorized' });
    }

    // Fetch user from the database
    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
    });

    if (!user) {
        throw createError({ statusCode: 404, message: 'User not found' });
    }

    return {
        salutation: user.salutation,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
});