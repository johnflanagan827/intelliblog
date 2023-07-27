import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";
const { Configuration, OpenAIApi } = require("openai");

export async function PUT(request) {
  const body = await request.formData();
  const id = body.get("id");

  try {
    const transcriptRes = await fetch(
      "http://localhost:3000/api/transcription",
      {
        method: "PUT",
        body: body,
      }
    );

    const data = await transcriptRes.json();
    if (data.error) return NextResponse.json({ error: data.error });

    const transcript = data.transcript;

    const imageGenerationRes = await fetch(
      "http://localhost:3000/api/image-generation-media",
      {
        method: "PUT",
        body: JSON.stringify({ transcript: transcript }),
      }
    );

    const imageData = await imageGenerationRes.json();
    const image_url = imageData.image_url;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content:
            "Here is an example of how the blog post should look:\n\n**Science**\n**Example Title**\n\n**Example Header**\nExample Text\n\n**Example Header**\nExample Text\n\n**Example Header**\nExample Text",
        },
        {
          role: "user",
          content:
            "Convert the following to a blog post. Please follow the instructions below:\n\n1. Choose one subject from the following options: Entertainment, Education, Gaming, Lifestyle, Technology, Music, Science, News, or Sports.\n\n2. Write a concise title for the blog post.\n\n3. Write the blog post, including distinctive headers before each text section. Avoid including terms such as 'subject', 'header', or 'title' within the headers. Remember to enclose each section, including the chosen topic, title, and headers, with double asterisks (*) for emphasis (e.g., **Example**).\n\nHere is the transcript:\n\n" +
            transcript,
        },
      ],
    });

    const response = completion.data.choices[0].message.content;

    const subjects = [
      "Entertainment",
      "Education",
      "Gaming",
      "Lifestyle",
      "Technology",
      "Music",
      "Science",
      "News",
      "Sports",
    ];
    let subject = response.split("**")[1];
    if (subject.includes("subject:")) {
      subject = subject.slice(9);
    }
    if (!subjects.includes(subject)) {
      return NextResponse.json(
        { error: "Something Went Wrong - Please Try Again" },
        { status: "400" }
      );
    }

    let title = response.split("**")[3];
    if (title.includes("title:")) {
      title = title.slice(7);
    }

    const content = response.split("**").slice(5);

    await prisma.post.create({
      data: {
        subject: subject,
        title: title,
        content: content,
        image_url: image_url,
        userId: id,
      },
    });

    return NextResponse.json({ status: "200" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong - please try again" },
      { status: "400" }
    );
  }
}
