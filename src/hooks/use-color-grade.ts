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
  lut: string | null;
  exposure: number;
  contrast: number;
  saturation: number;
  temperature: number;
}

// Based on data-model.md
export interface AppState {
  referenceImage: ImageFile | null;
  targetImage: ImageFile | null;
  outputImage: string | null;
  settings: ColorGradeSettings;
  isLoading: boolean;
  error: string | null;
}

const initialState: AppState = {
  referenceImage: null,
  targetImage: null,
  outputImage: null,
  settings: {
    lut: null,
    exposure: 0,
    contrast: 0,
    saturation: 0,
    temperature: 0,
  },
  isLoading: false,
  error: null,
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

    setState(prevState => ({ ...prevState, isLoading: true, error: null }));

    try {
      const result = await generateColorGrade(state.referenceImage, state.targetImage);
      setState(prevState => ({
        ...prevState,
        outputImage: result.imageData,
        settings: { ...prevState.settings, lut: result.lutData },
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
