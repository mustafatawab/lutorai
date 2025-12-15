"use client";

import { useState } from "react";


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
      // Placeholder logic for color grading - bypassing LLM
      // Generate some fixed or slightly randomized values
      const placeholderMatrix = [
        1.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 1.0, 0.0,
      ];

      // Slight randomization to show "some" effect
      const randomContrast = Math.floor(Math.random() * 20) + 90; // 90-110
      const randomSaturation = Math.floor(Math.random() * 20) + 90; // 90-110
      const randomBrightness = Math.floor(Math.random() * 20) + 90; // 90-110
      const randomSepia = Math.floor(Math.random() * 10); // 0-10

      // For simplicity, a generic description
      const placeholderDescription = "Color grade applied using placeholder logic (LLM disabled).";


      setState(prevState => ({
        ...prevState,
        outputImage: state.targetImage!.previewUrl,
        settings: {
          ...prevState.settings,
          contrast: randomContrast,
          saturation: randomSaturation,
          brightness: randomBrightness,
          sepia: randomSepia,
          exposure: prevState.settings.exposure,
          temperature: prevState.settings.temperature,
        },
        matrix: placeholderMatrix,
        description: placeholderDescription,
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
