import type { NextAuthResult } from "next-auth";

// Only initialize NextAuth if AUTH_SECRET is configured
let authResult: NextAuthResult | null = null;

async function getAuth() {
  if (authResult) return authResult;
  if (!process.env.AUTH_SECRET) return null;

  const NextAuth = (await import("next-auth")).default;
  const CredentialsProvider = (await import("next-auth/providers/credentials"))
    .default;
  const { compare } = await import("bcryptjs");
  const { supabase } = await import("./supabase");

  authResult = NextAuth({
    pages: {
      signIn: "/auth/login",
      error: "/auth/login",
    },
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.role = (user as Record<string, unknown>).role as string;
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.role = token.role as string;
          session.user.id = token.id as string;
        }
        return session;
      },
      async redirect({ url, baseUrl }) {
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
    },
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Mot de passe", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password || !supabase) {
            return null;
          }

          const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", credentials.email as string)
            .single();

          if (error || !user || !user.password_hash) {
            return null;
          }

          const isValid = await compare(
            credentials.password as string,
            user.password_hash
          );

          if (!isValid) {
            return null;
          }

          await supabase
            .from("users")
            .update({ last_login: new Date().toISOString() })
            .eq("id", user.id);

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        },
      }),
      ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ? [
            (await import("next-auth/providers/google")).default({
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
          ]
        : []),
    ],
  });

  return authResult;
}

export { getAuth };
