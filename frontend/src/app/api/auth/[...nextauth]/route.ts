import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import jwt from 'jsonwebtoken';
import type { JWT } from 'next-auth/jwt';

// Extend NextAuth types to include user ID
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id: string;
  }
}

// Required for Next.js App Router with dynamic API routes
export const dynamic = 'force-dynamic';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60,
    // Use HS256 JWT instead of default JWE encryption for backend compatibility
    encode: async ({ secret, token }) => {
      if (!secret) throw new Error('No secret provided for JWT encoding');
      return jwt.sign(token || {}, secret, { algorithm: 'HS256' });
    },
    decode: async ({ secret, token }) => {
      if (!secret || !token) return null;
      try {
        return jwt.verify(token, secret, { algorithms: ['HS256'] }) as JWT;
      } catch (error) {
        console.error('[NextAuth] JWT decode error:', error);
        return null;
      }
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        // NextAuth auto-prefixes with __Secure- when secure=true (production HTTPS)
        // Backend checks both: __Secure-next-auth.session-token (prod) and next-auth.session-token (dev)
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV !== 'production',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
