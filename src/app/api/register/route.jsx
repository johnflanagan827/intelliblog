import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();

    try {
        const { firstName, lastName, email, password } = body;
        const name = `${firstName} ${lastName}`;

        const lowercaseEmail = await email.toLowerCase();

        if (!name || !lowercaseEmail || !password) {
            return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
        }
        if (name.length > 100) {
            return NextResponse.json({ error: "Invalid Name" }, { status: 400 });
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(lowercaseEmail) || lowercaseEmail.length > 256) {
            return NextResponse.json({ error: "Invalid Email" }, { status: 400 });
        }

        if (password.length < 8 || password.length > 100) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
        }

        const exist = await prisma.user.findUnique({
            where: {
                email: lowercaseEmail,
            },
        });

        if (exist) {
            return NextResponse.json(
                { error: "Email Already Exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const image_url = "https://i.stack.imgur.com/34AD2.jpg";

        await prisma.user.create({
            data: {
                name: name,
                email: lowercaseEmail,
                hashedPassword: hashedPassword,
                image_url: image_url,
            },
        });

        return NextResponse.json(
            { body: "Successfully Registered!" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Something went wrong - please try again" },
            { status: 400 }
        );
    }
}
