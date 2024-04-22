import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      return { error: "No token found" };
    }
    const decodeToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodeToken.id;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};
