import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === "/") {
        return baseUrl; // Redirige al home después del logout
      }
      return baseUrl + "/assistant"; // Redirige al chat después del login
    },
  },
});

export { handler as GET, handler as POST };

