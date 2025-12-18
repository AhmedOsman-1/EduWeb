import Image from "next/image";
import Menu from "./account-menu";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { redirect } from "next/navigation";

const AccountSidebar = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await getUserByEmail(session.user.email);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="lg:w-1/4 md:px-3">
      <div className="p-6 rounded-md shadow bg-white">
        <div className="text-center mb-5">
          <Image
            src={user.profilePicture || "/avatar/user.png"}
            width={112}
            height={112}
            className="rounded-full mx-auto"
            alt={user.firstName}
          />
          <h5 className="mt-4 font-semibold">
            {user.firstName} {user.lastName}
          </h5>
          <p className="text-gray-400">{user.email}</p>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default AccountSidebar;
