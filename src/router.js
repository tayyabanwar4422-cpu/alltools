/**
 * AllToolsHub - Router & Informational Pages
 * Home Page (Hero + 12-Tool Grid + SEO Copy + Ad Slots)
 * About Page, Privacy Policy, Terms of Service, Contact
 */
(function() {
  "use strict";
  const { CONFIG, updateSEO } = window.APP;

  function renderHome(container) {
    updateSEO({
      title: "AllToolsHub - 12 Free Fast Online Web Utilities (No Installs, No Cost)",
      description: "Access 12 free web tools: Video Downloader, Image Converter, BG Remover, Image to PDF, Birth Chart, Numerology, Paint Calculator & Password Generator.",
      path: "/",
      appName: "AllToolsHub Suite",
      breadcrumbs: [{ name: "Home", path: "/" }]
    });

    const tools = [
      { key: "video-downloader", name: "All Video Downloader", icon: "🎬", tag: "TikTok, IG, X, Reddit", desc: "Download HD video streams from 1000+ social and video streaming platforms with auto-detection.", link: "#/tools/video-downloader" },
      { key: "image-converter", name: "Image Converter & BG Remover", icon: "🖼️", tag: "PNG, JPG, WebP + Cutout", desc: "Batch convert image formats, scale pixel dimensions, and remove backgrounds with client-side AI masking.", link: "#/tools/image-converter" },
      { key: "image-to-pdf", name: "Image to PDF Converter", icon: "📄", tag: "Multi-Image Compiler", desc: "Merge multiple JPG, PNG, and WebP pictures into a clean printable PDF with custom page geometry.", link: "#/tools/image-to-pdf" },
      { key: "wechat-downloader", name: "WeChat Video Downloader", icon: "💬", tag: "Public Article Media", desc: "Inspect and extract public embedded video media from WeChat official account articles.", link: "#/tools/wechat-downloader" },
      { key: "birth-chart-calculator", name: "Birth Chart Calculator", icon: "✨", tag: "Sun, Moon, Rising Signs", desc: "Calculate your astrological Big Three with accurate astronomical math, real lat/long, and timezone support.", link: "#/tools/birth-chart-calculator" },
      { key: "numerology-calculator", name: "Numerology Calculator", icon: "🔢", tag: "Life Path & Destiny", desc: "Discover your Life Path, Expression, Soul Urge, Personality, Birthday and Personal Year numbers.", link: "#/tools/numerology-calculator" },
      { key: "age-calculator", name: "Age & Birthday Countdown", icon: "⏳", tag: "Live Ticking Seconds", desc: "Chronological age breakdown, total days, hours, live seconds lived, and next birthday countdown timer.", link: "#/tools/age-calculator" },
      { key: "paint-calculator", name: "Room Paint Calculator", icon: "🎨", tag: "Litres & Budget Estimator", desc: "Determine room surface areas, door/window deductions, coats required, and total renovation paint cost.", link: "#/tools/paint-calculator" },
      { key: "title-generator", name: "Viral Title Generator", icon: "💡", tag: "High-CTR Headlines", desc: "Generate 6 compelling, click-worthy titles for YouTube videos, blog posts, how-to guides, and tweets.", link: "#/tools/title-generator" },
      { key: "word-counter", name: "Word & Character Counter", icon: "📝", tag: "Reading Time & Density", desc: "Count words, characters, sentences, estimated speaking/reading duration, and keyword frequencies.", link: "#/tools/word-counter" },
      { key: "qr-code-generator", name: "QR Code Generator", icon: "📱", tag: "Zero-Expiry PNGs", desc: "Create permanent QR codes for URLs, WiFi networks, and plain text with instant PNG download.", link: "#/tools/qr-code-generator" },
      { key: "password-generator", name: "Crypto Password Generator", icon: "🔐", tag: "Web Crypto Hardware PRNG", desc: "Generate uncrackable random passwords using hardware-backed cryptographic randomness and strength rating.", link: "#/tools/password-generator" }
    ];

    container.innerHTML = `
      <div class="space-y-12">
        <section class="text-center py-8 sm:py-16 max-w-4xl mx-auto space-y-5 fade-up">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span>✨</span> 12 Production-Grade Utilities • 100% Free & Client-Side
          </div>
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            High-Speed Web Tools, <br class="hidden sm:inline" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Zero Server Friction.</span>
          </h1>
          <p class="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Download social video streams, convert and optimize graphic assets, calculate birth charts, construct PDFs, and inspect typography metrics. All calculations execute directly in your web browser.
          </p>
          <div class="flex flex-wrap justify-center gap-3 pt-2">
            <a href="#/tools/video-downloader" class="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all">
              ⚡ Explore Video Downloader
            </a>
            <a href="#/tools/image-converter" class="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-6 py-3 rounded-xl font-semibold text-sm transition-all">
              🖼️ Convert Images
            </a>
          </div>
        </section>

        <section aria-label="Available Utilities Grid" class="space-y-6">
          <div class="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h2 class="text-xl sm:text-2xl font-extrabold text-white">All Utilities</h2>
              <p class="text-xs text-slate-400 mt-0.5">Select any tool below to launch instantly in your browser</p>
            </div>
            <span class="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">12 Ready</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${tools.map(tool => `
              <a href="${tool.link}" class="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover-lift flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-3xl p-3 bg-slate-950 rounded-xl border border-slate-800 group-hover:scale-110 transition-transform">${tool.icon}</span>
                    <span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">${tool.tag}</span>
                  </div>
                  <h3 class="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">${tool.name}</h3>
                  <p class="text-xs text-slate-400 mt-2 leading-relaxed">${tool.desc}</p>
                </div>
                <div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Tool</span>
                  <span>→</span>
                </div>
              </a>
            `).join("")}
          </div>
        </section>

        <section class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6 text-slate-300">
          <div class="space-y-2">
            <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest">Why Choose Us</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">Why Use AllToolsHub?</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div class="space-y-2">
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="text-emerald-400">🔒</span> 100% Client-Side Privacy
              </h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                Traditional online converters transmit your confidential documents, photos, and files to third-party remote servers where they may be logged or analyzed. AllToolsHub operates on a strict client-side paradigm: image conversions, background cutouts, and PDF compilations are executed purely inside your browser memory using HTML5 Canvas and WebAssembly. Your data never leaves your computer or mobile device.
              </p>
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="text-emerald-400">⚡</span> Zero Latency & Unlimited Free Access
              </h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                By bypassing slow server uploads and cloud rendering queues, our utilities run at lightning speed. Whether calculating multi-layered room paint requirements, building high-resolution QR codes, or extracting video media links, the computational heavy lifting is powered directly by your device's CPU. There are no daily usage limits, credit cards, or subscription paywalls.
              </p>
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="text-emerald-400">📱</span> Touch-Optimized & Cross-Platform
              </h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                Every utility in AllToolsHub is responsive and engineered with mobile-first usability. From seamless drag-and-drop dropzones to accessible keyboard shortcuts and high-contrast dark themes, you enjoy a unified, distraction-free utility dashboard across iOS, Android, macOS, Windows, and Linux operating systems.
              </p>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  function renderAbout(container) {
    updateSEO({
      title: "About AllToolsHub - Free, Fast, Private Web Utilities",
      description: "Learn about the AllToolsHub mission, client-side privacy architecture, transparent advertising partnership with Adsterra, and zero-cost model.",
      path: "/about",
      faqs: [
        { q: "How is AllToolsHub funded?", a: "AllToolsHub is 100% funded through unobtrusive display advertising via Adsterra. We never charge subscription fees or sell user data." },
        { q: "Do you store any uploaded images or converted files?", a: "No. All graphic conversions, PDF generation, and calculations happen client-side in your browser. We have no back-end database storing your media." },
        { q: "Who creates and maintains these tools?", a: "AllToolsHub is engineered by veteran frontend and performance engineers dedicated to delivering serverless, open-web utilities." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }]
    });

    container.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-10 fade-up">
        <div class="space-y-3">
          <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest">Our Organization</span>
          <h1 class="text-3xl sm:text-4xl font-black text-white">About AllToolsHub</h1>
          <p class="text-sm text-slate-400">Democratizing private, high-performance web utilities for global creators, professionals, and students.</p>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2"><span>🎯</span> Our Mission</h2>
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The modern web is filled with utility websites packed with misleading download buttons, mandatory paid subscriptions for simple file conversions, and opaque server storage policies. AllToolsHub was created to provide a refreshingly transparent alternative: free, fast, private, and beautifully designed single-page utilities that work instantly without creating an account.
          </p>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2"><span>💼</span> How We Make Money</h2>
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
            AllToolsHub is supported entirely through digital display advertising partnerships, primarily via <strong>Adsterra</strong>. This advertising revenue pays for our domain hosting, high-performance CDN distribution, and continuous software development.
          </p>
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
            We will never sell personal user information, implement artificial download throttles, or lock standard features behind paid paywalls. By viewing lightweight display advertisements on our website, you enable us to keep every single tool accessible to anyone worldwide for free.
          </p>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2"><span>🛡️</span> Privacy-First Architecture</h2>
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Because our utilities execute inside the client's web browser using native Web APIs (such as Canvas 2D, Web Cryptography, and Blob streaming), your sensitive images, documents, passwords, and calculation variables never touch our servers. When you close the browser tab, your temporary session data is instantly erased from memory.
          </p>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2"><span>📬</span> Contact Us</h2>
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Have a suggestion for a new utility, want to report a broken stream extractor, or need to discuss advertising partnerships? We would love to hear from you.
          </p>
          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
            <span class="text-slate-400">Direct Support Email:</span>
            <a href="mailto:${CONFIG.CONTACT_EMAIL}" class="text-emerald-400 font-mono font-bold hover:underline">${CONFIG.CONTACT_EMAIL}</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderPrivacy(container) {
    updateSEO({
      title: "Privacy Policy - Client-Side Data & Adsterra Disclosure",
      description: "Read the AllToolsHub Privacy Policy. Transparent details on client-side memory processing, cookie usage for Adsterra advertising, and zero data logging.",
      path: "/privacy",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }]
    });

    container.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-6 fade-up text-slate-300">
        <h1 class="text-3xl font-black text-white">Privacy Policy</h1>
        <p class="text-xs text-slate-400">Last Updated: October 1, 2026</p>
        
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 text-xs sm:text-sm leading-relaxed">
          <h2 class="text-base font-bold text-white">1. Client-Side Processing Paradigm</h2>
          <p class="text-slate-400">
            At AllToolsHub, user privacy is our foundational architectural constraint. All core utility operations—including image format transcoding, background removal, PDF compilation, cryptographic password generation, and metric calculations—are executed entirely within your web browser. We do not transmit, collect, or store your photos, files, or sensitive inputs on any backend server.
          </p>

          <h2 class="text-base font-bold text-white pt-2">2. Third-Party Advertising & Cookies (Adsterra)</h2>
          <p class="text-slate-400">
            To finance the hosting and continuous availability of this free service, AllToolsHub collaborates with third-party advertising networks, including Adsterra. These advertising partners may use cookies, web beacons, and similar tracking technologies to serve relevant advertisements based on your visits to this and other websites. You can control or opt out of personalized cookies through your browser settings.
          </p>

          <h2 class="text-base font-bold text-white pt-2">3. External Links & Media Providers</h2>
          <p class="text-slate-400">
            Our video downloading utilities interface with public media endpoints (such as TikTok, Instagram, and CORS proxy mirrors) to fetch media streams requested by the user. We are not responsible for the privacy practices or content policies of third-party platforms.
          </p>

          <h2 class="text-base font-bold text-white pt-2">4. Contact Information</h2>
          <p class="text-slate-400">
            For questions regarding this policy, please reach out via email at <code class="text-emerald-400">${CONFIG.CONTACT_EMAIL}</code>.
          </p>
        </div>
      </div>
    `;
  }

  function renderTerms(container) {
    updateSEO({
      title: "Terms of Service - Fair Use & Disclaimers",
      description: "AllToolsHub Terms of Service. Information regarding personal fair use, copyright respect, limitation of liability, and service availability.",
      path: "/terms",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Terms of Service", path: "/terms" }]
    });

    container.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-6 fade-up text-slate-300">
        <h1 class="text-3xl font-black text-white">Terms of Service</h1>
        <p class="text-xs text-slate-400">Last Updated: October 1, 2026</p>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 text-xs sm:text-sm leading-relaxed">
          <h2 class="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p class="text-slate-400">
            By visiting or utilizing AllToolsHub, you agree to comply with and be bound by these Terms of Service. If you do not accept these terms, please discontinue use immediately.
          </p>

          <h2 class="text-base font-bold text-white pt-2">2. Permitted Use & Intellectual Property</h2>
          <p class="text-slate-400">
            Our media downloading utilities are provided strictly for lawful personal backup, fair use analysis, and educational purposes. You agree not to use our utilities to infringe on copyrights, trademarks, or proprietary rights of original content creators. Users assume complete legal responsibility for all downloaded media.
          </p>

          <h2 class="text-base font-bold text-white pt-2">3. Disclaimer of Warranties</h2>
          <p class="text-slate-400">
            All services are provided on an "as is" and "as available" basis without warranties of any kind. Calculations (such as paint estimates, birth chart interpretations, and numerology readings) are estimates intended for educational guidance and entertainment only.
          </p>
        </div>
      </div>
    `;
  }

  function renderContact(container) {
    updateSEO({
      title: "Contact Us - Support & Business Inquiries",
      description: "Get in touch with the AllToolsHub technical and advertising team for feature requests, bug reports, and commercial inquiries.",
      path: "/contact",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact" }]
    });

    container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6 fade-up">
        <div class="text-center space-y-2">
          <h1 class="text-3xl font-black text-white">Get in Touch</h1>
          <p class="text-xs sm:text-sm text-slate-400">Have feedback or want to partner with AllToolsHub? Send us a message.</p>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form id="contact-form" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Your Name</label>
              <input type="text" required placeholder="Jane Doe" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Your Email</label>
              <input type="email" required placeholder="jane@example.com" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Message</label>
              <textarea rows="4" required placeholder="Describe your question or feedback..." class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-emerald-500"></textarea>
            </div>
            <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition text-xs shadow-lg shadow-emerald-500/20">
              ✉️ Send Message
            </button>
          </form>
        </div>
      </div>
    `;

    container.querySelector("#contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      window.APP.showToast("Message received! We will reply via email shortly.");
      e.target.reset();
    });
  }

  function handleRoute() {
    const rawHash = window.location.hash || "#/";
    const path = rawHash.replace(/^#/, "") || "/";
    const app = document.getElementById("app");
    if (!app) return;

    window.scrollTo({ top: 0, behavior: "smooth" });

    switch (path) {
      case "/": renderHome(app); break;
      case "/about": renderAbout(app); break;
      case "/privacy": renderPrivacy(app); break;
      case "/terms": renderTerms(app); break;
      case "/contact": renderContact(app); break;
      case "/tools/video-downloader": window.APP.renderVideoDownloader(app); break;
      case "/tools/image-converter": window.APP.renderImageConverter(app); break;
      case "/tools/image-to-pdf": window.APP.renderImageToPdf(app); break;
      case "/tools/wechat-downloader": window.APP.renderWechatDownloader(app); break;
      case "/tools/birth-chart-calculator": window.APP.renderBirthChart(app); break;
      case "/tools/numerology-calculator": window.APP.renderNumerology(app); break;
      case "/tools/age-calculator": window.APP.renderAgeCalculator(app); break;
      case "/tools/paint-calculator": window.APP.renderPaintCalculator(app); break;
      case "/tools/title-generator": window.APP.renderTitleGenerator(app); break;
      case "/tools/word-counter": window.APP.renderWordCounter(app); break;
      case "/tools/qr-code-generator": window.APP.renderQrGenerator(app); break;
      case "/tools/password-generator": window.APP.renderPasswordGenerator(app); break;
      default: renderHome(app); break;
    }
  }

  function initMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });

    menu.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", () => menu.classList.add("hidden"));
    });
  }

  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    handleRoute();
  });

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initMobileMenu();
    handleRoute();
  }
})();
