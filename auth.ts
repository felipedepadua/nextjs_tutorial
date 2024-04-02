import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // providers is an array where you list different login options such as Google or GitHub. 
  // For this course, we will focus on using the Credentials provider only.
  // PS: Although we're using the Credentials provider, it's generally recommended to use alternative providers such as OAuth or email providers.
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null; // return null to prevent the user from logging in.
      },
    }),
  ],
});

// See: https://authjs.dev/getting-started/providers/credentials-tutorial
// providers is an array where you list different login options such as Google or GitHub.
// For this course, we will focus on using the Credentials provider only.
// Good to know: Although we're using the Credentials provider, it's generally recommended to use alternative
// providers such as OAuth or email providers. See the NextAuth.js docs for a full list of options.
