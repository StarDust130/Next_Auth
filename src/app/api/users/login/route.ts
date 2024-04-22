import { dbConnect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {
  const router = useRouter();
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // validation if we want

    console.log(reqBody + " reqBody");

    const user = await User.findOne({ email });

    if (!user) {
      router.push("/signup");
      alert("User does not Exist 🤯");
      return NextResponse.json(
        { error: "User does not Exist 🤯" },
        { status: 400 }
      );
    }
    console.log(user + " user Exists");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid Password 🤯" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Logged In Successfully 🤩👍" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
