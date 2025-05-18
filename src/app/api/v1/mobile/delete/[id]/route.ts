import { PrismaClient } from "@/generated/prisma";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const mobile = await prisma.mobile.delete({
    where: {
      id: id,
    },
  });
  if (!mobile) {
    return NextResponse.json(
      {
        message: "Mobile dose not exist",
      },
      {
        status: status.BAD_REQUEST,
      }
    );
  }
  return NextResponse.json(
    { message: "Mobile delete successfully!" },
    { status: status.OK }
  );
}
