import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";
const { Configuration, OpenAIApi } = require("openai");

export async function PUT(request) {
  const body = await request.json();
  const message = body.message;
  const context = body.context;
  const tone = body.tone;
  const id = body.id;

  try {
    const imageGenerationRes = await fetch(
      "http://localhost:3000/api/image-generation-prompt",
      {
        method: "POST",
        body: JSON.stringify({ message: message }),
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
            "Convert the following to a blog post. Please follow the instructions below:\n\n1. Choose one subject from the following options: Entertainment, Education, Gaming, Lifestyle, Technology, Music, Science, News, or Sports.\n\n2. Write a concise title for the blog post.\n\n3. Write the blog post, including distinctive headers before each text section. Avoid including terms such as 'subject', 'header', or 'title' within the headers. Remember to enclose each section, including the chosen topic, title, and headers, with double asterisks (*) for emphasis (e.g., **Example**).\n\nHere is the message:\n\n" +
            message +
            ` ${tone !== "null" ? "use this tone: " + tone : ""} ` +
            ` ${context !== "null" ? "Here is the context: " + context : ""}`,
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
      title = titl;
      e.slice(7);
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

    return NextResponse.json({ status: "204" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong - please try again" },
      { status: "400" }
    );
  }
}
