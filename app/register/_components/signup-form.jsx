'use client'
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { set } from "mongoose";

export function SignupForm({ role }) {

const router = useRouter();
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
 async function onSubmit(event) {
  event.preventDefault();
  setError("");
  setLoading(true);

  try {
    const formData = new FormData(event.currentTarget);



    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if(password !== confirmPassword){
        setError("passwords do not match!");
        setLoading(false);
        return;
    }

    const userRole = ((role === "student") || (role === "instructor")) ? role : "student";



    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            userRole
        })
    })

    if(response.status === 201) {
      router.push("/login");
    }else {
        const data = await response.json();
        setError(data.message || "Something went wrong");
    }
  } catch (error) {
    setError(error.message || "Network error");
  } finally {
    setLoading(false);
  }
 }


    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    id="first-name"
                                    placeholder="Max"
                                    name="first-name"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Robinson"
                                    name="last-name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                name="email"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" name="password" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input id="confirmPassword" type="password"
                            name="confirm-password"
                            required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
