/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ai from 'ai';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request, { params }: { params: Promise<{ name: string }> }) {
  try {
    const { prompt } = await req.json();
    const { name } = await params;
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: `Answer the following query regarding popular cricket player, use plaintext and no markdown or special formatting: ${name}: ${prompt}`,
    });

    return Response.json({ text }, { status: 200 });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
