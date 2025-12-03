"use client";

import { useState } from "react";
import { generateColorGrade } from "@/app/actions";

export interface ColorGradeResult {
  matrix: number[];
  contrast: number;
  saturation: number;
  brightness: number;
  sepia: number;
  description: string;
}

export function useColorGrade() {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<ColorGradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File, type: "reference" | "target") => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === "reference") {
        setReferenceImage(e.target?.result as string);
      } else {
        setTargetImage(e.target?.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const generateLook = async () => {
    if (!referenceImage) {
      setError("Please upload a reference image first");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const data = await generateColorGrade(referenceImage);
      setResult(data);
    } catch (err) {
      setError("Failed to generate look. Check API Key.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    referenceImage,
    targetImage,
    isGenerating,
    result,
    error,
    handleImageUpload,
    generateLook,
  };
}
