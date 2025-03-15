import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = NextResponse.json({ message: "Đăng xuất thành công!" });
  response.cookies.set("token", "", { maxAge: -1 });
  return response;
}
