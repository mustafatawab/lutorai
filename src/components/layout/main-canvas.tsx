import { ScanLine, ArrowRight } from "lucide-react";
import { useColorGrade } from "@/hooks/use-color-grade";
import { Button } from "@/components/ui/button";
import { ImageInputBox } from "@/components/ImageInputBox";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'; // Add this

export function MainCanvas() {
  const {
    referenceImage,
    targetImage,
    isLoading,
    outputImage,
    settings,
    matrix,
    description,
    setReferenceImage,
    setTargetImage,
    generate,
  } = useColorGrade();

  const matrixString = matrix ? matrix.join(" ") : "";

  // The CSS filter style for the output image
  const outputFilterStyle = matrix
    ? {
        filter: `url(#ai-color-grade) contrast(${settings.contrast}%) saturate(${settings.saturation}%) brightness(${settings.brightness}%) sepia(${settings.sepia}%)`,
      }
    : {};

  return (
    <div className="flex flex-1 flex-col gap-4 bg-black/40 dark:bg-black/60 p-6 overflow-y-auto">
      {/* Controls Area */}
      <div className="flex flex-wrap gap-4 p-4 bg-card/30 dark:bg-card/60 rounded-lg border border-border/20 dark:border-border/10">
        {/* Reference Image Input */}
        <ImageInputBox
          id="ref-upload"
          label="REFERENCE IMAGE"
          imagePreviewUrl={referenceImage ? referenceImage.previewUrl : null}
          onImageSelect={setReferenceImage}
          disabled={isLoading}
        />
        {/* Target Image Input */}
        <ImageInputBox
          id="target-upload"
          label="TARGET IMAGE"
          imagePreviewUrl={targetImage ? targetImage.previewUrl : null}
          onImageSelect={setTargetImage}
          disabled={isLoading}
        />
        <div className="flex items-end">
          <Button
            onClick={generate}
            disabled={!referenceImage || !targetImage || isLoading}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {isLoading ? "Analyzing..." : "Match Color"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Before & After Comparison Widget */}
      <div className="flex flex-1 gap-4 min-h-[400px] border border-border/20 dark:border-border/10 rounded-lg overflow-hidden">
        {referenceImage && targetImage ? (
          <div className="relative w-full h-full">
            {/* SVG Filter Definition - always render if matrix exists */}
            {matrix && (
              <svg className="absolute w-0 h-0">
                <filter id="ai-color-grade">
                  <feColorMatrix type="matrix" values={matrixString} />
                </filter>
              </svg>
            )}
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={targetImage.previewUrl} alt="Original Target" />}
              itemTwo={<ReactCompareSliderImage src={outputImage || ''} alt="AI Graded" style={outputFilterStyle} />}
              portrait={false} // Adjust as needed for vertical slider
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-black/20 dark:bg-black/40 text-muted-foreground">
            <ScanLine className="h-10 w-10 opacity-50 mb-4" />
            <p className="text-lg">Upload images to get started</p>
          </div>
        )}
      </div>


      {description && (
        <div className="p-4 bg-green-900/20 dark:bg-green-500/10 border border-green-900/50 dark:border-green-500/20 rounded text-green-200 dark:text-green-300 text-sm">
          <strong>AI Analysis:</strong> {description}
        </div>
      )}
    </div>
  );
}
