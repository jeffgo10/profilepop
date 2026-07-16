"use client";

import type { CSSProperties } from "react";
import { themes, type Theme } from "@/lib/themes";

type ThemePickerProps = {
  selectedId: string | null;
  onSelect: (theme: Theme) => void;
};

export function ThemePicker({ selectedId, onSelect }: ThemePickerProps) {
  return (
    <div className="theme-grid">
      {themes.map((theme, index) => {
        const selected = theme.id === selectedId;
        return (
          <button
            key={theme.id}
            type="button"
            className={`theme-card ${selected ? "is-selected" : ""}`}
            style={
              {
                "--theme-accent": theme.accent,
                animationDelay: `${index * 40}ms`,
              } as CSSProperties
            }
            onClick={() => onSelect(theme)}
            aria-pressed={selected}
          >
            <span className="theme-swatch" aria-hidden />
            <span className="theme-copy">
              <span className="theme-name">{theme.name}</span>
              <span className="theme-tagline">{theme.tagline}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
