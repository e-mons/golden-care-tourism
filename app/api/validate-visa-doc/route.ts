import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini SDK
// Note: Requires GEMINI_API_KEY in .env.local
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { documentId, fileUrl } = await req.json();

    if (!documentId || !fileUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Skipping real validation.');
      return NextResponse.json({ success: true, message: 'Skipped (No API Key)' });
    }

    // 1. Fetch the image buffer
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');
    const mimeType = response.headers.get('content-type') || 'image/jpeg';

    // 2. Validate using Gemini Vision
    const prompt = `You are an expert immigration document validator for the UAE.
    Please examine this document.
    1. Is it a valid passport?
    2. Does it appear legible and free of major glare/obstruction?
    3. Extract the Nationality and Expiry Date if possible.
    Respond in JSON format only with the following keys:
    { "isValidPassport": boolean, "isLegible": boolean, "extractedNationality": string | null, "extractedExpiry": string | null, "feedback": string }`;

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType,
                data: base64Data,
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = result.text;
    const validationResult = JSON.parse(text || '{}');

    const supabase = await createClient();

    // 3. Update the database
    const newStatus = validationResult.isValidPassport && validationResult.isLegible ? 'validated' : 'rejected';
    
    await supabase.from('visa_documents').update({
      validation_status: newStatus,
      ai_feedback: validationResult.feedback || 'Validation complete.',
      metadata: { extracted: validationResult }
    }).eq('application_id', documentId);

    return NextResponse.json({ success: true, validationResult });

  } catch (error) {
    console.error('Gemini Validation Error:', error);
    return NextResponse.json({ error: 'Validation failed' }, { status: 500 });
  }
}
