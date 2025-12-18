// app/api/register/route.js
import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

// Input validation schema using Zod
const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  userRole: z.enum(["student", "instructor"], "Invalid role"),
});

export const POST = async (request) => {
  try {
    // Connect to MongoDB
    try {
      await dbConnect();
      console.log("MongoDB connected");
    } catch (dbErr) {
      console.error("MongoDB connection failed:", dbErr.message);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Parse JSON body
    let body;
    try {
      body = await request.json();
    } catch (jsonErr) {
      console.error("Invalid JSON body:", jsonErr.message);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    console.log("Request body:", body);

    // Validate input
    const parsedData = registerSchema.safeParse(body);
    if (!parsedData.success) {
      console.warn("Validation failed:", parsedData.error.errors);
      return NextResponse.json(
        { error: "Validation failed", details: parsedData.error.errors },
        { status: 422 }
      );
    }

    const { firstName, lastName, email, password, userRole } = parsedData.data;
    const normalizedEmail = email.toLowerCase();

    // Check if email already exists
    const userExists = await User.exists({ email: normalizedEmail });
    if (userExists) {
      console.warn("Email already exists:", normalizedEmail);
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const createdUser = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      password: hashedPassword,
      role: userRole,
      image: "/avatars/default.png", // default avatar
    });

    console.log("User created:", createdUser._id);

    // Return minimal user data
    const userResponse = {
      id: createdUser._id,
      email: createdUser.email,
      name: `${createdUser.firstName} ${createdUser.lastName}`,
      role: createdUser.role,
      image: createdUser.image,
    };

    return NextResponse.json(
      { message: "User created successfully", user: userResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
};
