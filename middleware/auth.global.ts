import { verifyToken } from '~/utils/auth';
import { getCookie, deleteCookie } from 'h3'

const PUBLIC_ROUTES = ['/login', '/register', '/'];
export default defineNuxtRouteMiddleware(async (to, from) => {
    // Only run on the server
    if (import.meta.server) {
        const event: any = useRequestEvent();
        const token = getCookie(event, 'auth_token');
        const payload = await verifyToken(token || '');

        if (PUBLIC_ROUTES.includes(to.path)) {
            if (payload) return '/dashboard';
            else if (to.path === '/') return '/login';
        } else if (to.path === '/dashboard') {
            if (!payload) return '/login';
        }

        if (!payload) deleteCookie(event, 'auth_token');
    }
});