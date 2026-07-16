"use client";

import { useEffect, useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { ResultPreview } from "@/components/ResultPreview";
import { ThemePicker } from "@/components/ThemePicker";
import type { Theme } from "@/lib/themes";

type GenerateResponse = {
  image?: string;
  themeName?: string;
  error?: string;
};

export function Studio() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultTheme, setResultTheme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFile(next: File) {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(next);
    setPreviewUrl(URL.createObjectURL(next));
    setResultUrl(null);
    setResultTheme(null);
    setError(null);
  }

  function clearFile() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setResultUrl(null);
    setResultTheme(null);
    setError(null);
  }

  async function handleGenerate() {
    if (!theme || !file) {
      setError("Choose a theme and upload a photo first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResultUrl(null);
    setResultTheme(null);

    const body = new FormData();
    body.append("themeId", theme.id);
    body.append("image", file);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body,
      });
      const data = (await response.json()) as GenerateResponse;

      if (!response.ok || !data.image) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResultUrl(data.image);
      setResultTheme(data.themeName ?? theme.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!resultUrl) return;
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `profilepop-${theme?.id ?? "styled"}.png`;
    link.click();
  }

  function handleReset() {
    setResultUrl(null);
    setResultTheme(null);
    setError(null);
  }

  const canGenerate = Boolean(theme && file && !loading);

  return (
    <section className="studio" id="studio">
      <div className="studio-steps">
        <div className="step">
          <div className="step-header">
            <span className="step-num">01</span>
            <h2>Choose a style</h2>
          </div>
          <ThemePicker
            selectedId={theme?.id ?? null}
            onSelect={(next) => {
              setTheme(next);
              setError(null);
            }}
          />
        </div>

        <div className="step">
          <div className="step-header">
            <span className="step-num">02</span>
            <h2>Upload your photo</h2>
          </div>
          <ImageUpload
            previewUrl={previewUrl}
            fileName={file?.name ?? null}
            onFile={handleFile}
            onClear={clearFile}
          />
        </div>

        <div className="step step-action">
          <div className="step-header">
            <span className="step-num">03</span>
            <h2>Pop it</h2>
          </div>
          <button
            type="button"
            className="primary-btn generate-btn"
            disabled={!canGenerate}
            onClick={handleGenerate}
          >
            {loading ? "Generating…" : "Pop it"}
          </button>
          {error ? <p className="error-text">{error}</p> : null}
          {theme ? (
            <p className="selection-hint">
              Style: <strong>{theme.name}</strong>
              {file ? ` · ${file.name}` : ""}
            </p>
          ) : (
            <p className="selection-hint">Select a theme to continue</p>
          )}
        </div>
      </div>

      <aside className="studio-result">
        <div className="step-header">
          <span className="step-num">Out</span>
          <h2>Result</h2>
        </div>
        <ResultPreview
          imageUrl={resultUrl}
          themeName={resultTheme}
          loading={loading}
          onDownload={handleDownload}
          onReset={handleReset}
        />
      </aside>
    </section>
  );
}
