import React, { useRef } from 'react';
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names
import { Plus } from 'lucide-react';

interface ImageInputBoxProps {
  id: string;
  label: string;
  imagePreviewUrl: string | null;
  onImageSelect: (file: File) => void;
  className?: string;
  disabled?: boolean;
}

export function ImageInputBox({
  id,
  label,
  imagePreviewUrl,
  onImageSelect,
  className,
  disabled,
}: ImageInputBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-xs font-bold text-muted-foreground">
        {label}
      </label>
      <div
        className={cn(
          "relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-md border-2 border-dashed transition-colors",
          imagePreviewUrl
            ? "border-transparent" // No dashed border if image is present
            : "border-muted-foreground/50 hover:border-primary",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onClick={handleBoxClick}
      >
        {imagePreviewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-muted-foreground">
            <Plus className="h-6 w-6" />
            <span className="text-xs">{label.includes("REFERENCE") ? "Add Ref" : "Add Target"}</span>
          </div>
        )}
        <input
          id={id}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
