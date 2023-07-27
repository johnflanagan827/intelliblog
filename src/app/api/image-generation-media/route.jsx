import { NextResponse } from 'next/server'

export async function PUT(request) {
    const body = await request.json();
    const transcript = body.transcript;

    const engineId = 'stable-diffusion-v1-5'
    const apiHost ='https://api.stability.ai'
    const apiKey = process.env.STABILITY_API_KEY
      
    try {
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: `Generate an image that encapsulates the main subject of the following transcript:\n\n${transcript.substring(0, 1800)}`,
            },
          ],
          cfg_scale: 7,
          clip_guidance_preset: 'FAST_BLUE',
          height: 512,
          width: 768,
          samples: 1,
          steps: 30,
        }),
      }
    )

    const responseJSON = await response.json();
    const image_url = `data:image/png;base64,${responseJSON.artifacts[0].base64}`;

    return NextResponse.json({image_url: image_url}, {status: 200});
    } catch {
      return NextResponse.json({error: "Something went wrong - please try again"}, {status: 400});
    }

}
