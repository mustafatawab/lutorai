# Feature Spec: AI Color Grading Matcher

## 1. Overview

A web application that allows casual users to apply the color grading of a "reference" image to a "target" image using LLM analysis.

## 2. User Stories

- As a user, I can upload a reference image (source of style).
- As a user, I can upload a target image (image to be edited).
- As a user, I can click "Match Color" to process the images.
- As a user, I can view the result and compare it with the original.
- As a user, I can download the processed image.

## 3. Technical Approach (Draft)

- **Frontend**: Next.js 16 (React).
- **AI/LLM**: Use a Vision-capable LLM (e.g., Gemini 1.5 Flash/Pro) to analyze the reference image's color palette, mood, and lighting, and generate instructions or parameters for adjustment.
- **Image Processing**:
  - Option A: LLM generates CSS filters / SVG filters.
  - Option B: LLM generates a LUT (Look-Up Table).
  - Option C: LLM describes the change, and a secondary model or algorithmic approach applies it.
  - _Decision needed_: How exactly does the LLM "edit" the image?

## 4. Open Questions

- Is this a standalone app or part of a larger suite?
- What is the preferred method for image processing (Client-side vs Server-side)?
- Which LLM provider should we use?
