import { NextResponse } from "next/server";
import { DOMParser } from 'xmldom';

export async function PUT(request) {

  const body = await request.formData();

  const content = body.get('url');
  const mediaFile = body.get('mediaFile');
  
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const ytdl = require('ytdl-core');

  try {
    if (mediaFile !== "null") {
      const bytes = await mediaFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      buffer.path = 'filename.mp3';
      const response = await openai.createTranscription(
        buffer,
        "whisper-1"
      );
      const transcript = response.data.text;
      if (getValidAsciiLength(transcript) > 200) return NextResponse.json({error: "Media does not meet minimum word requirement"}, {"status": "400"});
      else return NextResponse.json({transcript: transcript});
    }
    
    else {
      try {
        await ytdl.getInfo(content);
      } catch {
        return NextResponse.json({error: "Invalid Youtube URL - please try again"}, {"status": "400"});
      }

      const info = await ytdl.getInfo(content);
      if (parseInt(info.player_response.microformat?.playerMicroformatRenderer.lengthSeconds) > 900) {
        return NextResponse.json({error: "Youtube video must be under 15 minutes"}, {"status": "400"});
      }

      const tracks = info.player_response.captions?.playerCaptionsTracklistRenderer?.captionTracks;
      if (tracks && tracks.length) {
        const track = tracks.find(t => t.languageCode === 'en');
        if (track) {
          const xmlFetch = await fetch(track.baseUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/xml',
              'Accept': 'application/xml'

            },
          });
          const xmlText = await xmlFetch.text();
          const parser = new DOMParser();
          const xml = parser.parseFromString(xmlText, 'text/xml');

          let output = '';
          const childNodes = xml.documentElement.getElementsByTagName('text');
          for (let i = 0; i < childNodes.length; i++) {
            const node = childNodes[i];
            output += node.textContent + ' ';
          }

          if (getValidAsciiLength(output) < 200) return NextResponse.error({error: "Media does not meet minimum word requirement"}, {"status": "400"});
          else return NextResponse.json({transcript: output}, {"status": "200"});
        
        } else {
          const transcript = await renderWithWhisper(content);
          if (getValidAsciiLength(transcript) < 200) return NextResponse.error({error: "Media does not meet minimum word requirement"}, {"status": "400"});
          else return NextResponse.json({transcript: transcript}, {"status": "200"});
        }

      } else {
        const transcript = await renderWithWhisper(content);
        if (getValidAsciiLength(transcript) < 200) return NextResponse.error({error: "Media does not meet minimum word requirement"}, {"status": "400"});
        else return NextResponse.json({transcript: transcript}, {"status": "200"});
      }
    }
  } catch {
    return NextResponse.json({error: "There was an issue with the transcription - please try again"}, {"status": "400"})
  }
}
 

async function renderWithWhisper(content) {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const ytdl = require('ytdl-core');  
  
  const video = ytdl(content, {filter: 'audioonly'});
  video.path = 'filename.mp3';
  const response = await openai.createTranscription(
    video,
    "whisper-1"
  );

  return response.data.text;
}

async function getValidAsciiLength(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) <= 127) {
      count++;
    }
  }
  return count;
}