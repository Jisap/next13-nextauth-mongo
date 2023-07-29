import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/user";
import bcrypt from 'bcryptjs';




export async function POST(request: Request){

    try {
        await connectDB();
        
        const { fullname, email, password } = await request.json();
    
        if(!password || password.length < 6) return NextResponse.json({
            message: "Password must be at least 6 characters"
        },{ status: 400});
    
        const userFound = await User.findOne({email});
    
        if( userFound ) return NextResponse.json({
            message: "Email already exists"
        }, {status: 409});
    
        const hashedPassword = await bcrypt.hash( password, 12 )
    
        const user = new User({
            email,
            fullname,
            password: hashedPassword
        });

        const savedUser = await user.save(user);
        console.log(savedUser)
    
        return NextResponse.json({
            fullname,
            email,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt,
        },
            { status: 201 });

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 400,
                }
            );
        }
        return NextResponse.error();  
    }

}