import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request) {
    const body = await request.json();
    try {
        const { id, previousPassword, newPassword } = body;
        const userHashedPassword = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });


        const passwordsMatch = await bcrypt.compare(
            previousPassword,
            userHashedPassword.hashedPassword
        );
        
        if (!passwordsMatch) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: "400" }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updateUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                hashedPassword: hashedPassword,
            },
        });

        return NextResponse.json({ status: "204" });
    } catch {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: "400" }
        );
    }
}
