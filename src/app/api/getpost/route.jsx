import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const hash = headersList.get("hash");
  const id = headersList.get("id");
  const name = headersList.get("author");

  try {
    const post = await prisma.post.findUnique({
      where: {
        hash: hash,
      },
    });

    post.name = name;

    if (post.userId !== id) {
      return NextResponse.json(
        { error: "Post not available for current user" },
        { status: "403" }
      );
    } else {
      post.status = "200";
      return NextResponse.json(post);
    }
  } catch {
    return NextResponse.json({ error: "Post not found" }, { status: "404" });
  }
}
