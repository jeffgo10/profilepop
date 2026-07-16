"use client";

import { useRef } from "react";

type ImageUploadProps = {
  previewUrl: string | null;
  fileName: string | null;
  onFile: (file: File) => void;
  onClear: () => void;
};

export function ImageUpload({
  previewUrl,
  fileName,
  onFile,
  onClear,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    onFile(file);
  }

  return (
    <div className="upload-panel">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(event) => handleFiles(event.target.files)}
      />

      {previewUrl ? (
        <div className="upload-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Uploaded profile preview" />
          <div className="upload-preview-meta">
            <p>{fileName}</p>
            <div className="upload-actions">
              <button
                type="button"
                className="ghost-btn"
                onClick={() => inputRef.current?.click()}
              >
                Replace
              </button>
              <button type="button" className="ghost-btn" onClick={onClear}>
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="upload-dropzone"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            handleFiles(event.dataTransfer.files);
          }}
        >
          <span className="upload-icon" aria-hidden />
          <span className="upload-title">Drop your profile photo</span>
          <span className="upload-hint">JPG, PNG, or WebP · up to 8MB</span>
        </button>
      )}
    </div>
  );
}
