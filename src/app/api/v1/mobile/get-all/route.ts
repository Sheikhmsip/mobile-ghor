import { PrismaClient } from "@/generated/prisma";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // pagination
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const skip = limit * (page - 1);

  const mobiles = await prisma.mobile.findMany({
    take: limit,
    skip: skip,
  });

  return NextResponse.json(
    {
      message: "Mobile data get successfully",
      page: page,
      limit: limit,
      data: mobiles,
    },
    {
      status: status.OK,
    }
  );
}
