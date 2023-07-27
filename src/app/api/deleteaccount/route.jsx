import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function DELETE() {
    try {
    const headersList = headers();
    const id = headersList.get("id");

    const deletePosts = await prisma.post.deleteMany({
        where: {
            userId: id
        },
    });

    const accountCount = await prisma.account.count({
        where: {
            userId: id
        },
    });

    if (accountCount) {
        const deleteAccount = await prisma.account.delete({
            where: {
            userId: id
            },
        });
    }
    
      const deleteUser = await prisma.user.delete({
        where: {
            id: id
        },
      });
    
    return NextResponse.json({status: "200"});
    } catch {
        return NextResponse.json({error: "Something went wrong - please try again"}, {status: "400"});

    }
}