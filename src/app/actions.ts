"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateColorGrade(referenceImageBase64: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });

  const prompt = `
    Analyze the color grading, lighting, and mood of this image.
    I want to replicate this look on another image using an SVG feColorMatrix and CSS filters.
    
    Return ONLY a valid JSON object with this structure:
    {
      "matrix": [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
      ],
      "contrast": 100, // percentage, e.g. 110 for 10% boost
      "saturation": 100, // percentage
      "brightness": 100, // percentage
      "sepia": 0, // percentage
      "description": "A brief description of the look found"
    }

    Adjust the matrix values to capture the dominant color tint (e.g. teal shadows, orange highlights).
    The matrix is 4x5 (R G B A Shift).
    Do not include markdown formatting.
  `;

  // Remove header if present (data:image/jpeg;base64,)
  const base64Data = referenceImageBase64.replace(
    /^data:image\/\w+;base64,/,
    ""
  );

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    // Clean up markdown code blocks if present
    // Extract JSON object using regex (finds matching {})
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error("Invalid response format:", text);
      throw new Error("Could not parse JSON from AI response");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error: unknown) {
    console.error("Error generating color grade:", error);
    // Propagate the actual error message for debugging
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    throw new Error(
      `Failed to generate color grade: ${errorMessage}`
    );
  }
}
