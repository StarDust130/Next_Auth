import { dbConnect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // validation if we want

    console.log(reqBody + " reqBody");

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists 😁" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const SavedUser = await newUser.save();
    console.log(SavedUser + " savedUser");

    //send Verification email
    await sendEmail({ email, emailType: "VERIFIY", userId: SavedUser._id , username});

    return NextResponse.json({
      message: "User register successfully 🥳✅",
      success: true,
      SavedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
