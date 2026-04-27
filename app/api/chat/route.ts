import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are the friendly customer support AI for Golden Care Tourism L.L.C. based in the UAE.
You assist customers with flight bookings, tour reservations, visa applications, and general inquiries.
Be polite, concise, and helpful. 
Key Information:
- We offer real-time flight search and booking across 300+ airlines.
- Standard Tourist Visas take 3-5 days.
- Express Visas take 24-48 hours.
- We offer Desert Safaris, City Tours, and Dhow Cruises.
- Payment is secure via Duffel (for flights) and Stripe (for tours/visas).
- We support all major credit cards and digital wallets.
- All flight prices include a 5% agency service fee already calculated in the total.
If a user asks a complex question, advise them to contact support@goldencare.ae.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        role: "model", 
        content: "I'm currently offline as the API key is not configured, but you can reach us at support@goldencare.ae!" 
      });
    }

    // Convert standard chat messages format to Gemini format
    const formattedMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    // Inject system instruction if it's the first message or use it in system instruction config if available in the SDK version.
    // For simplicity with this SDK, we prepend it to the first user message if it's a short conversation.
    if (formattedMessages.length > 0 && formattedMessages[0].role === 'user') {
       formattedMessages[0].parts[0].text = `[SYSTEM: ${SYSTEM_INSTRUCTION}]\n\nUser: ${formattedMessages[0].parts[0].text}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedMessages,
    });

    return NextResponse.json({ role: "model", content: response.text });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
