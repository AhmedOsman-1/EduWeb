"use client";
import { changePassword } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ChangePassword = ({ email }) => {
    const [passwordState, setPasswordState] = useState({
        oldPassword: "",
        newPassword: "",
        retypeNewPassword: "",
    });

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setPasswordState({
            ...passwordState,
            [key]: value,
        });
    };

    async function doPasswordChange(e) {
        e.preventDefault();
        console.log(passwordState);

        try {
            await changePassword(email, passwordState?.oldPassword, passwordState?.newPassword);

            toast.success("Password changed successfully");
        } catch (err) {
            console.log(err);
            toast.error(`Error: ${err.message}`);
        }
    }

    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">Change password :</h5>
            <form onSubmit={doPasswordChange}>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block">Old password :</Label>
                        <Input
                            name="oldPassword"
                            id="oldPassword"
                            type="password"
                            placeholder="Old password"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">New password :</Label>
                        <Input
                            name="newPassword"
                            id="newPassword"
                            type="password"
                            placeholder="New password"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">Re-type New password :</Label>
                        <Input
                            name="retypeNewPassword"
                            type="password"
                            placeholder="Re-type New password"
                            required
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <Button className="mt-5 cursor-pointer" type="submit">
                    Save password
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;
