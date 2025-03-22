import prisma from '~/server/db';
import { verifyToken } from '~/utils/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    // Only run on the server
    if (import.meta.server) {
        const event: any = useRequestEvent();

        // Get the token from cookies
        const token = getCookie(event, 'auth_token');
        console.log('Token from cookies:', token);

        if (!token) {
            console.log('No token found, redirecting to login');
            return navigateTo('/login');
        }

        // Verify the token
        const payload = await verifyToken(token);
        console.log('Token payload:', payload);

        if (!payload) {
            console.log('Invalid token, redirecting to login');
            deleteCookie(event, 'auth_token');
            return navigateTo('/login');
        }

        // Fetch user from the database
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
        });
        console.log('User from database:', user);

        if (!user) {
            console.log('User not found, redirecting to login');
            deleteCookie(event, 'auth_token');
            return navigateTo('/login');
        }

        console.log('User is authenticated');
    }
});