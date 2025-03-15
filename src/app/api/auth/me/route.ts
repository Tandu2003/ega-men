import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  await connectDB();
  const token =
    req.cookies.get("token")?.value || req.headers.get("authorization");

  if (!token) {
    return NextResponse.json(
      { message: "Token không hợp lệ!" },
      { status: 400 },
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById((decoded as any).userId);

    if (!user) {
      return NextResponse.json(
        { message: "Người dùng không tồn tại!" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      user: {
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Token không hợp lệ!" },
      { status: 400 },
    );
  }
}
