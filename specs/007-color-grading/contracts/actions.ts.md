# Contracts: Core Actions

This file defines the TypeScript interfaces for the core actions in the application, which will likely be implemented in `src/app/actions.ts`.

```typescript
import { AppState, ImageFile } from "./data-model";

/**
 * Represents the response from an AI color grading operation.
 */
export interface ColorGradeResult {
  /** The processed image as a base64 data URL. */
  imageData: string;
  /** The generated Look-Up Table (LUT) in .CUBE format. */
  lutData: string;
}

/**
 * Analyzes the reference and target images and returns a color-graded result.
 * This function will encapsulate the interaction with the Gemini Vision model.
 *
 * @param referenceImage The user's source-style image.
 * @param targetImage The user's image to be color-graded.
 * @returns A promise that resolves to a ColorGradeResult.
 */
export async function performColorGrade(
  referenceImage: ImageFile,
  targetImage: ImageFile
): Promise<ColorGradeResult> {
  // 1. Prepare images for the AI model.
  // 2. Send images to Gemini with a prompt asking it to analyze the reference
  //    and generate a LUT or a description of adjustments.
  // 3. Process the AI's response.
  // 4. If a LUT is generated, apply it to the target image on a canvas.
  // 5. If adjustments are described, apply them to the target image.
  // 6. Return the new image data and the LUT.
}

/**
 * Applies a LUT to an image.
 *
 * @param image The image to apply the LUT to.
 * @param lut The LUT data in .CUBE format.
 * @returns The new image data as a base64 data URL.
 */
export function applyLut(image: ImageFile, lut: string): string {
  // Implementation will involve parsing the CUBE LUT and applying the color
  // transformation to each pixel of the image on an HTML5 canvas.
}
```
