import { dbConnect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token + " token");

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token is invalid or has expired 🤯" },
        { status: 400 }
      );
    }
    console.log(user + " user");

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Email verified successfully 🎉",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error while verify email 😥" },
      { status: 500 }
    );
  }
}
