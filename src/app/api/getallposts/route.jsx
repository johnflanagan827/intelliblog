import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const id = headersList.get("id");

  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: id,
      },
    });

    if (posts) {
      return NextResponse.json(posts, { status: "200" });
    } else {
      return NextResponse.json({ error: "Not Found" }, { status: "400" });
    }
  } catch {
    return NextResponse.json(
      { error: "Something went wrong - please try again" },
      { status: "400" }
    );
  }
}
