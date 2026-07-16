export type Theme = {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  prompt: string;
};

const preserveReference =
  "";

export const themes: Theme[] = [
  {
    id: "engraved-cubist",
    name: "Engraved Cubist",
    tagline: "Sculpted lines, topographic depth",
    accent: "#174BFF", // High-tone vibrant blue
    prompt:
      `${preserveReference} Transform the portrait into an ultra-premium museum-quality artwork that blends optical contour-line illustration, geometric cubism, topographic line engraving, and contemporary sculptural design. Build the face and surrounding forms with ultra-fine flowing contour lines, layered polygonal facets, sculptural arcs, and elegant geometric ribbons. Use a refined palette of deep navy, teal, emerald, ochre, amber, terracotta, cream, sandstone, warm ivory, charcoal, and muted gold. Add subtle paper grain, etched textures, dimensional relief, soft museum-gallery lighting, premium HDR shading, ambient occlusion, and cinematic editorial color grading. Keep the result highly recognizable, clean, luxurious, and poster-worthy. No text, watermark, logo, identity drift, facial distortion, or altered pose.`,
  },
  {
    id: "paintfail",
    name: "Paint Fail",
    tagline: "Laughably bad MSPaint style",
    accent: "#FF5733", // Vibrant orange-red
    prompt:
      `${preserveReference} Redraw the portrait in a hilariously bad MS Paint style while still matching the original pose and face exactly. Use clumsy mouse-drawn lines, awkward proportions in the rendering style only, jagged fills, crude scribbles, flat color, rough outlines, and a plain white background. It should feel intentionally amateur, cheap, and funny, but the underlying person, angle, hair, glasses, and expression must still clearly match the uploaded image. No text, watermark, or changed composition.`,
  },
  {
    id: "smoke-dramatic",
    name: "Smoky Drama",
    tagline: "Ash, embers, cinematic shadows",
    accent: "#363C4F",
    prompt:
      `${preserveReference} Transform the portrait into a hyper-real cinematic dark scene with dramatic overhead lighting, thick swirling smoke, floating ash, glowing embers, and subtle lava-like red cracks in the background. Use dark blue, charcoal, and ember-red tones, realistic smoke integration, rich contrast, and cinematic color grading. No text, watermark, or identity changes.`,
  },
  {
    id: "watercolor",
    name: "Watercolor",
    tagline: "Soft washes, airy edges",
    accent: "#7EC8E3",
    prompt:
      `${preserveReference} Transform the portrait into a delicate watercolor painting with soft pigment washes, gentle paper texture, airy bleeding edges, and a light pastel palette. Keep the exact likeness and composition while only changing the medium and mood. No text or watermark.`,
  },
  {
    id: "pixel",
    name: "Pixel Pop",
    tagline: "Chunky pixels, retro charm",
    accent: "#C8F542",
    prompt:
      `${preserveReference} Restyle the portrait as charming 32-bit pixel art with a clean limited palette, crisp pixel edges, and a simple retro backdrop. Preserve the exact face, angle, hair silhouette, and expression; only convert the visual treatment into pixel art. No text or watermark.`,
  },
  {
    id: "film",
    name: "Vintage Film",
    tagline: "Grain, warm fade, 70s glow",
    accent: "#FF8F6B",
    prompt:
      `${preserveReference} Restyle the portrait as a vintage 1970s film photograph with warm faded tones, soft grain, subtle light leaks, slight vignette, and nostalgic cinematic mood. Keep the exact pose, crop, face, hair, and expression from the reference. No text or watermark.`,
  },
  {
    id: "comic",
    name: "Comic Ink",
    tagline: "Bold lines, halftone punch",
    accent: "#FF5C7A",
    prompt:
      `${preserveReference} Transform the portrait into a bold comic-book illustration with strong ink outlines, dramatic halftone shading, punchy contrast, and a simple graphic background. Keep the subject's exact facial features, pose, hair, and expression while only applying comic style. No speech bubbles, text, or watermark.`,
  },
  {
    id: "clay",
    name: "Clay Craft",
    tagline: "Clay-doh animated, playful look",
    accent: "#B48A6A",
    prompt:
      `${preserveReference} Change the portrait into a colorful clay-doh animated character, as if sculpted from real clay-doh. Use soft modeling, playful rounded forms, visible blending of clay colors, and subtle finger-marks in the clay surface for realism. Only the style and material should look like stop-motion clay-doh animation; do not alter the person's identity, pose, gaze, or expression. No text or watermark.`,
  },
  {
    id: "sketch",
    name: "Pencil Sketch",
    tagline: "Graphite lines, paper grain",
    accent: "#9AA4B2",
    prompt:
      `${preserveReference} Transform the portrait into a refined graphite pencil sketch on textured paper with confident line work, soft cross-hatching, natural shading, and a cream-white paper ground. Preserve the exact profile reference and only change the rendering medium. No text or watermark.`,
  },
  {
    id: "popart",
    name: "Pop Burst",
    tagline: "Flat color, graphic punch",
    accent: "#FF3D8A",
    prompt:
      `${preserveReference} Restyle the portrait as vibrant pop-art with flat saturated color blocks, high-contrast graphic shadows, and an energetic but clean composition. Keep the exact pose, angle, hair, and facial expression while only changing the graphic style and color treatment. No text or watermark.`,
  },
];

export function getThemeById(id: string): Theme | undefined {
  return themes.find((theme) => theme.id === id);
}
