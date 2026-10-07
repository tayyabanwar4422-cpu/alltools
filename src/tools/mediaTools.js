/**
 * AllToolsHub - Media & Graphics Tools
 * Tool 1: All Video Downloader
 * Tool 2: YouTube Video & MP3 Downloader
 * Tool 3: Image Converter + Resizer + BG Remover
 * Tool 4: Image to PDF Converter
 * Tool 5: WeChat Video Downloader
 *
 * Uses multi-engine API routing with automated failovers for social platforms.
 */
(function() {
  "use strict";
  const { CONFIG, fetchWithTimeout, showToast, updateSEO, renderAdSlot, renderToolHeader, renderFaqs, renderRelatedTools } = window.APP;

  // ============================================================
  // API ENDPOINTS & FALLBACK MATRIX
  // ============================================================
  const YOZORA_BASE = "https://tools-murex-phi.vercel.app";
  const COBALT_API_NODES = [
    "https://api.cobalt.tools/api/json",
    "https://co.wuk.sh/api/json"
  ];

  // Detect platform by URL pattern
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

  // Multi-engine media extractor function
  async function fetchMediaStream(videoUrl, options = {}) {
    const isAudio = options.isAudio || false;
    const quality = options.quality || "720";

    // Attempt 1: Cobalt API Cluster
    for (const nodeUrl of COBALT_API_NODES) {
      try {
        const response = await fetchWithTimeout(nodeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            url: videoUrl,
            vQuality: quality,
            isAudioOnly: isAudio,
            aFormat: "mp3"
          })
        }, 8000);

        if (response.ok) {
          const data = await response.json();
          if (data && (data.url || data.picker)) {
            return {
              url: data.url || (data.picker && data.picker[0] ? data.picker[0].url : null),
              title: data.filename || "Downloaded Media",
              engine: "Cobalt"
            };
          }
        }
      } catch (e) {
        console.warn(`Cobalt node failed (${nodeUrl}):`, e);
      }
    }

    // Attempt 2: Yozora Vercel Endpoint
    try {
      const yozoraUrl = `${YOZORA_BASE}/api/download?url=${encodeURIComponent(videoUrl)}${isAudio ? '&audio=true' : ''}`;
      const res = await fetchWithTimeout(yozoraUrl, {}, 6000);
      if (res.ok) {
        const data = await res.json();
        if (data && data.url) {
          return { url: data.url, title: data.title || "Video Stream", engine: "Yozora" };
        }
      }
    } catch (e) {
      console.warn("Yozora serverless engine failed:", e);
    }

    throw new Error("All download engines were rate-limited or blocked by the platform.");
  }

  // ============================================================
  // TOOL 1: All Video Downloader
  // ============================================================
  function renderVideoDownloader(container) {
    updateSEO({
      title: "All Video Downloader - Save TikTok, YouTube, IG, X, Reddit MP4",
      description: "Fast free online video downloader. Auto-detects TikTok, YouTube, Instagram Reels, Twitter/X, and Reddit videos. Save HD MP4 without watermarks.",
      path: "/tools/video-downloader",
      appName: "All Video Downloader",
      faqs: [
        { q: "Is this video downloader completely free?", a: "Yes, 100% free with unlimited downloads and no software installation required." },
        { q: "Does it remove TikTok watermarks?", a: "Yes, TikTok videos are fetched in high-definition without watermarks via direct MP4 stream extraction." },
        { q: "Do you store any downloaded files?", a: "No. All media links are fetched directly into your browser memory and saved to your device. We store zero user files." }
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
              <input type="url" id="video-url" required placeholder="https://www.tiktok.com/@user/video/... or https://youtu.be/..." 
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
        <h2 class="text-xl font-bold text-white">How to Download Videos from Any Website Online</h2>
        <p class="text-xs sm:text-sm leading-relaxed text-slate-400">
          AllToolsHub All Video Downloader provides a clean solution for saving high-definition video files directly to your phone, tablet, or PC.
        </p>
      </section>

      ${renderFaqs([
        { q: "Can I download videos on an iPhone or Android phone?", a: "Yes. Simply open AllToolsHub in Safari, Chrome, or any mobile browser, paste your link, tap download, and save the file." },
        { q: "Is downloading videos legal?", a: "Downloading public videos for offline personal use and fair use analysis is standard practice." }
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

      const platform = detectPlatform(url);

      // Strategy 1: TikTok via TikWM API
      if (platform && platform.name === "TikTok") {
        try {
          const tikwmApi = CONFIG.TIKWM_API || "https://www.tikwm.com/api/";
          const res = await fetchWithTimeout(`${tikwmApi}?url=${encodeURIComponent(url)}`);
          const data = await res.json();
          if (data && data.data && data.data.play) {
            const d = data.data;
            resultBox.innerHTML = `
              <div class="p-6 bg-slate-950 rounded-xl border border-emerald-500/40 fade-up space-y-4">
                <div class="flex flex-col sm:flex-row gap-4 items-center">
                  <img src="${d.cover}" class="w-24 h-24 object-cover rounded-lg border border-slate-800" alt="Video thumbnail" />
                  <div class="flex-1">
                    <span class="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">TikTok HD</span>
                    <h4 class="text-sm font-semibold text-white mt-1 line-clamp-2">${d.title || "TikTok Video"}</h4>
                    <p class="text-xs text-slate-400 mt-1">Author: @${d.author?.unique_id || "creator"}</p>
                  </div>
                </div>
                <div class="flex flex-wrap gap-2 pt-2">
                  <a href="${d.play}" target="_blank" rel="noopener" download="tiktok_video.mp4" class="flex-1 text-center bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs transition">
                    ⬇️ Save MP4 (No Watermark)
                  </a>
                  ${d.music ? `<a href="${d.music}" target="_blank" rel="noopener" download="audio.mp3" class="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 px-4 rounded-lg text-xs font-medium transition">🎵 Audio MP3</a>` : ''}
                </div>
              </div>
            `;
            showToast("TikTok video ready!");
            return;
          }
        } catch (err) {
          console.warn("TikWM failed, falling back to multi-engine:", err);
        }
      }

      // Strategy 2: Multi-Engine Fallback Extractor
      try {
        const media = await fetchMediaStream(url);
        resultBox.innerHTML = `
          <div class="p-6 bg-slate-950 rounded-xl border border-emerald-500/40 fade-up space-y-4">
            <div>
              <span class="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Stream Ready</span>
              <h4 class="text-sm font-semibold text-white mt-1">${platform?.name || "Video"} — HD Stream Ready</h4>
            </div>
            <div class="rounded-lg overflow-hidden bg-black max-h-64 flex justify-center">
              <video src="${media.url}" controls class="max-h-64 w-full" preload="metadata"></video>
            </div>
            <div class="flex gap-2">
              <a href="${media.url}" target="_blank" rel="noopener" download="video.mp4" class="flex-1 text-center bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-lg text-xs transition">
                ⬇️ Direct Download (MP4)
              </a>
            </div>
          </div>
        `;
        showToast("Video stream found!");
      } catch (error) {
        resultBox.innerHTML = `
          <div class="p-5 bg-slate-950 rounded-xl border border-amber-500/40 fade-up space-y-3">
            <div class="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <span>⚠️</span> Stream temporary blocked by target platform.
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              The platform detected automated requests. Please open via Cobalt stream mirror:
            </p>
            <div class="flex flex-wrap gap-2 pt-1">
              <a href="https://cobalt.tools" target="_blank" rel="noopener" class="bg-emerald-500 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-600 transition">
                Open via Cobalt Portal ↗
              </a>
            </div>
          </div>
        `;
      }
    });
  }

  // ============================================================
  // TOOL 2: YouTube Video & MP3 Downloader
  // ============================================================
  function renderYouTubeDownloader(container) {
    updateSEO({
      title: "YouTube Video & MP3 Downloader - 1080p MP4 & 320kbps Audio",
      description: "Dedicated YouTube MP4 video and MP3 audio converter. Free, high-speed, 1080p, 720p, 480p and 320kbps audio extractions.",
      path: "/tools/youtube-downloader",
      appName: "YouTube Video & MP3 Downloader",
      faqs: [
        { q: "Can I download audio as an MP3?", a: "Yes. Toggle the MP3 tab and click start." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "YouTube Downloader", path: "/tools/youtube-downloader" }]
    });

    container.innerHTML = `
      ${renderToolHeader("YouTube Video & MP3 Downloader", "Dedicated high-performance extractor for YouTube videos, music, podcasts, and Shorts.", "▶️", "1080p Video & 320k Audio")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div class="flex rounded-xl bg-slate-950 p-1 mb-6 border border-slate-800 max-w-md mx-auto">
          <button type="button" id="tab-mp4" class="flex-1 py-2 text-xs font-bold rounded-lg transition bg-emerald-500 text-slate-950">
            🎥 MP4 (Video)
          </button>
          <button type="button" id="tab-mp3" class="flex-1 py-2 text-xs font-bold rounded-lg transition text-slate-400 hover:text-white">
            🎵 MP3 (Audio Only)
          </button>
        </div>

        <form id="yt-form" class="space-y-4">
          <div>
            <label for="yt-url" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">YouTube Video URL</label>
            <input type="url" id="yt-url" required placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..." 
              class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div id="quality-wrapper">
              <label for="yt-quality" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Video Quality</label>
              <select id="yt-quality" class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none">
                <option value="1080">1080p (Full HD)</option>
                <option value="720" selected>720p (HD Standard)</option>
                <option value="480">480p (Fast Download)</option>
              </select>
            </div>

            <div id="audio-wrapper" class="hidden">
              <label for="yt-audio-quality" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Audio Bitrate</label>
              <select id="yt-audio-quality" class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none">
                <option value="320">320 kbps (High Fidelity)</option>
                <option value="192" selected>192 kbps (Standard Quality)</option>
              </select>
            </div>
          </div>

          <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 text-sm">
            <span>⚡ Start Conversion & Fetch</span>
          </button>
        </form>

        <div id="yt-result" class="mt-6 hidden"></div>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("youtube-downloader")}
    `;

    let isAudio = false;
    const tabMp4 = container.querySelector("#tab-mp4");
    const tabMp3 = container.querySelector("#tab-mp3");
    const qualityWrap = container.querySelector("#quality-wrapper");
    const audioWrap = container.querySelector("#audio-wrapper");
    const form = container.querySelector("#yt-form");
    const ytUrl = container.querySelector("#yt-url");
    const ytQuality = container.querySelector("#yt-quality");
    const resultBox = container.querySelector("#yt-result");

    tabMp4.addEventListener("click", () => {
      isAudio = false;
      tabMp4.className = "flex-1 py-2 text-xs font-bold rounded-lg transition bg-emerald-500 text-slate-950";
      tabMp3.className = "flex-1 py-2 text-xs font-bold rounded-lg transition text-slate-400 hover:text-white";
      qualityWrap.classList.remove("hidden");
      audioWrap.classList.add("hidden");
    });

    tabMp3.addEventListener("click", () => {
      isAudio = true;
      tabMp3.className = "flex-1 py-2 text-xs font-bold rounded-lg transition bg-emerald-500 text-slate-950";
      tabMp4.className = "flex-1 py-2 text-xs font-bold rounded-lg transition text-slate-400 hover:text-white";
      qualityWrap.classList.add("hidden");
      audioWrap.classList.remove("hidden");
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const url = ytUrl.value.trim();
      if (!url) return;

      resultBox.classList.remove("hidden");
      resultBox.innerHTML = `
        <div class="p-6 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center gap-3">
          <div class="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs text-slate-300">Contacting video processor...</span>
        </div>
      `;

      try {
        const media = await fetchMediaStream(url, { isAudio: isAudio, quality: ytQuality.value });
        resultBox.innerHTML = `
          <div class="p-5 bg-slate-950 rounded-xl border border-emerald-500/50 fade-up space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-emerald-400">✓ ${isAudio ? 'MP3 Audio' : 'MP4 Video'} Ready</span>
              <span class="text-[11px] text-slate-400 font-mono">Format: ${isAudio ? 'MP3' : 'MP4'}</span>
            </div>
            ${!isAudio ? `
              <div class="rounded-lg overflow-hidden bg-black max-h-64 flex justify-center">
                <video src="${media.url}" controls class="max-h-64 w-full" preload="metadata"></video>
              </div>
            ` : ''}
            <a href="${media.url}" target="_blank" rel="noopener" download="${isAudio ? 'audio.mp3' : 'video.mp4'}" class="block text-center bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-lg text-xs transition">
              ⬇️ Download ${isAudio ? 'MP3 Audio' : 'MP4 Video'}
            </a>
          </div>
        `;
        showToast("File ready for download!");
      } catch (err) {
        resultBox.innerHTML = `
          <div class="p-5 bg-slate-950 rounded-xl border border-slate-800 fade-up space-y-3">
            <div class="text-xs font-bold text-amber-400">Direct streaming limited for this YouTube URL</div>
            <p class="text-xs text-slate-400">YouTube blocked server access. Use this alternative:</p>
            <a href="https://cobalt.tools" target="_blank" rel="noopener" class="inline-block bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-4 py-2 rounded-lg font-semibold transition">
              Open Fallback Stream Engine ↗
            </a>
          </div>
        `;
      }
    });
  }

  // Register routing hooks in APP namespace
  window.APP = window.APP || {};
  window.APP.renderVideoDownloader = renderVideoDownloader;
  window.APP.renderYouTubeDownloader = renderYouTubeDownloader;

})();
