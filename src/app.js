/**
 * AllToolsHub - Single-File SPA Application Logic
 * 100% Client-Side Processing, No Server Overhead, Zero API Keys
 */
(function () {
  "use strict";

  const CONFIG = {
    SITE_NAME: "AllToolsHub",
    BASE_URL: "https://alltoolshub.com",
    COBALT_API: "https://your-app.up.railway.app",
    COBALT_FALLBACK_APIS: [],
    TIKWM_API: "https://www.tikwm.com/api/",
    CORS_PROXIES: [
      "https://api.cors.lol/?url=",
      "https://corsfix.com/proxy?url=",
      "https://api.allorigins.win/raw?url="
    ],
    QR_API: "https://api.qrserver.com/v1/create-qr-code/",
    TIMEOUT_MS: 18000,
    CONTACT_EMAIL: "support@alltoolshub.com"
  };

  // Helper: timeout fetch with AbortController
  async function fetchWithTimeout(resource, options = {}, timeout = CONFIG.TIMEOUT_MS) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  }

  // Toast notification system
  function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = `fade-up px-4 py-3 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 pointer-events-auto border transition-all ${
      type === "error"
        ? "bg-rose-950 text-rose-200 border-rose-800"
        : "bg-slate-900 text-emerald-400 border-emerald-500/40"
    }`;
    toast.innerHTML = `<span>${type === "error" ? "⚠️" : "✓"}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Update SEO metadata & JSON-LD dynamically
  function updateSEO({ title, description, path, appName, faqs = [], breadcrumbs = [] }) {
    const fullTitle = `${title} | AllToolsHub`;
    document.title = fullTitle;

    const setMeta = (selector, content) => {
      let el = document.querySelector(selector);
      if (el) el.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', `${CONFIG.BASE_URL}/#${path}`);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `${CONFIG.BASE_URL}/#${path}`);

    // Update WebApplication schema
    const appScript = document.getElementById("json-ld-app");
    if (appScript) {
      if (appName) {
        appScript.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": appName,
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "All modern browsers",
          "description": description,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        });
      } else {
        appScript.textContent = "";
      }
    }

    // Update FAQPage schema
    const faqScript = document.getElementById("json-ld-faq");
    if (faqScript) {
      if (faqs.length > 0) {
        faqScript.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        });
      } else {
        faqScript.textContent = "";
      }
    }

    // Update BreadcrumbList schema
    const bcScript = document.getElementById("json-ld-breadcrumb");
    if (bcScript && breadcrumbs.length > 0) {
      bcScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((bc, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": bc.name,
          "item": `${CONFIG.BASE_URL}/#${bc.path}`
        }))
      });
    }
  }

  // Common Ad-Slot HTML renderer
  function renderAdSlot(slotName) {
    return `
      <div class="my-8 ad-slot w-full py-4 px-4 rounded-xl text-center bg-slate-900/60 border border-slate-800">
        <span class="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">Sponsored Banner (${slotName})</span>
        <div class="text-xs text-slate-400">Adsterra In-Feed Native / Banner Unit</div>
        <div class="text-[10px] text-slate-400 mt-1 font-mono">&lt;!-- Replace with Adsterra Code --&gt;</div>
      </div>
    `;
  }

  // Common Tool Header + Breadcrumb renderer
  function renderToolHeader(title, desc, icon, badge = "100% Free & Client-Side") {
    return `
      <div class="mb-6 fade-up">
        <div class="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <a href="#/" class="hover:text-emerald-400 transition">Home</a>
          <span>/</span>
          <span class="text-slate-300">Tools</span>
          <span>/</span>
          <span class="text-emerald-400 font-medium">${title}</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-3xl p-2.5 rounded-xl bg-slate-900 border border-slate-800">${icon}</span>
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">${title}</h1>
              <p class="text-xs sm:text-sm text-slate-400 mt-0.5">${desc}</p>
            </div>
          </div>
          <span class="inline-flex self-start sm:self-center px-3 py-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            ${badge}
          </span>
        </div>
      </div>
    `;
  }

  // Common FAQs component
  function renderFaqs(faqs) {
    return `
      <div class="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>❓</span> Frequently Asked Questions
        </h2>
        <div class="space-y-4">
          ${faqs.map(faq => `
            <details class="group bg-slate-950/60 border border-slate-800 rounded-xl p-4 transition-all">
              <summary class="font-semibold text-sm text-slate-200 cursor-pointer list-none flex justify-between items-center group-open:text-emerald-400">
                <span>${faq.q}</span>
                <span class="text-slate-400 group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <p class="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                ${faq.a}
              </p>
            </details>
          `).join("")}
        </div>
      </div>
    `;
  }

  // Common Related Tools component
  function renderRelatedTools(currentToolKey) {
    const list = [
      { key: "video-downloader", name: "All Video Downloader", icon: "🎬", path: "#/tools/video-downloader" },
      { key: "youtube-downloader", name: "YouTube MP4 & MP3", icon: "▶️", path: "#/tools/youtube-downloader" },
      { key: "image-converter", name: "Image Converter & BG Remover", icon: "🖼️", path: "#/tools/image-converter" },
      { key: "image-to-pdf", name: "Image to PDF Converter", icon: "📄", path: "#/tools/image-to-pdf" },
      { key: "birth-chart-calculator", name: "Birth Chart Calculator", icon: "✨", path: "#/tools/birth-chart-calculator" },
      { key: "paint-calculator", name: "Room Paint Calculator", icon: "🎨", path: "#/tools/paint-calculator" },
      { key: "age-calculator", name: "Age Calculator & Countdown", icon: "⏳", path: "#/tools/age-calculator" },
      { key: "password-generator", name: "Password Generator", icon: "🔐", path: "#/tools/password-generator" }
    ].filter(t => t.key !== currentToolKey).slice(0, 3);

    return `
      <div class="mt-10 border-t border-slate-800 pt-8">
        <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Related Free Web Utilities</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          ${list.map(tool => `
            <a href="${tool.path}" class="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 hover-lift text-slate-200">
              <span class="text-xl">${tool.icon}</span>
              <span class="text-xs font-semibold">${tool.name}</span>
            </a>
          `).join("")}
        </div>
      </div>
    `;
  }

  // Export functions to global scope for SPA rendering
  window.APP = {
    CONFIG,
    fetchWithTimeout,
    showToast,
    updateSEO,
    renderAdSlot,
    renderToolHeader,
    renderFaqs,
    renderRelatedTools
  };
})();
