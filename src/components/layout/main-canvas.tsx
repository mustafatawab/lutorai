"use client";

import { ScanLine, Upload, ArrowRight } from "lucide-react";
import { useColorGrade } from "@/hooks/use-color-grade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MainCanvas() {
  const {
    referenceImage,
    targetImage,
    isGenerating,
    result,
    handleImageUpload,
    generateLook,
  } = useColorGrade();

  const matrixString = result ? result.matrix.join(" ") : "";

  return (
    <div className="flex flex-1 flex-col gap-4 bg-black/40 p-6 overflow-y-auto">
      {/* Controls Area */}
      <div className="flex flex-wrap gap-4 p-4 bg-card/30 rounded-lg border border-border/20">
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
              handleImageUpload(e.target.files[0], "reference")
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
              handleImageUpload(e.target.files[0], "target")
            }
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={generateLook}
            disabled={!referenceImage || isGenerating}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            {isGenerating ? "Analyzing..." : "Match Color"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex flex-1 gap-4 min-h-[400px]">
        {/* Reference View */}
        <div className="flex-1 relative rounded-lg border border-border/20 bg-black/20 overflow-hidden">
          {referenceImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={referenceImage}
              alt="Reference"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <ScanLine className="h-8 w-8 opacity-50 mb-4" />
              <p className="text-sm">Upload Reference</p>
            </div>
          )}
          <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white">
            Reference
          </div>
        </div>

        {/* Target View */}
        <div className="flex-1 relative rounded-lg border border-border/20 bg-black/20 overflow-hidden">
          {targetImage ? (
            <div className="relative w-full h-full">
              {/* SVG Filter Definition */}
              {result && (
                <svg className="absolute w-0 h-0">
                  <filter id="ai-color-grade">
                    <feColorMatrix type="matrix" values={matrixString} />
                  </filter>
                </svg>
              )}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={targetImage}
                alt="Target"
                className="w-full h-full object-contain transition-all duration-500"
                style={
                  result
                    ? {
                        filter: `url(#ai-color-grade) contrast(${result.contrast}%) saturate(${result.saturation}%) brightness(${result.brightness}%) sepia(${result.sepia}%)`,
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
          <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white">
            {result ? "AI Graded" : "Original Target"}
          </div>
        </div>
      </div>

      {result && (
        <div className="p-4 bg-green-900/20 border border-green-900/50 rounded text-green-200 text-sm">
          <strong>AI Analysis:</strong> {result.description}
        </div>
      )}
    </div>
  );
}
