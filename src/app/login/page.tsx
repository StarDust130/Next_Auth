"use client";

import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("RESPONSE", response.data);
      if (response.status === 200) {
        toast({
          title: "Login Success 🎉",
          description: "You have successfully signed up.",
        });
        router.push("/profile");
      }
    } catch (error: any) {
      toast({
        title: "Login Failed 🥲",
        description: "Please try again later.",
      });
      console.log("ERROR", error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-5 font-mono">
      <h1 className=" font-semibold text-4xl mb-10">
        {loading ? (
          <span>
            Processing...<span className="animate-pulse">🤩</span>
          </span>
        ) : (
          "Login 😄"
        )}
      </h1>
      <hr />

      <div className="flex justify-center ml-8 items-center gap-5">
        <label className="text-2xl font-mono" htmlFor="email">
          Email:{" "}
        </label>
        <input
          className="border border-gray-300 text-gray-500 rounded-lg p-2 w-full outline-none"
          id="email"
          placeholder="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="flex justify-center items-center gap-5">
        <label className="text-2xl font-mono" htmlFor="password">
          Password:{" "}
        </label>
        <input
          className="border border-gray-300 text-gray-500 rounded-lg p-2 w-full outline-none"
          id="username"
          placeholder="password"
          type="text"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <button
        onClick={onLogin}
        className={`bg-blue-500 rounded-lg py-2 px-2 hover:bg-blue-700 font-bold ${
          buttonDisabled && "cursor-not-allowed hover:bg-blue-500"
        } `}
      >
        {" "}
        Login
      </button>
      <span className="font-mono">
        Create Account{" "}
        <Link
          className=" text-blue-500 font-bold hover:underline"
          href="/signup"
        >
          Signup
        </Link>
      </span>
    </div>
  );
};
export default Login;
