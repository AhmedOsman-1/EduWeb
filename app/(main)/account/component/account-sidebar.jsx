import Image from "next/image";
import Menu from "./account-menu";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/queries/users";
import ProfileImageUploader from "./profile-image-uploader";

const AccountSidebar = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(session.user.email);

  if (!loggedInUser) {
    redirect("/login");
  }

  return (
    <div className="lg:w-1/4 md:px-3">
      <div className="p-6 rounded-md shadow bg-white">
        <div className="text-center mb-5">
        
          <ProfileImageUploader
            email={loggedInUser.email}
            profilePicture={loggedInUser.profilePicture}
            firstName={loggedInUser.firstName}
            lastName={loggedInUser.lastName}
          />

          <h5 className="mt-4 font-semibold">
            {loggedInUser.firstName} {loggedInUser.lastName}
          </h5>
          <p className="text-gray-400">{loggedInUser.email}</p>
        </div>

        <Menu />
      </div>
    </div>
  );
};

export default AccountSidebar;
