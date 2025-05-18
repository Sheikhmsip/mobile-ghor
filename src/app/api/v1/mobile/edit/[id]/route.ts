import { PrismaClient } from "@/generated/prisma";
import status from "http-status";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function PUT(req: NextResponse, {params}: {params: Promise<{id: string}>}) {
  const body = await req.json();
  const { id } = await params;
  const mobile = await prisma.mobile.update({
    where: {
        id: id,
    },
    data: body,
  });

  if(!mobile) {
    return NextResponse.json(
        {
            message: "Mobile dose not exist",
        },
        {
           status: status.BAD_REQUEST
        }
    );
  }
  return NextResponse.json(
    {
        message: `id: ${id} update successfully!`,
        data: mobile,
    },
    {status: status.OK}
  );
}
