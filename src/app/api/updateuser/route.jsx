import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const body = await request.formData();
        const id = await body.get("id");
        const image = await body.get("image");
        const name = await body.get("name");
        const password = await body.get("password");
        const userHashedPassword = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        
        const passwordsMatch = await bcrypt.compare(password, userHashedPassword.hashedPassword);

        if (!passwordsMatch) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: "400" }
            );
        }

        const data = { name: name };

        if (image !== "null") {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const b64 = Buffer.from(buffer).toString("base64");
            const mimeType = await body.get("type");
            const image_url = `data:${mimeType};base64,${b64}`;
            data.image_url = image_url;
        }

        const updateUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: data,
        });

        return NextResponse.json({ status: "204" });
    } catch {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: "400" }
        );
    }
}
