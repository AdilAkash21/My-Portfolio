import { Link } from "react-router-dom";
import profileImg from "@/assets/profile-optimized.webp";

const Swatch = ({ title, children, note }) => (
  <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 shadow-sm">
    <div className="flex items-baseline justify-between">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">{title}</h2>
      {note && <span className="text-xs text-muted-foreground">{note}</span>}
    </div>
    <div className="flex items-center justify-center min-h-[220px]">{children}</div>
  </div>
);

const ProfilePreview = () => {
  return (
    <main className="min-h-screen w-full bg-background text-foreground px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Profile Image Preview</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Live preview of how your profile photo renders across the site.
            </p>
          </div>
          <Link
            to="/"
            className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            ← Back to site
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hero — large circle with gradient glow */}
          <Swatch title="Hero" note="Circular · 192px">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-60"
                style={{
                  background:
                    "conic-gradient(from 180deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
                }}
                aria-hidden
              />
              <img
                src={profileImg}
                alt="Hero profile preview"
                className="relative w-48 h-48 rounded-full object-cover border-2 border-primary/40 shadow-2xl"
              />
            </div>
          </Swatch>

          {/* Header — small avatar in a nav bar */}
          <Swatch title="Header" note="Avatar · 40px">
            <div className="w-full rounded-xl border border-border bg-background/60 backdrop-blur px-4 py-3 flex items-center justify-between">
              <span className="font-semibold tracking-tight">ARA</span>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="hidden sm:inline">Home</span>
                <span className="hidden sm:inline">Work</span>
                <img
                  src={profileImg}
                  alt="Header avatar preview"
                  className="w-10 h-10 rounded-full object-cover border border-border"
                />
              </div>
            </div>
          </Swatch>

          {/* Card — square thumbnail with caption */}
          <Swatch title="Card" note="Square · 96px">
            <div className="w-full rounded-xl border border-border bg-card p-4 flex items-center gap-4">
              <img
                src={profileImg}
                alt="Card thumbnail preview"
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold truncate">Adil Rahman Akash</p>
                <p className="text-xs text-muted-foreground truncate">Developer · Designer</p>
                <p className="text-xs text-muted-foreground mt-1">Available for work</p>
              </div>
            </div>
          </Swatch>
        </div>

        {/* Extra: shape & size sweep */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-6">
            Shape & size sweep
          </h2>
          <div className="flex flex-wrap items-end gap-8">
            {[32, 48, 64, 96, 128].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <img
                  src={profileImg}
                  alt={`${s}px circle`}
                  style={{ width: s, height: s }}
                  className="rounded-full object-cover border border-border"
                />
                <span className="text-xs text-muted-foreground">{s}px</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2">
              <img
                src={profileImg}
                alt="Square 96"
                className="w-24 h-24 rounded-lg object-cover border border-border"
              />
              <span className="text-xs text-muted-foreground">square</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src={profileImg}
                alt="Tall 64x96"
                className="w-16 h-24 rounded-lg object-cover border border-border"
              />
              <span className="text-xs text-muted-foreground">portrait crop</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          Source: <code>src/assets/profile-optimized.webp</code>
        </p>
      </div>
    </main>
  );
};

export default ProfilePreview;