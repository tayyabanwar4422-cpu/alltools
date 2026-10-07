/**
 * AllToolsHub - Media & Graphics Tools Suite
 * Designed & Built by Tayyab Anwar
 * 100% Client-Side Processing Paradigm where applicable.
 * 
 * Features:
 * Tool 1: All Video Downloader (With Dedicated Cobalt Proxy Fallback for Instagram)
 * Tool 2: YouTube Video & MP3 Downloader (1080p Video & 320kbps Audio)
 * Tool 3: Image Converter + Resizer + BG Remover (HTML5 Canvas Memory Processing)
 * Tool 4: Image to PDF Converter (jsPDF Layout Compiler)
 * Tool 5: WeChat Video Downloader (CORS Official Article Metadata Scraper)
 */
(function() {
  "use strict";
  const { CONFIG, fetchWithTimeout, showToast, updateSEO, renderAdSlot, renderToolHeader, renderFaqs, renderRelatedTools } = window.APP;

  const YOZORA_BASE = "https://tools-murex-phi.vercel.app";

  // Helper to identify social platforms
  function detectPlatform(url) {
    if (!url) return null;
    const lower = url.toLowerCase();
    if (lower.includes("tiktok.com")) return { name: "TikTok", badge: "🎵 TikTok", color: "text-rose-400" };
    if (lower.includes("youtube.com") || lower.includes("youtu.be")) return { name: "YouTube", badge: "▶️ YouTube", color: "text-red-500" };
    if (lower.includes("instagram.com")) return { name: "Instagram", badge: "📸 Instagram", color: "text-pink-400" };
    if (lower.includes("twitter.com") || lower.includes("x.com")) return { name: "Twitter / X", badge: "🐦 Twitter/X", color: "text-sky-400" };
    if (lower.includes("facebook.com") || lower.includes("fb.watch")) return { name: "Facebook", badge: "👥 Facebook", color: "text-blue-500" };
    if (lower.includes("reddit.com")) return { name: "Reddit", badge: "🤖 Reddit", color: "text-orange-500" };
    if (lower.includes("threads.net")) return { name: "Threads", badge: "🧵 Threads", color: "text-slate-200" };
    if (lower.includes("vimeo.com")) return { name: "Vimeo", badge: "🎥 Vimeo", color: "text-cyan-400" };
    if (lower.includes("dailymotion.com")) return { name: "Dailymotion", badge: "📺 Dailymotion", color: "text-amber-400" };
    if (lower.includes("twitch.tv")) return { name: "Twitch", badge: "👾 Twitch", color: "text-purple-400" };
    return { name: "Generic Web Video", badge: "🌐 Web Video", color: "text-emerald-400" };
  }

  async function fetchViaYozora(videoUrl) {
    const streamUrl = `${YOZORA_BASE}/api/download?url=${encodeURIComponent(videoUrl)}`;
    return { url: streamUrl, platform: "Video", isStream: true };
  }

  // ============================================================
  // TOOL 1: All Video Downloader (Instagram Fixed + SEO Text)
  // ============================================================
  function renderVideoDownloader(container) {
    updateSEO({
      title: "All Video Downloader - Download TikTok, YouTube, Instagram, X MP4",
      description: "Fast free online video downloader. Auto-detects TikTok, YouTube, Instagram Reels, Twitter/X, and Reddit videos. Save HD MP4 without watermarks.",
      path: "/tools/video-downloader",
      appName: "All Video Downloader",
      faqs: [
        { q: "Is this video downloader completely free?", a: "Yes, 100% free with unlimited downloads and no software installation required." },
        { q: "Does it remove TikTok watermarks?", a: "Yes, TikTok videos are fetched in high-definition without watermarks via direct MP4 stream extraction." },
        { q: "Can I download Instagram Reels and Videos?", a: "Yes. Our upgraded infrastructure securely bypasses network rate limits to extract crystal clear Instagram MP4 streams instantly." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "All Video Downloader", path: "/tools/video-downloader" }]
    });

    container.innerHTML = `
      ${renderToolHeader("All Video Downloader", "Download HD videos from TikTok, YouTube, Instagram, X, Reddit, Vimeo and 1000+ sites.", "🎬", "Universal MP4 Downloader")}
      
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <form id="video-form" class="space-y-4">
          <div>
            <label for="video-url" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Paste Video URL</label>
            <div class="relative">
              <input type="url" id="video-url" required placeholder="https://instagram.com... or https://tiktok.com..." 
                class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 transition-colors pr-24 outline-none" />
              <button type="button" id="paste-btn" class="absolute right-2 top-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition">
                Paste
              </button>
            </div>
            <div id="platform-detector" class="mt-2 text-xs flex items-center gap-2 min-h-[20px]"></div>
          </div>

          <button type="submit" id="download-submit-btn" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2 text-sm">
            <span>⚡ Fetch Download Links</span>
          </button>
        </form>

        <div id="video-result" class="mt-6 hidden"></div>
      </div>

      ${renderAdSlot("Below Tool Card")}

      <section class="mt-12 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 text-slate-300 space-y-6">
        <h2 class="text-xl font-bold text-white">How to Download Instagram Reels & Social Videos Online</h2>
        <p class="text-xs sm:text-sm leading-relaxed text-slate-400">
          AllToolsHub All Video Downloader provides a clean, zero-software solution for saving high-definition video files directly to your phone, tablet, or PC. Whether you need a short educational clip from YouTube, a trending TikTok recipe without watermarks, an Instagram carousel video, or an archival copy of a Reddit discussion, our engine extracts direct MP4 media streams instantly without requiring registration.
        </p>

        <h3 class="text-base font-bold text-white mt-4">Step-by-Step Instructions</h3>
        <ol class="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-400">
          <li><strong>Copy Link:</strong> Open the video in your app or browser and tap the "Share" or "Copy link" option.</li>
          <li><strong>Paste URL:</strong> Paste the copied link into the input box above. Our intelligent regex will identify the host platform immediately.</li>
          <li><strong>Generate & Download:</strong> Click "Fetch Download Links" and select your preferred MP4 resolution to download the video directly to your local storage directory.</li>
        </ol>
      </section>

      ${renderFaqs([
        { q: "Can I download videos on an iPhone or Android phone?", a: "Yes. Simply open AllToolsHub in Safari, Chrome, or any mobile browser, paste your link, tap download, and save the file directly to your Files or Photos app." },
        { q: "Is downloading videos legal?", a: "Downloading public videos for offline personal use, educational research, and fair use analysis is standard practice. Always respect original creator copyrights and platform terms." },
        { q: "What should I do if an Instagram link fails to fetch?", a: "Our system has a built-in fallback cluster that uses automated proxy rotations. If it fails, refresh the page and re-paste your public link." }
      ])}

      ${renderRelatedTools("video-downloader")}
    `;

    const urlInput = container.querySelector("#video-url");
    const pasteBtn = container.querySelector("#paste-btn");
    const detector = container.querySelector("#platform-detector");
    const form = container.querySelector("#video-form");
    const resultBox = container.querySelector("#video-result");

    pasteBtn.addEventListener("click", async () => {
      try {
        const text = await navigator.clipboard.readText();
        urlInput.value = text;
        urlInput.dispatchEvent(new Event("input"));
        showToast("Pasted link from clipboard!");
      } catch {
        showToast("Clipboard access denied. Please paste manually.", "error");
      }
    });

    urlInput.addEventListener("input", () => {
      const detected = detectPlatform(urlInput.value);
      if (detected) {
        detector.innerHTML = `<span class="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 ${detected.color}">Detected: ${detected.badge}</span>`;
      } else {
        detector.innerHTML = "";
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const url = urlInput.value.trim();
      if (!url) return;

      resultBox.classList.remove("hidden");
      resultBox.innerHTML = `
        <div class="p-6 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-3">
          <div class="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs text-slate-300 font-medium">Extracting media streams... Please hold on.</span>
        </div>
      `;

      if (url.toLowerCase().includes("instagram.com")) {
        const endpoints = ["https://cobalt.tools", "https://kwiatekmiki.com"];
        for (const api of endpoints) {
          try {
            const res = await fetchWithTimeout(api, {
              method: "POST",
              headers: { "Content-Type": "application/json", "Accept": "application/json" },
              body: JSON.stringify({ url: url, videoQuality: "720" })
            }, 8000);
            const data = await res.json();
            if (data && data.url) {
              resultBox.innerHTML = `
                <div class="p-6 bg-slate-950 rounded-xl border border-emerald-500/40 fade-up space-y-4">
                  <div>
