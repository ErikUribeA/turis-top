import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 días
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    const existingUser = await prisma.user.upsert({
                        where: { email: user.email! },
                        update: { name: user.name! },
                        create: { email: user.email!, name: user.name!, password: "" },
                    });

                    user.id = existingUser.id;
                    return true;
                } catch (error) {
                    console.error("Error saving user:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.userId as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url === "/") {
                return baseUrl;
            }
            return baseUrl + "/assistant";
        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    debug: process.env.NODE_ENV === "development",
};
