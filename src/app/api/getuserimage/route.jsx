import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const id = headersList.get("id");

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
    });
    return NextResponse.json({image_url: user.image_url}, {status: "200"});

  } catch {
    return NextResponse.json({status: "404"});
  }
  }
