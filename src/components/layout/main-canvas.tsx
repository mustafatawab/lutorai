"use client";

import { ScanLine, ArrowRight } from "lucide-react";
import { useColorGrade } from "@/hooks/use-color-grade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MainCanvas() {
  const {
    referenceImage,
    targetImage,
    isLoading,
    outputImage,
    settings,
    matrix,
    description,
    setReferenceImage, // Added
    setTargetImage,   // Added
    generate,
  } = useColorGrade();

  // matrixString will now come from the state's matrix
  const matrixString = matrix ? matrix.join(" ") : "";

  return (
    <div className="flex flex-1 flex-col gap-4 bg-black/40 dark:bg-black/60 p-6 overflow-y-auto">
      {/* Controls Area */}
      <div className="flex flex-wrap gap-4 p-4 bg-card/30 dark:bg-card/60 rounded-lg border border-border/20 dark:border-border/10">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="ref-upload"
            className="text-xs font-bold text-muted-foreground"
          >
            REFERENCE IMAGE
          </Label>
          <Input
            id="ref-upload"
            type="file"
            accept="image/*"
            className="w-64"
            onChange={(e) =>
              e.target.files?.[0] &&
              setReferenceImage(e.target.files[0]) // Changed
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="target-upload"
            className="text-xs font-bold text-muted-foreground"
          >
            TARGET IMAGE
          </Label>
          <Input
            id="target-upload"
            type="file"
            accept="image/*"
            className="w-64"
            onChange={(e) =>
              e.target.files?.[0] &&
              setTargetImage(e.target.files[0]) // Changed
            }
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={generate} // Changed from generateLook
            disabled={!referenceImage || isLoading}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {isLoading ? "Analyzing..." : "Match Color"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex flex-1 gap-4 min-h-[400px]">
        {/* Reference View */}
        <div className="flex-1 relative rounded-lg border border-border/20 dark:border-border/10 bg-black/20 dark:bg-black/40 overflow-hidden">
          {referenceImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={referenceImage.previewUrl} // Use previewUrl
              alt="Reference"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <ScanLine className="h-8 w-8 opacity-50 mb-4" />
              <p className="text-sm">Upload Reference</p>
            </div>
          )}
          <div className="absolute top-2 left-2 bg-black/60 dark:bg-black/80 px-2 py-1 rounded text-xs text-white dark:text-white">
            Reference
          </div>
        </div>

        {/* Target View */}
        <div className="flex-1 relative rounded-lg border border-border/20 dark:border-border/10 bg-black/20 dark:bg-black/40 overflow-hidden">
          {targetImage ? (
            <div className="relative w-full h-full">
              {/* SVG Filter Definition */}
              {matrix && ( // Use matrix here
                <svg className="absolute w-0 h-0">
                  <filter id="ai-color-grade">
                    <feColorMatrix type="matrix" values={matrixString} />
                  </filter>
                </svg>
              )}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={outputImage || targetImage.previewUrl} // Use outputImage (which is targetImage.previewUrl)
                alt="Target"
                className="w-full h-full object-contain transition-all duration-500"
                style={
                  matrix // Apply filter if matrix exists
                    ? {
                        filter: `url(#ai-color-grade) contrast(${settings.contrast}%) saturate(${settings.saturation}%) brightness(${settings.brightness}%) sepia(${settings.sepia}%)`,
                      }
                    : {}
                }
              />
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <ScanLine className="h-8 w-8 opacity-50 mb-4" />
              <p className="text-sm">Upload Target</p>
            </div>
          )}
          <div className="absolute top-2 left-2 bg-black/60 dark:bg-black/80 px-2 py-1 rounded text-xs text-white dark:text-white">
            {matrix ? "AI Graded" : "Original Target"} {/* Use matrix to check if graded */}
          </div>
        </div>
      </div>

      {description && ( // Use description here
        <div className="p-4 bg-green-900/20 dark:bg-green-500/10 border border-green-900/50 dark:border-green-500/20 rounded text-green-200 dark:text-green-300 text-sm">
          <strong>AI Analysis:</strong> {description}
        </div>
      )}
    </div>
  );
}
