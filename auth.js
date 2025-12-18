import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/service/mongo";
import { User } from "@/model/user-model";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    // =======================
    // CREDENTIALS LOGIN
    // =======================
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          image: user.profilePicture,
        };
      },
    }),

    // =======================
    // GOOGLE LOGIN
    // =======================
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // 🔥 THIS FIXES GOOGLE USER ISSUE
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await dbConnect();

        const exists = await User.findOne({ email: user.email });

        if (!exists) {
          const [firstName = "", lastName = ""] = user.name.split(" ");

          await User.create({
            firstName,
            lastName,
            email: user.email,
            password: null,
            role: "student",
            profilePicture: user.image,
            provider: "google",
          });
        }
      }
      return true;
    },

    // 🔥 SESSION ALWAYS HAS DATA
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.picture;
      return session;
    },
  },
});
