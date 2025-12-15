"use client";

import { useState } from "react";
import { generateColorGrade } from "@/app/actions";

// Based on data-model.md
export interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

// Based on data-model.md
export interface ColorGradeSettings {
  exposure: number;
  contrast: number;
  saturation: number;
  temperature: number;
  brightness: number; // Added
  sepia: number;     // Added
}

// Based on data-model.md
export interface AppState {
  referenceImage: ImageFile | null;
  targetImage: ImageFile | null;
  outputImage: string | null;
  settings: ColorGradeSettings;
  isLoading: boolean;
  error: string | null;
  matrix: number[] | null;
  description: string | null;
}

const initialState: AppState = {
  referenceImage: null,
  targetImage: null,
  outputImage: null,
  settings: {
    exposure: 0,
    contrast: 100,
    saturation: 100,
    temperature: 0,
    brightness: 100, // Added
    sepia: 0,        // Added
  },
  isLoading: false,
  error: null,
  matrix: null,
  description: null,
};

export function useColorGrade() {
  const [state, setState] = useState<AppState>(initialState);

  const setReferenceImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setState(prevState => ({
          ...prevState,
          referenceImage: {
            id: crypto.randomUUID(),
            file,
            previewUrl: e.target?.result as string,
            width: img.width,
            height: img.height,
          }
        }));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const setTargetImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setState(prevState => ({
          ...prevState,
          targetImage: {
            id: crypto.randomUUID(),
            file,
            previewUrl: e.target?.result as string,
            width: img.width,
            height: img.height,
          }
        }));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const generate = async () => {
    if (!state.referenceImage || !state.targetImage) {
      setState(prevState => ({ ...prevState, error: "Please upload both reference and target images." }));
      return;
    }

    setState(prevState => ({ ...prevState, isLoading: true, error: null, outputImage: null }));

    try {
      const aiResult = await generateColorGrade(state.referenceImage.previewUrl);

      setState(prevState => ({
        ...prevState,
        outputImage: state.targetImage!.previewUrl,
        settings: {
          ...prevState.settings,
          contrast: aiResult.contrast,
          saturation: aiResult.saturation,
          brightness: aiResult.brightness, // Added
          sepia: aiResult.sepia,           // Added
          exposure: prevState.settings.exposure,
          temperature: prevState.settings.temperature,
        },
        matrix: aiResult.matrix,
        description: aiResult.description,
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setState(prevState => ({ ...prevState, error: `Failed to generate look: ${errorMessage}`, isLoading: false }));
      console.error(err);
    }
  };

  return {
    ...state,
    setReferenceImage,
    setTargetImage,
    generate,
  };
}
