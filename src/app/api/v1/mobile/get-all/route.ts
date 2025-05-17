import { PrismaClient } from "@/generated/prisma";
import status from "http-status";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET() {
  const mobiles = await prisma.mobile.findMany();

  return NextResponse.json(
    {
    message: "Mobile data get successfully",
    data: mobiles,
  },
  {
    status: status.OK
  }
);
}
