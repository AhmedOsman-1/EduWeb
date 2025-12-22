"use client";

import Image from "next/image";
import { updateProfileImage } from "@/app/actions/account";

const ProfileImageUploader = ({
  email,
  profilePicture,
  firstName,
  lastName,
}) => {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;


    // Replace later with Cloudinary / S3
    const imageUrl = URL.createObjectURL(file);

    await updateProfileImage(email, imageUrl);
  };

  return (
    <div className="relative size-28 mx-auto">
      <Image
        src={profilePicture || "/avatar/user.png"}
        width={112}
        height={112}
        alt={`${firstName} ${lastName}`}
        className="rounded-full ring-4 ring-slate-100"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default ProfileImageUploader;
