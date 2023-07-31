import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from '../../../../libs/mongodb';
import User from "@/models/user";
import bcrypt from 'bcryptjs';


const handler = NextAuth({

    providers:[
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: "Email", type: "email", placeholder: "email"},
                password: {label: "Password", type: "password", placeholder:"********"}
            },
            async authorize(credentials, req){
                try {
                    await connectDB();

                    const userFound = await User.findOne({email: credentials?.email}).select("+password");
                    if( !userFound ) throw new Error('Invalid credentials');

                    const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password);
                    if(!passwordMatch) throw new Error('Invalid credentials')
                    return userFound
                    
                } catch (error) {
                    
                }
            }
        }),
    ],
    callbacks:{                                                     // Una vez autorizado (logueado)
        jwt({account,token,user,profile,session}){                  // NextAuth nos devuelve en un jwt esta información
            if (user) token.user = user                             // Si el usuario existe nosotros le incorporamos la info del user logueado                                                 
            return token;                                           // Este token se almacena en una cookie y se usa en las páginas para dar o no acceso
        },
        session({session,token}){ // session es la información del user logueado, token la info del jwt leida desde la cookie
            session.user = token.user as any;
            return session
        }
    },
    pages:{
        signIn: '/login' // Si entramos a api/auth/signin nos redirige a /login
    }
})

export { handler as GET, handler as POST }