import { PrismaClient } from "@/generated/prisma";
import { registerSchema } from "@/lib/userSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = registerSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { name, email, password } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({
      message: "User registered",
      user: { id: user.id, email: user.email },
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
