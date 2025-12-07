# Quickstart: AI Color Grading

This guide provides instructions on how to set up and run the AI Color Grading application locally.

## Prerequisites

- Node.js (v20.x or later)
- pnpm (or npm/yarn)

## 1. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/mustafatawab/lutorai.git
cd lutorai
pnpm install
```

## 2. Environment Variables

Create a `.env.local` file in the root of the project and add your Google AI API key:

```
GOOGLE_API_KEY="YOUR_API_KEY"
```

You can obtain an API key from Google AI Studio.

## 3. Running the Application

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 4. How to Use

1.  **Upload a Reference Image**: This is the image with the style you want to copy.
2.  **Upload a Target Image**: This is the image you want to apply the style to.
3.  Click the **"Match Color"** button.
4.  The processed image will appear in the output area. You can then download the result.
