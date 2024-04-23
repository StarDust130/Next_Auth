"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verifiy, setVerify] = useState(false);
  const [error, setError] = useState(false);

  const VerifyUserEmail = async () => {
    try {
      await axios.post("/api/user/verifyemail", { token });
      setVerify(true);
      setError(false);
      toast({
        title: "Email verified Sucessfully 🥳",
      });
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
      toast({
        title: "Error while Verify Email 📧 🤒",
        description: "Please try Again",
      });
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];

    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false);

    if (token.length > 0) {
      VerifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-5 font-mono">
      <h1 className=" font-semibold text-4xl mb-10">Verify Email</h1>

      <h2>{token ? `${token} ` : "No Token Found"}</h2>

      {verifiy && (
        <div>
          <h2 className="text-2xl">You are Verify 🤤</h2>

          <Link
            className=" text-blue-500 font-bold hover:underline"
            href="/login"
          >
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl">Error 😰</h2>
        </div>
      )}
    </div>
  );
};
export default VerifyEmail;
