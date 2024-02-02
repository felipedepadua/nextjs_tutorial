import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
// You're also using the matcher option from Middleware to specify that it should run on specific paths.
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// The advantage of employing Middleware for this task is that the protected routes will not 
// even start rendering until the Middleware verifies the authentication, enhancing both the security and performance of your application.