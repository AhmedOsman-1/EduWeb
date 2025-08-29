import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./model/user-model";
import { authConfig } from "./auth.config";

import bcrypt from "bcryptjs"

 export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
}  
 = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (credentials == null) return null;

                try {
                    const user = await User.findOne({
                        email: credentials?.email
                    })
                    console.log(user)

                    if (user) {
                        const isMatch = await bcrypt.compare( credentials?.password, user?.password);

                        if(isMatch){
                            return user;
                        }else{
                            console.error("user does not exist")
                            throw new Error("User not found");
                        }
                    }
                    else {
                        throw new Error("No user found with the email");
                    }
                } catch (error) {
                    
                }
            }
        })
    ]
 })