import { dbConnect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConnect();

export async function POST(request: NextRequest) {
  //extract data from token
  const userId = await getDataFromToken(request);

  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json(new Error("User not found 😿"), { status: 404 });
  }

  return NextResponse.json({
    message: "User found 🎉",
    data: user,
  });
}
