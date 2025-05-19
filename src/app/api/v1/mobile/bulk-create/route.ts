import { NextRequest, NextResponse } from "next/server";
import status from "http-status";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const mobile = await prisma.mobile.createMany({
    data: body,
  });

  return NextResponse.json(
    {
      message: "Mobile created successfully!",
      data: mobile,
    },
    {
      status: status.CREATED,
    }
  );
}