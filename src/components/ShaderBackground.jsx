import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Flowing aurora-like shader using domain-warped fbm noise.
// Colored with the current theme's primary HSL passed in via uniform.
// OCTAVES is injected per quality tier (3=low, 4=medium, 5=high).
const buildFrag = (octaves) => `
precision highp float;
#define OCTAVES ${octaves}
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_color;     // primary as RGB 0-1
uniform vec3 u_color2;    // glow as RGB 0-1
uniform float u_intensity;

// hash + value noise
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for(int i = 0; i < OCTAVES; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t = u_time * 0.05;

  // Domain warp for organic flowing shapes
  vec2 q = vec2(fbm(uv + vec2(0.0, t)), fbm(uv + vec2(5.2, -t)));
  vec2 r = vec2(
    fbm(uv + 1.5 * q + vec2(1.7, 9.2) + 0.15 * t),
    fbm(uv + 1.5 * q + vec2(8.3, 2.8) - 0.12 * t)
  );
  float n = fbm(uv + 1.8 * r);

  // Soft radial vignette so edges fall to background
  float vignette = smoothstep(1.1, 0.2, length(uv));

  // Blend two color stops
  vec3 col = mix(u_color * 0.6, u_color2, smoothstep(0.35, 0.85, n));

  // Subtle fine grain to avoid banding
  float grain = (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.015;

  float alpha = clamp(pow(n, 1.6) * vignette * u_intensity + grain, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("shader compile error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

// Read an HSL CSS variable and convert to RGB 0-1
function readThemeColor(varName) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  if (!raw) return [0.4, 0.7, 1.0];
  const parts = raw.split(/\s+/);
  const h = parseFloat(parts[0]) / 360;
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;
  if (s === 0) return [l, l, l];
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3)];
}

// Quality tier presets: scale = canvas DPR factor, octaves = fbm complexity, fps = target frame cap
const QUALITY_PRESETS = {
  low:    { scale: 0.6, octaves: 3, fps: 30 },
  medium: { scale: 1.0, octaves: 4, fps: 45 },
  high:   { scale: 1.5, octaves: 5, fps: 60 },
};

// Heuristic: pick a starting tier based on device capability + user signals
function detectQuality() {
  if (typeof window === "undefined") return "medium";
  const nav = navigator;
  const conn = nav.connection || {};
  // Respect Save-Data / very slow connections → lowest
  if (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || "")) return "low";
  const cores = nav.hardwareConcurrency || 4;
  const mem = nav.deviceMemory || 4;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches;
  const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 700;
  if (cores <= 4 || mem <= 2 || (coarse && smallScreen)) return "low";
  if (cores >= 8 && mem >= 8 && !coarse) return "high";
  return "medium";
}

// Listen for battery low-power state (Chromium only); returns an unsubscribe
function watchBattery(onLowPower) {
  if (!navigator.getBattery) return () => {};
  let battery = null;
  let cancelled = false;
  const update = () => onLowPower(!!battery && !battery.charging && battery.level <= 0.2);
  navigator.getBattery().then((b) => {
    if (cancelled) return;
    battery = b;
    b.addEventListener("levelchange", update);
    b.addEventListener("chargingchange", update);
    update();
  }).catch(() => {});
  return () => {
    cancelled = true;
    if (battery) {
      battery.removeEventListener("levelchange", update);
      battery.removeEventListener("chargingchange", update);
    }
  };
}

const ShaderBackground = ({
  className = "",
  intensity = 0.55,
  // "auto" picks a tier from device capability; force with "low" | "medium" | "high"
  quality = "auto",
  // Pause rendering when battery is in low-power mode (where supported)
  pauseOnLowPower = true,
  // Pause when canvas scrolls offscreen
  pauseWhenOffscreen = true,
  // Auto-downgrade to a lower tier if measured FPS stays below target
  autoDowngrade = true,
}) => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: false, alpha: true });
    if (!gl) return;

    // Resolve initial tier
    const tierOrder = ["high", "medium", "low"];
    let tier = quality === "auto" ? detectQuality() : quality;
    if (!QUALITY_PRESETS[tier]) tier = "medium";
    let preset = QUALITY_PRESETS[tier];

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, buildFrag(preset.octaves));
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uColor = gl.getUniformLocation(prog, "u_color");
    const uColor2 = gl.getUniformLocation(prog, "u_color2");
    const uIntensity = gl.getUniformLocation(prog, "u_intensity");
    gl.uniform1f(uIntensity, intensity);

    const updateColors = () => {
      gl.uniform3fv(uColor, new Float32Array(readThemeColor("--primary")));
      gl.uniform3fv(uColor2, new Float32Array(readThemeColor("--glow")));
    };
    updateColors();

    // Effective DPR caps native dpr by the tier's scale factor
    const dpr = () => Math.min(window.devicePixelRatio || 1, preset.scale);
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr()));
      canvas.height = Math.max(1, Math.floor(h * dpr()));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Render loop with FPS cap, frame-time sampling, and auto-downgrade
    let raf = 0;
    let start = performance.now();
    let lastFrame = start;
    let visible = true;        // intersection observer
    let lowPower = false;      // battery
    let pageVisible = !document.hidden;
    let userPaused = reduced;  // honor prefers-reduced-motion (single static frame)

    // Sliding window of frame durations for downgrade decision
    const frameSamples = [];
    const SAMPLE_SIZE = 60;
    let downgradeCheckedAt = 0;

    const isRunning = () => visible && pageVisible && !lowPower && !userPaused;

    const recompileForTier = () => {
      const newFs = compile(gl, gl.FRAGMENT_SHADER, buildFrag(preset.octaves));
      if (!newFs) return;
      gl.detachShader(prog, fs);
      gl.deleteShader(fs);
      gl.attachShader(prog, newFs);
      gl.linkProgram(prog);
      gl.useProgram(prog);
      // uniforms reset on re-link → restore
      gl.uniform1f(uIntensity, intensity);
      updateColors();
      resize();
    };

    const tryDowngrade = (now) => {
      if (!autoDowngrade) return;
      if (frameSamples.length < SAMPLE_SIZE) return;
      if (now - downgradeCheckedAt < 2000) return;
      downgradeCheckedAt = now;
      const avg = frameSamples.reduce((a, b) => a + b, 0) / frameSamples.length;
      const targetMs = 1000 / preset.fps;
      // If averaging >35% slower than target, drop one tier
      if (avg > targetMs * 1.35) {
        const idx = tierOrder.indexOf(tier);
        if (idx < tierOrder.length - 1) {
          tier = tierOrder[idx + 1];
          preset = QUALITY_PRESETS[tier];
          frameSamples.length = 0;
          recompileForTier();
        }
      }
    };

    const drawFrame = (now) => {
      const t = (now - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const render = (now) => {
      if (!isRunning()) { raf = 0; return; }
      const targetMs = 1000 / preset.fps;
      const dt = now - lastFrame;
      if (dt + 0.5 >= targetMs) {
        drawFrame(now);
        if (frameSamples.push(dt) > SAMPLE_SIZE) frameSamples.shift();
        lastFrame = now;
        tryDowngrade(now);
      }
      raf = requestAnimationFrame(render);
    };
    const startLoop = () => {
      if (raf || !isRunning()) return;
      lastFrame = performance.now();
      raf = requestAnimationFrame(render);
    };
    // Render at least one frame so reduced-motion users see the static art
    drawFrame(performance.now());
    if (!reduced) startLoop();

    // Re-sync color a few times after theme toggle (CSS vars swap mid-transition)
    const syncTimers = [80, 250, 600].map((d) => setTimeout(updateColors, d));

    // Pause when tab hidden
    const onVis = () => { pageVisible = !document.hidden; startLoop(); };
    document.addEventListener("visibilitychange", onVis);

    // Pause when canvas scrolls offscreen
    let io;
    if (pauseWhenOffscreen && "IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        startLoop();
      }, { threshold: 0.01 });
      io.observe(canvas);
    }

    // Pause on low battery (where supported)
    const stopBattery = pauseOnLowPower
      ? watchBattery((isLow) => { lowPower = isLow; startLoop(); })
      : () => {};

    return () => {
      userPaused = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      stopBattery();
      document.removeEventListener("visibilitychange", onVis);
      syncTimers.forEach(clearTimeout);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      // fs may have been swapped during downgrade; deleting the original handle is safe
      try { gl.deleteShader(fs); } catch {}
    };
  }, [theme, intensity, quality, pauseOnLowPower, pauseWhenOffscreen, autoDowngrade]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default ShaderBackground;