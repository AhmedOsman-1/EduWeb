"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateContactInfo } from "@/app/actions/account";

const ContactInfo = ({ email, phone: initialPhone, socialMedia: initialSocialMedia }) => {
  const [phone, setPhone] = useState(initialPhone || "");
  const [socialMedia, setSocialMedia] = useState(initialSocialMedia || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("User not loaded yet");
      return;
    }

    try {
      await updateContactInfo(email, { phone, socialMedia });
      toast.success("Contact info updated!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update contact info");
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Phone No. :</Label>
            <Input
              name="phone"
              id="phone"
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block">Social Media :</Label>
            <Input
              name="socialMedia"
              id="socialMedia"
              type="url"
              placeholder="Social Media URL"
              value={socialMedia}
              onChange={(e) => setSocialMedia(e.target.value)}
            />
          </div>
        </div>
        <Button className="mt-5" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default ContactInfo;
