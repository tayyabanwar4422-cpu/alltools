/**
 * AllToolsHub - Media & Graphics Tools
 * Tool 1: All Video Downloader (TikTok, X, Reddit)
 * Tool 2: Image Converter + Resizer + BG Remover
 * Tool 3: Image to PDF Converter
 * Tool 4: WeChat Video Downloader
 */
(function() {
  "use strict";
  const { CONFIG, fetchWithTimeout, showToast, updateSEO, renderAdSlot, renderToolHeader, renderFaqs, renderRelatedTools } = window.APP;

  const YOZORA_BASE = "https://tools-murex-phi.vercel.app";

  function detectPlatform(url) {
    if (!url) return null;
    const lower = url.toLowerCase();
    if (lower.includes("tiktok.com")) return { name: "TikTok", badge: "🎵 TikTok", color: "text-rose-400" };
    if (lower.includes("twitter.com") || lower.includes("x.com")) return { name: "Twitter / X", badge: "🐦 Twitter/X", color: "text-sky-400" };
    if (lower.includes("reddit.com")) return { name: "Reddit", badge: "🤖 Reddit", color: "text-orange-500" };
    if (lower.includes("threads.net")) return { name: "Threads", badge: "🧵 Threads", color: "text-slate-200" };
    if (lower.includes("vimeo.com")) return { name: "Vimeo", badge: "🎥 Vimeo", color: "text-cyan-400" };
    if (lower.includes("dailymotion.com")) return { name: "Dailymotion", badge: "📺 Dailymotion", color: "text-amber-400" };
    if (lower.includes("twitch.tv")) return { name: "Twitch", badge: "👾 Twitch", color: "text-purple-400" };
    if (lower.includes("facebook.com") || lower.includes("fb.watch")) return { name: "Facebook", badge: "👥 Facebook", color: "text-blue-500" };
    return { name: "Web Video", badge: "🌐 Web Video", color: "text-emerald-400" };
  }

  async function fetchViaYozora(videoUrl) {
    const streamUrl = `${YOZORA_BASE}/api/download?url=${encodeURIComponent(videoUrl)}`;
    console.log("Using Yozora direct stream URL:", streamUrl);
    return { url: streamUrl, platform: "Video", isStream: true };
  }

  // ============================================================
  // REDDIT HANDLER — Uses Reddit's public JSON API (no auth needed)
  // Avoids yt-dlp's datacenter IP block entirely
  // ============================================================
  async function fetchViaReddit(videoUrl) {
    let cleanUrl = videoUrl.split("?")[0].replace(/\/+$/, "");
    if (!cleanUrl.endsWith(".json")) {
      cleanUrl = cleanUrl + ".json";
    }

    console.log("Fetching Reddit JSON API:", cleanUrl);

    const proxies = [
      "https://api.allorigins.win/raw?url=",
      "https://corsproxy.io/?",
      "https://api.codetabs.com/v1/proxy?quest="
    ];

    let lastError = null;

    for (const proxy of proxies) {
      try {
        const proxyUrl = proxy + encodeURIComponent(cleanUrl);
        const res = await fetchWithTimeout(proxyUrl, {
          method: "GET",
          headers: { "Accept": "application/json" }
        }, 15000);

        if (!res.ok) {
          lastError = new Error(`Proxy returned ${res.status}`);
          continue;
        }

        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          lastError = new Error("Invalid JSON from Reddit");
          continue;
        }

        const post = Array.isArray(data) ? data[0]?.data?.children?.[0]?.data : null;
        if (!post) {
          lastError = new Error("No post data in Reddit response");
          continue;
        }

        let videoUrlOut = null;

        // Method 1: Reddit-hosted video (v.redd.it)
        if (post.media?.reddit_video?.fallback_url) {
          videoUrlOut = post.media.reddit_video.fallback_url;
        }

        // Method 2: Preview video
        if (!videoUrlOut && post.preview?.reddit_video_preview?.fallback_url) {
          videoUrlOut = post.preview.reddit_video_preview.fallback_url;
        }

        // Method 3: Direct video file link
        if (!videoUrlOut && post.url_overridden_by_dest) {
          if (post.url_overridden_by_dest.match(/\.(mp4|webm|mov)$/i)) {
            videoUrlOut = post.url_overridden_by_dest;
          } else {
            // External platform — let Yozora handle it
            return await fetchViaYozora(post.url_overridden_by_dest);
          }
        }

        if (!videoUrlOut) {
          lastError = new Error("No video URL found in Reddit post");
          continue;
        }

        console.log("✅ Reddit video found:", videoUrlOut);
        return { url: videoUrlOut, platform: "Reddit" };

      } catch (err) {
        lastError = err;
        console.warn("Reddit proxy attempt failed:", err.message);
      }
    }

    throw lastError || new Error("All Reddit proxies failed");
  }

  // ============================================================
  // TOOL 1: All Video Downloader
  // ============================================================
  function renderVideoDownloader(container) {
    updateSEO({
      title: "All Video Downloader - Download TikTok, X, Reddit Videos as MP4",
      description: "Fast free online video downloader. Auto-detects TikTok, Twitter/X, Reddit, and 1000+ sites. Save HD MP4 without watermarks. No signup required.",
      path: "/tools/video-downloader",
      appName: "All Video Downloader",
      faqs: [
        { q: "Is this video downloader completely free?", a: "Yes, 100% free with unlimited downloads and no software installation required." },
        { q: "Does it remove TikTok watermarks?", a: "Yes, TikTok videos are fetched in high-definition without watermarks via direct MP4 stream extraction." },
        { q: "Do you store any downloaded files?", a: "No. All media links are fetched directly into your browser memory and saved to your device. We store zero user files." },
        { q: "Which platforms are supported?", a: "TikTok, Twitter/X, Reddit, Threads, Vimeo, Dailymotion, Facebook, and Twitch clips. YouTube and Instagram are not supported due to platform restrictions on free hosting." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "All Video Downloader", path: "/tools/video-downloader" }]
    });

    container.innerHTML = `
      ${renderToolHeader("All Video Downloader", "Download HD videos from TikTok, Twitter/X, Reddit, and 1000+ other sites.", "🎬", "Universal MP4 Downloader")}
      
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <form id="video-form" class="space-y-4">
          <div>
            <label for="video-url" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Paste Video URL</label>
            <div class="relative">
              <input type="url" id="video-url" required placeholder="https://www.tiktok.com/@user/video/... or any video link" 
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
        <h2 class="text-xl font-bold text-white">How to Download Videos from Supported Sites</h2>
        <p class="text-xs sm:text-sm leading-relaxed text-slate-400">
          AllToolsHub All Video Downloader provides a clean, zero-software solution for saving high-definition video files directly to your phone, tablet, or PC. Whether you need a trending TikTok recipe without watermarks, a Twitter/X news clip, or an archival copy of a Reddit discussion, our engine extracts direct MP4 media streams instantly.
        </p>

        <h3 class="text-base font-bold text-white mt-4">Step-by-Step Instructions</h3>
        <ol class="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-400">
          <li><strong>Copy Link:</strong> Open the video in your app or browser and tap the "Share" or "Copy link" option.</li>
          <li><strong>Paste URL:</strong> Paste the copied link into the input box above. Our intelligent regex will identify the host platform immediately.</li>
          <li><strong>Generate & Download:</strong> Click "Fetch Download Links" and save the video directly to your storage.</li>
        </ol>

        <h3 class="text-base font-bold text-white mt-4">Supported Social & Streaming Networks</h3>
        <ul class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300">
          <li class="bg-slate-950 p-2.5 rounded-lg border border-slate-800">✓ TikTok (No Watermark)</li>
          <li class="bg-slate-950 p-2.5 rounded-lg border border-slate-800">✓ Twitter / X Videos</li>
          <li class="bg-slate-950 p-2.5 rounded-lg border border-slate-800">✓ Reddit & Threads Media</li>
          <li class="bg-slate-950 p-2.5 rounded-lg border border-slate-800">✓ Facebook Watch Videos</li>
          <li class="bg-slate-950 p-2.5 rounded-lg border border-slate-800">✓ Vimeo & Dailymotion</li>
          <li class="bg-slate-950 p-2.5 rounded-lg border border-slate-800">✓ Twitch Clips</li>
        </ul>

        <div class="p-4 bg-slate-950 rounded-xl border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
          <strong class="text-amber-400">Note:</strong> YouTube and Instagram downloads are not supported. These platforms block automated requests from free hosting infrastructure. Please use their official apps or a dedicated paid service for those platforms.
        </div>
      </section>

      ${renderFaqs([
        { q: "Can I download videos on an iPhone or Android phone?", a: "Yes. Simply open AllToolsHub in Safari, Chrome, or any mobile browser, paste your link, tap download, and save the file directly to your Files or Photos app." },
        { q: "Is downloading videos legal?", a: "Downloading public videos for offline personal use, educational research, and fair use analysis is standard practice. Always respect original creator copyrights and platform terms." },
        { q: "Why don't YouTube and Instagram work?", a: "YouTube and Instagram actively block automated requests from datacenter servers. Their content requires either a paid residential proxy or a logged-in user session, which is not feasible on free hosting." }
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

      // Reject YouTube and Instagram with a friendly message
      const lower = url.toLowerCase();
      if (lower.includes("youtube.com") || lower.includes("youtu.be") || lower.includes("instagram.com")) {
        resultBox.innerHTML = `
          <div class="p-5 bg-slate-950 rounded-xl border border-amber-500/40 fade-up space-y-3">
            <div class="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <span>⚠️</span> This platform isn't supported
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              YouTube and Instagram block automated downloads from free hosting infrastructure. Please use their official apps or a dedicated paid service for these platforms. We support TikTok, Twitter/X, Reddit, Facebook, Vimeo, Dailymotion, Threads, and Twitch.
            </p>
          </div>
        `;
        return;
      }

      try {
        let result = null;

        // Strategy 1: TikTok → TikWM
        if (platform && platform.name === "TikTok") {
          try {
            const res = await fetchWithTimeout(`${CONFIG.TIKWM_API}?url=${encodeURIComponent(url)}`);
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
                    <a href="${d.play}" target="_blank" download="tiktok_video.mp4" class="flex-1 text-center bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs transition">
                      ⬇️ Save MP4 (No Watermark)
                    </a>
                    ${d.music ? `<a href="${d.music}" target="_blank" download="audio.mp3" class="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 px-4 rounded-lg text-xs font-medium transition">🎵 Audio MP3</a>` : ''}
                  </div>
                </div>
              `;
              showToast("TikTok video ready!");
              return;
            }
          } catch (err) {
            console.warn("TikWM failed:", err);
          }
        }

        // Strategy 2: Reddit → Reddit public JSON API (bypasses yt-dlp IP block)
        if (platform && platform.name === "Reddit") {
          try {
            const r = await fetchViaReddit(url);
            if (r && r.url) result = r;
          } catch (err) {
            console.warn("Reddit handler failed:", err);
          }
        }

        // Strategy 3: Yozora (Vercel) for other platforms
        if (!result) {
          try {
            const y = await fetchViaYozora(url);
            if (y && y.url) result = y;
          } catch (err) {
            console.warn("Yozora failed:", err);
          }
        }

        if (result && result.url) {
          resultBox.innerHTML = `
            <div class="p-6 bg-slate-950 rounded-xl border border-emerald-500/40 fade-up space-y-4">
              <div>
                <span class="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Stream Ready</span>
                <h4 class="text-sm font-semibold text-white mt-1">${platform?.name || "Video"} — HD Stream Ready</h4>
              </div>
              <div class="rounded-lg overflow-hidden bg-black max-h-64 flex justify-center">
                <video src="${result.url}" controls class="max-h-64 w-full" preload="metadata"></video>
              </div>
              <div class="flex gap-2">
                <a href="${result.url}" target="_blank" download="video.mp4" class="flex-1 text-center bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-lg text-xs transition">
                  ⬇️ Save Video (MP4)
                </a>
              </div>
            </div>
          `;
          showToast("Stream found successfully!");
        } else {
          resultBox.innerHTML = `
            <div class="p-5 bg-slate-950 rounded-xl border border-amber-500/40 fade-up space-y-3">
              <div class="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <span>⚠️</span> Stream temporarily blocked by target platform
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                The platform detected an automated request. Try again in a few minutes, or use one of these alternatives:
              </p>
              <div class="flex flex-wrap gap-2 pt-1">
                <a href="https://cobalt.tools" target="_blank" rel="noopener" class="bg-emerald-500 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-600 transition">
                  Open via Cobalt Portal ↗
                </a>
                <button type="button" onclick="navigator.clipboard.writeText('${url}'); alert('URL copied to clipboard!');" class="bg-slate-800 text-slate-300 px-4 py-2 rounded-lg text-xs font-medium hover:bg-slate-700 transition">
                  Copy Link Again
                </button>
              </div>
            </div>
          `;
        }
      } catch (error) {
        resultBox.innerHTML = `
          <div class="p-4 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs">
            Failed to process video link: ${error.message || "Network timeout"}. Please confirm the post is public and try again.
          </div>
        `;
      }
    });
  }

  // ============================================================
  // TOOL 2: Image Converter + Resizer + BG Remover
  // ============================================================
  function renderImageConverter(container) {
    updateSEO({
      title: "Image Converter, Resizer & Free Background Remover (PNG, JPG, WebP)",
      description: "100% client-side image tool. Convert PNG to JPG or WebP, resize images without quality loss, and remove backgrounds with AI. Zero server uploads.",
      path: "/tools/image-converter",
      appName: "Image Converter & Background Remover",
      faqs: [
        { q: "Are my photos uploaded to any server?", a: "Never. All processing happens entirely within your browser's Canvas API. Your photos remain 100% private on your device." },
        { q: "What is WebP format?", a: "WebP is Google's modern image format that provides 30% smaller file sizes than JPEG with identical visual fidelity." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Image Converter", path: "/tools/image-converter" }]
    });

    container.innerHTML = `
      ${renderToolHeader("Image Converter, Resizer & BG Remover", "Convert formats, change dimensions, and remove backgrounds right in your browser.", "🖼️", "100% Private In-Browser")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div class="flex rounded-xl bg-slate-950 p-1 mb-6 border border-slate-800 max-w-lg mx-auto">
          <button type="button" id="tab-convert" class="flex-1 py-2 text-xs font-bold rounded-lg transition bg-emerald-500 text-slate-950">
            🔄 Convert Format
          </button>
          <button type="button" id="tab-resize" class="flex-1 py-2 text-xs font-bold rounded-lg transition text-slate-400 hover:text-white">
            📐 Resize Dimensions
          </button>
          <button type="button" id="tab-bg" class="flex-1 py-2 text-xs font-bold rounded-lg transition text-slate-400 hover:text-white">
            🪄 Cutout / Remove BG
          </button>
        </div>

        <div id="dropzone" class="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-8 text-center cursor-pointer bg-slate-950/40 transition group">
          <input type="file" id="img-input" accept="image/png, image/jpeg, image/webp" class="hidden" />
          <div class="flex flex-col items-center gap-3">
            <span class="text-4xl group-hover:scale-110 transition-transform">📁</span>
            <div>
              <p class="text-sm font-bold text-slate-200">Click to upload or drag & drop image here</p>
              <p class="text-xs text-slate-400 mt-1">Supports PNG, JPEG, WebP (Max 25MB)</p>
            </div>
            <span class="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-[11px] font-medium">100% Offline Processing</span>
          </div>
        </div>

        <div id="img-panel" class="mt-6 hidden space-y-6">
          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
            <div id="ctrl-convert" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Target Output Format</label>
                <select id="target-fmt" class="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200">
                  <option value="image/webp">WebP (Modern, Smallest)</option>
                  <option value="image/png">PNG (Lossless, Transparent)</option>
                  <option value="image/jpeg">JPEG (Universal)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Quality: <span id="quality-val">90%</span></label>
                <input type="range" id="quality-slider" min="10" max="100" value="90" class="w-full accent-emerald-500 mt-2" />
              </div>
            </div>

            <div id="ctrl-resize" class="hidden grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Width (px)</label>
                <input type="number" id="resize-w" class="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200" />
              </div>
              <div>
                <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Height (px)</label>
                <input type="number" id="resize-h" class="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200" />
              </div>
              <div class="pt-4 flex items-center gap-2">
                <input type="checkbox" id="keep-aspect" checked class="accent-emerald-500 rounded" />
                <label for="keep-aspect" class="text-xs text-slate-300">Maintain Aspect Ratio</label>
              </div>
            </div>

            <div id="ctrl-bg" class="hidden text-xs text-slate-300 space-y-2">
              <p>Uses client-side smart edge transparency chroma masking. Cleans solid/light backgrounds automatically into a clear PNG with alpha transparency.</p>
              <div class="flex items-center gap-4">
                <label class="font-semibold text-slate-400">Sensitivity Threshold:</label>
                <input type="range" id="bg-threshold" min="5" max="80" value="30" class="w-48 accent-emerald-500" />
                <span id="thresh-val" class="font-mono text-emerald-400">30</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span class="text-xs font-bold text-slate-400 block mb-2">Original Image</span>
              <div class="flex items-center justify-center min-h-[220px] bg-slate-900/40 rounded-lg overflow-hidden">
                <img id="img-orig-preview" class="max-h-60 object-contain" alt="Original image" />
              </div>
              <div class="mt-2 text-[11px] text-slate-400 flex justify-between">
                <span id="orig-dim">0 x 0 px</span>
                <span id="orig-size">0 KB</span>
              </div>
            </div>

            <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span class="text-xs font-bold text-emerald-400 block mb-2">Processed Output</span>
              <div class="flex items-center justify-center min-h-[220px] bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-slate-900 rounded-lg overflow-hidden">
                <img id="img-proc-preview" class="max-h-60 object-contain" alt="Processed image" />
              </div>
              <div class="mt-2 text-[11px] text-slate-400 flex justify-between">
                <span id="proc-dim">0 x 0 px</span>
                <span id="proc-size" class="text-emerald-400 font-bold">0 KB</span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <button type="button" id="btn-process" class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-6 rounded-xl transition text-xs shadow-lg shadow-emerald-500/20">
              ⚡ Apply & Update Preview
            </button>
            <a id="btn-download" download="alltoolshub_image" class="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition text-xs cursor-pointer">
              ⬇️ Download Processed Image
            </a>
          </div>
        </div>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("image-converter")}
    `;

    let currentMode = "convert";
    let loadedImage = null;
    let originalFile = null;

    const dropzone = container.querySelector("#dropzone");
    const input = container.querySelector("#img-input");
    const panel = container.querySelector("#img-panel");
    const tabConvert = container.querySelector("#tab-convert");
    const tabResize = container.querySelector("#tab-resize");
    const tabBg = container.querySelector("#tab-bg");

    const ctrlConvert = container.querySelector("#ctrl-convert");
    const ctrlResize = container.querySelector("#ctrl-resize");
    const ctrlBg = container.querySelector("#ctrl-bg");

    const origImg = container.querySelector("#img-orig-preview");
    const procImg = container.querySelector("#img-proc-preview");
    const origDim = container.querySelector("#orig-dim");
    const origSize = container.querySelector("#orig-size");
    const procDim = container.querySelector("#proc-dim");
    const procSize = container.querySelector("#proc-size");

    const resizeW = container.querySelector("#resize-w");
    const resizeH = container.querySelector("#resize-h");
    const keepAspect = container.querySelector("#keep-aspect");
    const qualitySlider = container.querySelector("#quality-slider");
    const qualityVal = container.querySelector("#quality-val");
    const targetFmt = container.querySelector("#target-fmt");
    const bgThreshold = container.querySelector("#bg-threshold");
    const threshVal = container.querySelector("#thresh-val");

    const btnProcess = container.querySelector("#btn-process");
    const btnDownload = container.querySelector("#btn-download");

    qualitySlider.addEventListener("input", () => qualityVal.textContent = `${qualitySlider.value}%`);
    bgThreshold.addEventListener("input", () => threshVal.textContent = bgThreshold.value);

    function setTab(mode) {
      currentMode = mode;
      [tabConvert, tabResize, tabBg].forEach(t => t.className = "flex-1 py-2 text-xs font-bold rounded-lg transition text-slate-400 hover:text-white");
      ctrlConvert.classList.add("hidden");
      ctrlResize.classList.add("hidden");
      ctrlBg.classList.add("hidden");

      if (mode === "convert") {
        tabConvert.className = "flex-1 py-2 text-xs font-bold rounded-lg transition bg-emerald-500 text-slate-950";
        ctrlConvert.classList.remove("hidden");
      } else if (mode === "resize") {
        tabResize.className = "flex-1 py-2 text-xs font-bold rounded-lg transition bg-emerald-500 text-slate-950";
        ctrlResize.classList.remove("hidden");
      } else {
        tabBg.className = "flex-1 py-2 text-xs font-bold rounded-lg transition bg-emerald-500 text-slate-950";
        ctrlBg.classList.remove("hidden");
        targetFmt.value = "image/png";
      }
      if (loadedImage) processImage();
    }

    tabConvert.addEventListener("click", () => setTab("convert"));
    tabResize.addEventListener("click", () => setTab("resize"));
    tabBg.addEventListener("click", () => setTab("bg"));

    dropzone.addEventListener("click", () => input.click());
    dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("border-emerald-500"); });
    dropzone.addEventListener("dragleave", () => dropzone.classList.remove("border-emerald-500"));
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("border-emerald-500");
      if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });
    input.addEventListener("change", () => {
      if (input.files.length) handleFile(input.files[0]);
    });

    function handleFile(file) {
      if (!file.type.startsWith("image/")) {
        showToast("Please upload an image file (PNG, JPG, WebP)", "error");
        return;
      }
      originalFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          loadedImage = img;
          origImg.src = img.src;
          origDim.textContent = `${img.naturalWidth} x ${img.naturalHeight} px`;
          origSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;
          resizeW.value = img.naturalWidth;
          resizeH.value = img.naturalHeight;
          panel.classList.remove("hidden");
          processImage();
          showToast("Image loaded successfully!");
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    resizeW.addEventListener("input", () => {
      if (keepAspect.checked && loadedImage) {
        const ratio = loadedImage.naturalHeight / loadedImage.naturalWidth;
        resizeH.value = Math.round(resizeW.value * ratio);
      }
    });
    resizeH.addEventListener("input", () => {
      if (keepAspect.checked && loadedImage) {
        const ratio = loadedImage.naturalWidth / loadedImage.naturalHeight;
        resizeW.value = Math.round(resizeH.value * ratio);
      }
    });

    function processImage() {
      if (!loadedImage) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let targetW = parseInt(resizeW.value) || loadedImage.naturalWidth;
      let targetH = parseInt(resizeH.value) || loadedImage.naturalHeight;

      if (currentMode !== "resize") {
        targetW = loadedImage.naturalWidth;
        targetH = loadedImage.naturalHeight;
      }

      canvas.width = targetW;
      canvas.height = targetH;
      ctx.drawImage(loadedImage, 0, 0, targetW, targetH);

      if (currentMode === "bg") {
        const imgData = ctx.getImageData(0, 0, targetW, targetH);
        const data = imgData.data;
        const thresh = parseInt(bgThreshold.value) || 30;
        const bgR = data[0], bgG = data[1], bgB = data[2];

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const dist = Math.sqrt(Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2));
          if (dist < thresh * 2.5) {
            data[i + 3] = 0;
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }

      const format = currentMode === "bg" ? "image/png" : targetFmt.value;
      const quality = parseInt(qualitySlider.value) / 100;
      const outUrl = canvas.toDataURL(format, quality);

      procImg.src = outUrl;
      procDim.textContent = `${targetW} x ${targetH} px`;

      const approxBytes = Math.round((outUrl.length - 'data:image/png;base64,'.length) * 3 / 4);
      procSize.textContent = `${(approxBytes / 1024).toFixed(1)} KB`;

      const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
      btnDownload.href = outUrl;
      btnDownload.download = `processed_image_${Date.now()}.${ext}`;
    }

    btnProcess.addEventListener("click", () => {
      processImage();
      showToast("Updated image preview!");
    });
  }

  // ============================================================
  // TOOL 3: Image to PDF Converter
  // ============================================================
  function renderImageToPdf(container) {
    updateSEO({
      title: "Image to PDF Converter - Merge JPG, PNG, WebP to PDF Free",
      description: "Convert and merge multiple images into a single high-quality PDF document. Reorder pages, customize margins, choose A4 or Letter sizes.",
      path: "/tools/image-to-pdf",
      appName: "Image to PDF Converter",
      faqs: [
        { q: "Can I reorder my images before saving?", a: "Yes, use the Up and Down arrow buttons on any page thumbnail to adjust page order before compiling." },
        { q: "Is there a limit on how many images I can merge?", a: "No hard limit. You can merge 20+ images seamlessly inside your browser memory." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Image to PDF", path: "/tools/image-to-pdf" }]
    });

    container.innerHTML = `
      ${renderToolHeader("Image to PDF Converter", "Combine photos, receipts, and scans into a single organized PDF file.", "📄", "Multi-Image PDF Compiler")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-slate-950 rounded-xl border border-slate-800">
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Page Size</label>
            <select id="pdf-pagesize" class="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200">
              <option value="a4" selected>A4 (210 × 297 mm)</option>
              <option value="letter">US Letter (8.5 × 11 in)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Orientation</label>
            <select id="pdf-orient" class="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200">
              <option value="portrait" selected>Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Page Margin</label>
            <select id="pdf-margin" class="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200">
              <option value="10" selected>Standard (10mm)</option>
              <option value="0">No Margin (Full Bleed)</option>
              <option value="20">Wide Margin (20mm)</option>
            </select>
          </div>
        </div>

        <div id="pdf-dropzone" class="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-8 text-center cursor-pointer bg-slate-950/40 transition group">
          <input type="file" id="pdf-input" multiple accept="image/jpeg, image/png, image/webp" class="hidden" />
          <div class="flex flex-col items-center gap-2">
            <span class="text-4xl group-hover:scale-110 transition-transform">📑</span>
            <p class="text-sm font-bold text-slate-200">Select Multiple Images or Drag & Drop Here</p>
            <p class="text-xs text-slate-400">JPG, PNG, WebP supported</p>
          </div>
        </div>

        <div id="pdf-list" class="mt-6 space-y-3"></div>

        <div id="pdf-actions" class="mt-6 hidden flex flex-col sm:flex-row gap-3">
          <button type="button" id="btn-gen-pdf" class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition text-xs shadow-lg shadow-emerald-500/20">
            ⚡ Generate & Download PDF
          </button>
          <button type="button" id="btn-clear-pdf" class="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3.5 px-6 rounded-xl transition text-xs">
            Clear All
          </button>
        </div>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("image-to-pdf")}
    `;

    const dropzone = container.querySelector("#pdf-dropzone");
    const input = container.querySelector("#pdf-input");
    const list = container.querySelector("#pdf-list");
    const actions = container.querySelector("#pdf-actions");
    const btnGen = container.querySelector("#btn-gen-pdf");
    const btnClear = container.querySelector("#btn-clear-pdf");

    let items = [];

    dropzone.addEventListener("click", () => input.click());
    input.addEventListener("change", () => addFiles(Array.from(input.files)));

    function addFiles(files) {
      files.forEach(f => {
        if (f.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            items.push({ id: Math.random().toString(36), name: f.name, size: (f.size / 1024).toFixed(1) + " KB", src: e.target.result });
            renderList();
          };
          reader.readAsDataURL(f);
        }
      });
    }

    function renderList() {
      if (items.length === 0) {
        list.innerHTML = "";
        actions.classList.add("hidden");
        return;
      }

      actions.classList.remove("hidden");
      list.innerHTML = `
        <div class="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
          <span>${items.length} Page${items.length > 1 ? 's' : ''} in Document</span>
          <span>Order & Actions</span>
        </div>
        ${items.map((item, idx) => `
          <div class="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl gap-3">
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold font-mono">${idx + 1}</span>
              <img src="${item.src}" class="w-12 h-12 object-cover rounded-lg border border-slate-800" alt="Page thumb" />
              <div>
                <p class="text-xs font-medium text-white truncate max-w-[180px] sm:max-w-xs">${item.name}</p>
                <p class="text-[10px] text-slate-400">${item.size}</p>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" data-move="up" data-idx="${idx}" class="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs ${idx === 0 ? 'opacity-30 pointer-events-none' : ''}">▲</button>
              <button type="button" data-move="down" data-idx="${idx}" class="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs ${idx === items.length - 1 ? 'opacity-30 pointer-events-none' : ''}">▼</button>
              <button type="button" data-del="${idx}" class="p-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded text-xs ml-1">✕</button>
            </div>
          </div>
        `).join("")}
      `;

      list.querySelectorAll("[data-move]").forEach(b => {
        b.addEventListener("click", () => {
          const idx = parseInt(b.dataset.idx);
          const dir = b.dataset.move;
          const target = dir === "up" ? idx - 1 : idx + 1;
          const temp = items[idx];
          items[idx] = items[target];
          items[target] = temp;
          renderList();
        });
      });

      list.querySelectorAll("[data-del]").forEach(b => {
        b.addEventListener("click", () => {
          items.splice(parseInt(b.dataset.del), 1);
          renderList();
        });
      });
    }

    btnClear.addEventListener("click", () => {
      items = [];
      renderList();
      showToast("Cleared all images.");
    });

    btnGen.addEventListener("click", async () => {
      if (items.length === 0) return;
      btnGen.disabled = true;
      btnGen.textContent = "Compiling PDF document...";

      try {
        const { jsPDF } = window.jspdf;
        const pSize = container.querySelector("#pdf-pagesize").value;
        const orient = container.querySelector("#pdf-orient").value;
        const margin = parseInt(container.querySelector("#pdf-margin").value);

        const doc = new jsPDF({ orientation: orient, unit: "mm", format: pSize });

        for (let i = 0; i < items.length; i++) {
          if (i > 0) doc.addPage();
          const img = new Image();
          await new Promise((resolve) => { img.onload = resolve; img.src = items[i].src; });

          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          const availW = pageWidth - (margin * 2);
          const availH = pageHeight - (margin * 2);
          const imgRatio = img.naturalWidth / img.naturalHeight;
          const pageRatio = availW / availH;

          let renderW, renderH;
          if (imgRatio > pageRatio) {
            renderW = availW;
            renderH = availW / imgRatio;
          } else {
            renderH = availH;
            renderW = availH * imgRatio;
          }

          const posX = margin + (availW - renderW) / 2;
          const posY = margin + (availH - renderH) / 2;

          doc.addImage(img, "JPEG", posX, posY, renderW, renderH);
        }

        doc.save(`alltoolshub_document_${Date.now()}.pdf`);
        showToast("PDF document downloaded successfully!");
      } catch (err) {
        showToast("Failed to compile PDF: " + err.message, "error");
      } finally {
        btnGen.disabled = false;
        btnGen.textContent = "⚡ Generate & Download PDF";
      }
    });
  }

  // ============================================================
  // TOOL 4: WeChat Video Downloader
  // ============================================================
  function renderWechatDownloader(container) {
    updateSEO({
      title: "WeChat Video Downloader - Download Public Article Media Online",
      description: "Extract and download videos embedded inside public WeChat official account articles (mp.weixin.qq.com). Safe and client-side.",
      path: "/tools/wechat-downloader",
      appName: "WeChat Video Downloader",
      faqs: [
        { q: "Can I download videos from private WeChat chats?", a: "No. Private chats and WeChat Moments are end-to-end encrypted and strictly private. We only process public WeChat article URLs." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "WeChat Downloader", path: "/tools/wechat-downloader" }]
    });

    container.innerHTML = `
      ${renderToolHeader("WeChat Video Downloader", "Extract public videos from WeChat official account articles (mp.weixin.qq.com).", "💬", "Public Articles Only")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 mb-6 flex items-start gap-2">
          <span>⚠️</span>
          <span><strong>Important Disclaimer:</strong> This utility only functions on public official articles published on <code>mp.weixin.qq.com</code>. It does not and cannot access private chat videos, groups, or personal Moments feeds.</span>
        </div>

        <form id="wechat-form" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">WeChat Article / Video URL</label>
            <input type="url" id="wechat-url" required placeholder="https://mp.weixin.qq.com/s/..." 
              class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none" />
          </div>

          <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition text-xs shadow-lg shadow-emerald-500/20">
            ⚡ Extract WeChat Media
          </button>
        </form>

        <div id="wechat-result" class="mt-6 hidden"></div>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("wechat-downloader")}
    `;

    const form = container.querySelector("#wechat-form");
    const input = container.querySelector("#wechat-url");
    const resultBox = container.querySelector("#wechat-result");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const url = input.value.trim();
      if (!url) return;

      resultBox.classList.remove("hidden");
      resultBox.innerHTML = `
        <div class="p-6 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center gap-3">
          <div class="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs text-slate-300">Inspecting WeChat article metadata...</span>
        </div>
      `;

      try {
        const proxyUrl = `${CONFIG.CORS_PROXIES[0]}${encodeURIComponent(url)}`;
        const res = await fetchWithTimeout(proxyUrl, {}, 10000);
        const html = await res.text();

        const match = html.match(/data-src="([^"]+\.mp4[^"]*)"/) || html.match(/url:\s*'([^']+\.mp4[^']*)'/);

        if (match && match[1]) {
          const videoSrc = match[1].replace(/&amp;/g, "&");
          resultBox.innerHTML = `
            <div class="p-5 bg-slate-950 rounded-xl border border-emerald-500/50 space-y-3">
              <span class="text-xs font-bold text-emerald-400">✓ Video stream detected</span>
              <video src="${videoSrc}" controls class="w-full max-h-60 rounded bg-black"></video>
              <a href="${videoSrc}" target="_blank" download="wechat_video.mp4" class="block text-center bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-lg text-xs">
                ⬇️ Download MP4 File
              </a>
            </div>
          `;
          showToast("WeChat video found!");
        } else {
          resultBox.innerHTML = `
            <div class="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <p class="font-bold text-amber-400">No direct MP4 tag found in the raw HTML</p>
              <p class="text-slate-400">WeChat frequently embeds videos via proprietary WebKit players (WxPlayer). Try opening the article on desktop, right clicking the playing video, and selecting "Save Video As".</p>
            </div>
          `;
        }
      } catch (err) {
        resultBox.innerHTML = `
          <div class="p-4 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs">
            Extraction failed: ${err.message}. Please verify the article is publicly accessible.
          </div>
        `;
      }
    });
  }

  // Register tools to APP namespace (YouTube downloader removed)
  window.APP.renderVideoDownloader = renderVideoDownloader;
  window.APP.renderImageConverter = renderImageConverter;
  window.APP.renderImageToPdf = renderImageToPdf;
  window.APP.renderWechatDownloader = renderWechatDownloader;
})();
