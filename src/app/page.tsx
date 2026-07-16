import { Studio } from "@/components/Studio";

export default function Home() {
  return (
    <div className="page">
      <div className="atmosphere" aria-hidden>
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="grain" />
      </div>

      <header className="topbar">
        <a href="#top" className="logo-mark">
          ProfilePop
        </a>
        <a href="#studio" className="topbar-link">
          Open studio
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <p className="brand">ProfilePop</p>
          <h1>Your face. Any vibe.</h1>
          <p className="lede">
            Pick a style, drop in a profile photo, and download a Gemini-styled
            portrait ready for anywhere you show up online.
          </p>
          <div className="hero-cta">
            <a href="#studio" className="primary-btn">
              Start styling
            </a>
          </div>
          <div className="hero-visual" aria-hidden>
            <div className="flash-ring" />
            <div className="portrait-frame">
              <div className="portrait-shimmer" />
            </div>
          </div>
        </section>

        <Studio />
      </main>

      <footer className="footer">
        <p>ProfilePop · powered by Gemini image models</p>
      </footer>
    </div>
  );
}
