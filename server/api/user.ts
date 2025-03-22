import prisma from '~/server/db';
import { verifyToken } from '~/utils/auth';

export default defineEventHandler(async (event) => {
    // Get the token from cookies
    const token = getCookie(event, 'auth_token');
    console.log('Token from cookies:', token);

    if (!token) {
        throw createError({ statusCode: 401, message: 'Unauthorized' });
    }

    // Verify the token
    const payload = await verifyToken(token);
    console.log('Token payload:', payload);

    if (!payload) {
        throw createError({ statusCode: 401, message: 'Unauthorized' });
    }

    // Fetch user from the database
    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
    });
    console.log('User from database:', user);

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