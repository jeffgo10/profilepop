"use client";

type ResultPreviewProps = {
  imageUrl: string | null;
  themeName: string | null;
  loading: boolean;
  onDownload: () => void;
  onReset: () => void;
};

export function ResultPreview({
  imageUrl,
  themeName,
  loading,
  onDownload,
  onReset,
}: ResultPreviewProps) {
  if (loading) {
    return (
      <div className="result-panel is-loading" aria-live="polite">
        <div className="result-orb" aria-hidden />
        <p className="result-status">Popping your profile…</p>
        <p className="result-hint">Gemini is restyling your photo</p>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="result-panel is-empty">
        <p className="result-status">Your styled portrait lands here</p>
        <p className="result-hint">
          Pick a theme, upload a photo, then hit Pop it
        </p>
      </div>
    );
  }

  return (
    <div className="result-panel has-image">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt={`${themeName ?? "Styled"} profile result`} />
      <div className="result-actions">
        <button type="button" className="primary-btn" onClick={onDownload}>
          Download
        </button>
        <button type="button" className="ghost-btn" onClick={onReset}>
          Try another
        </button>
      </div>
    </div>
  );
}
