import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  const { firstName, lastName, phone, email, password } = await req.json();

  console.log("Đăng ký với:", {
    firstName,
    lastName,
    phone,
    email,
    password,
  });

  const userEmail = await User.findOne({
    email,
  });

  if (userEmail) {
    return NextResponse.json(
      {
        message:
          "Email đã tồn tại. Nếu bạn quên mật khẩu, bạn có thể thiết lập lại mật khẩu",
        resetLink: "/account/login#recover",
      },
      { status: 400 },
    );
  }

  const userPhone = await User.findOne({
    phone,
  });

  if (userPhone) {
    return NextResponse.json(
      {
        message:
          "Số điện thoại đã tồn tại. Nếu bạn quên mật khẩu, bạn có thể thiết lập lại mật khẩu",
        resetLink: "/account/login#recover",
      },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    firstName,
    lastName,
    phone,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return NextResponse.json({ message: "Đăng ký thành công!", user: newUser });
}
