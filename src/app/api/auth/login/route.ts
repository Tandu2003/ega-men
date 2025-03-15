import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { environments } from "@/utils/environment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return NextResponse.json(
      {
        message:
          "Email không tồn tại. Bạn hãy tạo tài khoản trước khi đăng nhập.",
      },
      { status: 400 },
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json(
      {
        message: "Mật khẩu không chính xác. Vui lòng thử lại.",
      },
      { status: 400 },
    );
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    environments.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  // Set cookie
  const response = NextResponse.json({
    message: "Đăng nhập thành công!",
    token,
    user,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: environments.NODE_ENV === "production",
  });
  return response;
}
