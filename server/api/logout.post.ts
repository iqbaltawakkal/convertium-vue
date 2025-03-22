export default defineEventHandler(async (event) => {
    console.log('deleteCookie')
    deleteCookie(event, 'auth_token');
    return { message: 'Logout successful' };
});