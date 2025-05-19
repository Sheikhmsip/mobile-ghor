import { Prisma, PrismaClient } from "@/generated/prisma";
import status from "http-status";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();
export async function GET(req: NextResponse) {
  const { searchParams } = new URL(req.url);

  // pagination
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const skip = limit * (page - 1);

  // Sorting
  const sortBy = searchParams.get("sort-by") || "createdAt";
  const sortOrder = searchParams.get("sort-order") || "desc";

  // searching and filteing
  const search = searchParams.get("search");

  const filter: Prisma.MobileWhereInput = {};
  if (search) {
    filter.OR = ["modelName", "description", "ram", "rom"].map((field) => ({
      [field]: {
        contains: search,
        mode: "insensitive",
      },
    }));
  };

  // Total count 
  const count = await prisma.mobile.count({
    where: filter
  });
  const mobiles = await prisma.mobile.findMany({
    where: filter,
    take: limit,
    skip: skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return NextResponse.json(
    {
      message: "Mobile data get successfully",
      count: count,
      page: page,
      limit: limit,
      data: mobiles,
    },
    {
      status: status.OK,
    }
  );
}
