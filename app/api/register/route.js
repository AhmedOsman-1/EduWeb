import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { firstName, lastName, email, password, userRole } = await request.json();

    if (![firstName, lastName, email, password, userRole].every(Boolean)) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        await dbConnect();

        const userExists = await User.exists({ email });
        if (userExists) {
            return NextResponse.json({ error: "Email is already registered" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: userRole,
        });

        return NextResponse.json({ message: "User created successfully", user: createdUser }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};
