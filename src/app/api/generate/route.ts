import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { getThemeById } from "@/lib/themes";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY. Add it to your .env.local file." },
      { status: 500 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const themeId = String(formData.get("themeId") ?? "");
  const theme = getThemeById(themeId);
  if (!theme) {
    return NextResponse.json({ error: "Unknown theme selected." }, { status: 400 });
  }

  const file = formData.get("image");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Please upload a profile image." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Use a JPG, PNG, or WebP image." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image must be 8MB or smaller." },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_IMAGE_MODEL ?? "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts: [
            { text: theme.prompt },
            {
              inlineData: {
                mimeType: file.type,
                data: base64,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        const mimeType = part.inlineData.mimeType || "image/png";
        return NextResponse.json({
          image: `data:${mimeType};base64,${part.inlineData.data}`,
          themeId: theme.id,
          themeName: theme.name,
        });
      }
    }

    const text = parts
      .map((part) => part.text)
      .filter(Boolean)
      .join(" ")
      .trim();

    return NextResponse.json(
      {
        error:
          text ||
          "Gemini returned no image. Try another photo or theme.",
      },
      { status: 502 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate image.";
    console.error("Gemini generate error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
