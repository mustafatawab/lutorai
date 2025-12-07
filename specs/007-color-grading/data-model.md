# Data Models: AI Color Grading

**Input**: `spec.md`

This document defines the primary data structures for the AI Color Grading feature. Given the client-side nature of the MVP, these are not database models but rather in-memory data structures.

## 1. ImageFile

Represents an image uploaded by the user.

- **`id`**: `string` - A unique identifier (e.g., generated using `crypto.randomUUID()`).
- **`file`**: `File` - The raw file object from the browser's File API.
- **`previewUrl`**: `string` - A URL generated via `URL.createObjectURL(file)` for rendering a preview.
- **`width`**: `number` - The image's width.
- **`height`**: `number` - The image's height.

## 2. ColorGradeSettings

Represents the parameters that control the color grading process.

- **`lut`**: `string | null` - The generated Look-Up Table (in a string format like CUBE) or null if not yet generated.
- **`exposure`**: `number` - Range: -1.0 to 1.0. Default: 0.
- **`contrast`**: `number` - Range: -1.0 to 1.0. Default: 0.
- **`saturation`**: `number` - Range: -1.0 to 1.0. Default: 0.
- **`temperature`**: `number` - Range: -1.0 to 1.0. Default: 0.

## 3. AppState

Represents the overall state of the application at any given time.

- **`referenceImage`**: `ImageFile | null` - The user's uploaded reference image.
- **`targetImage`**: `ImageFile | null` - The user's uploaded target image.
- **`outputImage`**: `string | null` - The data URL of the processed image.
- **`settings`**: `ColorGradeSettings` - The current grading settings.
- **`isLoading`**: `boolean` - `true` when the AI is processing an image.
- **`error`**: `string | null` - Any error messages to display to the user.
