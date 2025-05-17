import { PrismaClient } from "@/generated/prisma";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  
  const body = await req.json();

  const mobile = await prisma.mobile.create({
    data: {
      modelName: body.modelName,
      brand: body.brand,
      rom: body.rom,
      ram: body.ram,
      battery: body.battery,
      display: body.display,
      description: body.description,
    },
  });
  return NextResponse.json(
    {
      message: "Mobile added successfully!",
      data: mobile,
    },
    {
      status: status.CREATED,
    }
  );
}
