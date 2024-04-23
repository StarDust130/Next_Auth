"use client";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setData(response.data.data._id);
      toast({
        title: "User details fetched successfully 😎",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error fetching user details 😳",
      });
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast({
        title: "Logged out successfully 😎",
      });
      router.push("/login");
    } catch (error) {
      console.log(error);

      toast({
        title: "Error logging out 😳",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-5 font-mono">
      <h1 className=" font-semibold text-4xl mb-10">Profile</h1>
      <hr />
      <button
        className="bg-green-500 rounded-lg py-2 px-2 hover:bg-green-700 font-bold"
        onClick={getUserDetails}
      >
        Get User Details
      </button>

      <h2>
        {data === "nothing" ? (
          "No data"
        ) : (
          <Link href={`/profile/${data}`}>
            {data}

            <hr />
          </Link>
        )}
      </h2>

      <button
        className="bg-red-500 rounded-lg py-2 px-2 hover:bg-red-700 font-bold"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};
export default Profile;
