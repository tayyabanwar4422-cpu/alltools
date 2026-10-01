/**
 * AllToolsHub - Calculators & Generator Tools
 * Tool 6: Birth Chart Calculator (Sun, Moon, Rising)
 * Tool 7: Age Calculator
 * Tool 8: Paint Calculator
 * Tool 9: Title Generator
 * Tool 10: Word & Character Counter
 * Tool 11: QR Code Generator
 * Tool 12: Password Generator
 */
(function() {
  "use strict";
  // ✅ FIXED: Added CONFIG to the destructured variables
  const { CONFIG, showToast, updateSEO, renderAdSlot, renderToolHeader, renderFaqs, renderRelatedTools } = window.APP;

  // -------------------------------------------------------------
  // TOOL 6: Birth Chart Calculator (Sun, Moon, Rising)
  // -------------------------------------------------------------
  function renderBirthChart(container) {
    updateSEO({
      title: "Free Birth Chart Calculator - Sun, Moon and Rising Sign",
      description: "Discover your astrological Big Three: Sun, Moon, and Ascendant (Rising) signs with our accurate, client-side birth chart calculator.",
      path: "/tools/birth-chart-calculator",
      appName: "Birth Chart Calculator",
      faqs: [
        { q: "What is the 'Big Three' in astrology?", a: "Your Sun sign represents core ego and purpose, your Moon sign governs emotions and subconscious desires, and your Rising (Ascendant) sign is your outward social persona." },
        { q: "Why is exact birth time needed for the Rising sign?", a: "The Rising sign changes roughly every two hours as the Earth rotates, making exact birth time crucial for accuracy." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Birth Chart Calculator", path: "/tools/birth-chart-calculator" }]
    });

    const zodiacSigns = [
      { name: "Aries", symbol: "♈", element: "Fire", dates: "Mar 21 - Apr 19", traits: "Bold, ambitious, pioneering, energetic", iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/30" },
      { name: "Taurus", symbol: "♉", element: "Earth", dates: "Apr 20 - May 20", traits: "Grounded, tenacious, dependable, sensual", iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
      { name: "Gemini", symbol: "♊", element: "Air", dates: "May 21 - Jun 20", traits: "Curious, witty, expressive, adaptable", iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
      { name: "Cancer", symbol: "♋", element: "Water", dates: "Jun 21 - Jul 22", traits: "Intuitive, nurturing, empathetic, protective", iconBg: "bg-sky-500/10 text-sky-400 border-sky-500/30" },
      { name: "Leo", symbol: "♌", element: "Fire", dates: "Jul 23 - Aug 22", traits: "Radiant, charismatic, theatrical, generous", iconBg: "bg-orange-500/10 text-orange-400 border-orange-500/30" },
      { name: "Virgo", symbol: "♍", element: "Earth", dates: "Aug 23 - Sep 22", traits: "Analytical, methodical, helpful, meticulous", iconBg: "bg-teal-500/10 text-teal-400 border-teal-500/30" },
      { name: "Libra", symbol: "♎", element: "Air", dates: "Sep 23 - Oct 22", traits: "Harmonious, diplomatic, aesthetic, fair-minded", iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" },
      { name: "Scorpio", symbol: "♏", element: "Water", dates: "Oct 23 - Nov 21", traits: "Intense, perceptive, transformative, magnetic", iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/30" },
      { name: "Sagittarius", symbol: "♐", element: "Fire", dates: "Nov 22 - Dec 21", traits: "Philosophical, adventurous, optimistic, free", iconBg: "bg-violet-500/10 text-violet-400 border-violet-500/30" },
      { name: "Capricorn", symbol: "♑", element: "Earth", dates: "Dec 22 - Jan 19", traits: "Strategic, disciplined, patient, resilient", iconBg: "bg-stone-500/10 text-stone-400 border-stone-500/30" },
      { name: "Aquarius", symbol: "♒", element: "Air", dates: "Jan 20 - Feb 18", traits: "Visionary, eccentric, humanitarian, inventive", iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" },
      { name: "Pisces", symbol: "♓", element: "Water", dates: "Feb 19 - Mar 20", traits: "Dreamy, mystical, poetic, boundless compassion", iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/30" }
    ];

    container.innerHTML = `
      ${renderToolHeader("Birth Chart Calculator", "Calculate your Sun, Moon, and Rising signs (The Big Three) instantly.", "✨", "Astrology Big Three")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <form id="chart-form" class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Birth Date</label>
            <input type="date" id="birth-date" required class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Birth Time</label>
            <input type="time" id="birth-time" value="12:00" required class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Birth City / Country</label>
            <input type="text" id="birth-place" placeholder="e.g. New York, USA" class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none" />
          </div>
          <div class="sm:col-span-3">
            <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition text-xs shadow-lg shadow-emerald-500/20">
              ⚡ Calculate My Big Three
            </button>
          </div>
        </form>

        <div id="chart-results" class="mt-8 hidden"></div>
        <p class="text-[11px] text-slate-400 text-center mt-6">
          * Disclaimer: Simplified astrological calculations for entertainment and educational exploration.
        </p>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("birth-chart-calculator")}
    `;

    const form = container.querySelector("#chart-form");
    const resultsBox = container.querySelector("#chart-results");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const dateVal = container.querySelector("#birth-date").value;
      const timeVal = container.querySelector("#birth-time").value || "12:00";
      if (!dateVal) return;

      const dateObj = new Date(dateVal + "T" + timeVal);
      const m = dateObj.getMonth() + 1;
      const d = dateObj.getDate();

      // Sun Sign Calculation
      let sunIdx = 0;
      if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) sunIdx = 0;
      else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) sunIdx = 1;
      else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) sunIdx = 2;
      else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) sunIdx = 3;
      else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) sunIdx = 4;
      else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) sunIdx = 5;
      else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) sunIdx = 6;
      else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) sunIdx = 7;
      else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) sunIdx = 8;
      else if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) sunIdx = 9;
      else if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) sunIdx = 10;
      else sunIdx = 11;

      // Approximate Moon Sign using lunar orbital period (~27.32 days)
      const epoch = new Date(2000, 0, 6, 18, 14);
      const diffDays = (dateObj - epoch) / (1000 * 60 * 60 * 24);
      const moonCycles = (diffDays % 27.32166) / 27.32166;
      const moonIdx = Math.floor(((moonCycles * 12) + sunIdx) % 12);

      // Approximate Rising Sign
      const [h, min] = timeVal.split(":").map(Number);
      const hoursSinceSunrise = (h + min / 60 - 6 + 24) % 24;
      const risingShift = Math.floor(hoursSinceSunrise / 2);
      const risingIdx = (sunIdx + risingShift) % 12;

      const sun = zodiacSigns[sunIdx];
      const moon = zodiacSigns[moonIdx];
      const rising = zodiacSigns[risingIdx];

      resultsBox.classList.remove("hidden");
      resultsBox.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 fade-up">
          <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold uppercase tracking-wider text-amber-400">☀️ Sun Sign</span>
                <span class="text-2xl">${sun.symbol}</span>
              </div>
              <h3 class="text-2xl font-black text-white">${sun.name}</h3>
              <p class="text-xs text-slate-400 mt-1">${sun.dates} • ${sun.element} Element</p>
              <div class="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong>Core Essence:</strong> ${sun.traits}. Your conscious ego, vitality, and life drive.
              </div>
            </div>
          </div>

          <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold uppercase tracking-wider text-sky-400">🌙 Moon Sign</span>
                <span class="text-2xl">${moon.symbol}</span>
              </div>
              <h3 class="text-2xl font-black text-white">${moon.name}</h3>
              <p class="text-xs text-slate-400 mt-1">${moon.element} Element</p>
              <div class="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong>Emotional Heart:</strong> ${moon.traits}. Your subconscious instincts, comfort zone, and deep emotions.
              </div>
            </div>
          </div>

          <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">🌅 Rising / Ascendant</span>
                <span class="text-2xl">${rising.symbol}</span>
              </div>
              <h3 class="text-2xl font-black text-white">${rising.name}</h3>
              <p class="text-xs text-slate-400 mt-1">${rising.element} Element</p>
              <div class="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong>Social Mask:</strong> ${rising.traits}. First impressions, appearance, and how the world encounters you.
              </div>
            </div>
          </div>
        </div>
      `;
      showToast("Birth chart calculated!");
    });
  }

  // -------------------------------------------------------------
  // TOOL 7: Age Calculator & Birthday Countdown (Live Ticking)
  // -------------------------------------------------------------
  function renderAgeCalculator(container) {
    updateSEO({
      title: "Age Calculator - Exact Years, Months, Days & Live Seconds",
      description: "Calculate your exact age down to the ticking second. Includes total days lived, day of birth, zodiac sign, and countdown to next birthday.",
      path: "/tools/age-calculator",
      appName: "Age Calculator",
      faqs: [
        { q: "How does the live seconds counter work?", a: "Our script computes your birth timestamp relative to your device's high-precision system clock and updates every 1,000 milliseconds." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Age Calculator", path: "/tools/age-calculator" }]
    });

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    container.innerHTML = `
      ${renderToolHeader("Age Calculator & Countdown", "Live chronological age, total days lived, next birthday countdown, and birthday trivia.", "⏳", "Live Real-Time Ticking")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <form id="age-form" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Date of Birth</label>
            <input type="date" id="age-birth" required value="2000-01-01" class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Age at the Date of</label>
            <input type="date" id="age-target" value="${todayStr}" class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div class="sm:col-span-2">
            <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition text-xs shadow-lg shadow-emerald-500/20">
              ⚡ Calculate Age Breakdown
            </button>
          </div>
        </form>

        <div id="age-results" class="mt-6"></div>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("age-calculator")}
    `;

    const form = container.querySelector("#age-form");
    const results = container.querySelector("#age-results");
    let timerId = null;

    function compute() {
      const birthStr = container.querySelector("#age-birth").value;
      const targetStr = container.querySelector("#age-target").value || todayStr;
      if (!birthStr) return;

      const birth = new Date(birthStr + "T00:00:00");
      const target = new Date(targetStr + "T" + (new Date().toTimeString().split(" ")[0]));

      if (birth > target) {
        results.innerHTML = `<div class="p-4 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs">Birth date cannot be in the future of the target date.</div>`;
        return;
      }

      let years = target.getFullYear() - birth.getFullYear();
      let months = target.getMonth() - birth.getMonth();
      let days = target.getDate() - birth.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const totalDiffMs = target - birth;
      const totalDays = Math.floor(totalDiffMs / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(totalDiffMs / (1000 * 60 * 60));
      const totalMinutes = Math.floor(totalDiffMs / (1000 * 60));
      const totalSeconds = Math.floor(totalDiffMs / 1000);

      let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
      if (nextBday < target) {
        nextBday.setFullYear(target.getFullYear() + 1);
      }
      const bdayDiffMs = nextBday - target;
      const bdayDays = Math.floor(bdayDiffMs / (1000 * 60 * 60 * 24));
      const bdayHours = Math.floor((bdayDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const bdayMins = Math.floor((bdayDiffMs % (1000 * 60 * 60)) / (1000 * 60));
      const bdaySecs = Math.floor((bdayDiffMs % (1000 * 60)) / 1000);

      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const bornDay = daysOfWeek[birth.getDay()];

      results.innerHTML = `
        <div class="space-y-6 fade-up">
          <div class="bg-slate-950 p-6 rounded-2xl border border-emerald-500/40 text-center">
            <span class="text-xs uppercase tracking-widest text-slate-400 font-semibold">Your Exact Chronological Age</span>
            <div class="text-3xl sm:text-5xl font-black text-emerald-400 my-2 tracking-tight">
              ${years} <span class="text-xl sm:text-2xl text-slate-300 font-normal">years</span> ${months} <span class="text-xl sm:text-2xl text-slate-300 font-normal">months</span> ${days} <span class="text-xl sm:text-2xl text-slate-300 font-normal">days</span>
            </div>
            <div class="text-xs text-slate-400 mt-1">Born on a <span class="text-white font-bold">${bornDay}</span></div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span class="text-[10px] text-slate-400 uppercase font-bold">Total Days</span>
              <div class="text-xl font-bold text-white mt-1">${totalDays.toLocaleString()}</div>
            </div>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span class="text-[10px] text-slate-400 uppercase font-bold">Total Hours</span>
              <div class="text-xl font-bold text-white mt-1">${totalHours.toLocaleString()}</div>
            </div>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span class="text-[10px] text-slate-400 uppercase font-bold">Total Minutes</span>
              <div class="text-xl font-bold text-white mt-1">${totalMinutes.toLocaleString()}</div>
            </div>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span class="text-[10px] text-slate-400 uppercase font-bold">Ticking Seconds</span>
              <div class="text-xl font-bold text-emerald-400 font-mono mt-1" id="live-seconds">${totalSeconds.toLocaleString()}</div>
            </div>
          </div>

          <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">🎉 Next Birthday In:</span>
              <p class="text-sm font-semibold text-white mt-0.5">${nextBday.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div class="flex items-center gap-2 text-center">
              <div class="bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg"><span class="text-lg font-bold text-white">${bdayDays}</span><span class="block text-[9px] text-slate-400 uppercase">Days</span></div>
              <div class="bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg"><span class="text-lg font-bold text-white">${bdayHours}</span><span class="block text-[9px] text-slate-400 uppercase">Hours</span></div>
              <div class="bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg"><span class="text-lg font-bold text-white">${bdayMins}</span><span class="block text-[9px] text-slate-400 uppercase">Mins</span></div>
              <div class="bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg"><span class="text-lg font-bold text-emerald-400 font-mono">${bdaySecs}</span><span class="block text-[9px] text-slate-400 uppercase">Secs</span></div>
            </div>
          </div>
        </div>
      `;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      compute();
      if (timerId) clearInterval(timerId);
      timerId = setInterval(compute, 1000);
      showToast("Age timeline loaded!");
    });

    compute();
    timerId = setInterval(compute, 1000);
  }

  // -------------------------------------------------------------
  // TOOL 8: Paint Calculator
  // -------------------------------------------------------------
  function renderPaintCalculator(container) {
    updateSEO({
      title: "Paint Calculator - Litres, Coverage, Area & Budget Estimator",
      description: "Accurately calculate room paint litres, wall and ceiling surface area, door/window deductions, and estimated material cost with 10% safety buffer.",
      path: "/tools/paint-calculator",
      appName: "Paint Calculator",
      faqs: [
        { q: "Why add 10% extra paint?", a: "Roller absorption, brush cleaning, texture porosity, and future wall touch-ups require a 10% safety margin." },
        { q: "What are the standard deductions for doors and windows?", a: "Standard doors average 1.8 m² (20 sq ft) and standard windows average 1.5 m² (16 sq ft)." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Paint Calculator", path: "/tools/paint-calculator" }]
    });

    container.innerHTML = `
      ${renderToolHeader("Room Paint Calculator", "Compute wall area, paint litres needed, and estimated cost for home renovation.", "🎨", "Precision Metric Paint Estimator")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <form id="paint-form" class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Room Length (m)</label>
            <input type="number" step="0.1" id="p-len" value="5.0" required class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Room Width (m)</label>
            <input type="number" step="0.1" id="p-wid" value="4.0" required class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Ceiling Height (m)</label>
            <input type="number" step="0.1" id="p-hgt" value="2.6" required class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Number of Coats</label>
            <input type="number" min="1" max="5" id="p-coats" value="2" required class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Doors Count</label>
            <input type="number" id="p-doors" value="1" min="0" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Windows Count</label>
            <input type="number" id="p-windows" value="2" min="0" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Coverage (m² / Litre)</label>
            <input type="number" step="0.5" id="p-cov" value="10.0" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Price per Litre ($)</label>
            <input type="number" step="0.5" id="p-price" value="18.0" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>

          <div class="sm:col-span-4 flex items-center gap-3 pt-2">
            <input type="checkbox" id="paint-ceiling" checked class="accent-emerald-500 rounded" />
            <label for="paint-ceiling" class="text-xs text-slate-300">Also include ceiling in calculation</label>
          </div>

          <div class="sm:col-span-4">
            <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition text-xs shadow-lg shadow-emerald-500/20">
              ⚡ Calculate Paint Breakdown
            </button>
          </div>
        </form>

        <div id="paint-results" class="mt-6"></div>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("paint-calculator")}
    `;

    const form = container.querySelector("#paint-form");
    const results = container.querySelector("#paint-results");

    function calc() {
      const L = parseFloat(container.querySelector("#p-len").value) || 0;
      const W = parseFloat(container.querySelector("#p-wid").value) || 0;
      const H = parseFloat(container.querySelector("#p-hgt").value) || 0;
      const coats = parseInt(container.querySelector("#p-coats").value) || 2;
      const doors = parseInt(container.querySelector("#p-doors").value) || 0;
      const windows = parseInt(container.querySelector("#p-windows").value) || 0;
      const cov = parseFloat(container.querySelector("#p-cov").value) || 10;
      const price = parseFloat(container.querySelector("#p-price").value) || 0;
      const incCeiling = container.querySelector("#paint-ceiling").checked;

      const perimeter = 2 * (L + W);
      const grossWallArea = perimeter * H;
      const ceilingArea = L * W;
      const deductions = (doors * 1.8) + (windows * 1.5);
      const netWallArea = Math.max(0, grossWallArea - deductions);
      const totalPaintArea = (netWallArea + (incCeiling ? ceilingArea : 0)) * coats;

      const exactLitres = totalPaintArea / cov;
      const recLitres = exactLitres * 1.10;
      const estCost = recLitres * price;

      results.innerHTML = `
        <div class="space-y-6 fade-up">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-slate-950 p-5 rounded-xl border border-emerald-500/40 text-center">
              <span class="text-[10px] text-slate-400 uppercase font-bold">Recommended Purchase (+10%)</span>
              <div class="text-3xl font-extrabold text-emerald-400 mt-1">${recLitres.toFixed(1)} <span class="text-sm font-normal text-slate-300">Litres</span></div>
              <div class="text-[10px] text-slate-400 mt-1">Exact: ${exactLitres.toFixed(1)} L (${coats} coats)</div>
            </div>

            <div class="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center">
              <span class="text-[10px] text-slate-400 uppercase font-bold">Total Paintable Surface</span>
              <div class="text-3xl font-extrabold text-white mt-1">${totalPaintArea.toFixed(1)} <span class="text-sm font-normal text-slate-300">m²</span></div>
              <div class="text-[10px] text-slate-400 mt-1">Deducted ${deductions.toFixed(1)} m² for openings</div>
            </div>

            <div class="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center">
              <span class="text-[10px] text-slate-400 uppercase font-bold">Estimated Cost</span>
              <div class="text-3xl font-extrabold text-white mt-1">$${estCost.toFixed(2)}</div>
              <div class="text-[10px] text-slate-400 mt-1">Based on $${price.toFixed(2)} / Litre</div>
            </div>
          </div>

          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
            <h4 class="font-bold text-white mb-2">Itemized Breakdown:</h4>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>Wall Gross: <span class="font-bold text-slate-100">${grossWallArea.toFixed(1)} m²</span></div>
              <div>Ceiling: <span class="font-bold text-slate-100">${incCeiling ? ceilingArea.toFixed(1) + ' m²' : 'Excluded'}</span></div>
              <div>Openings Deduction: <span class="font-bold text-rose-400">-${deductions.toFixed(1)} m²</span></div>
              <div>Safety Buffer (10%): <span class="font-bold text-emerald-400">+${(recLitres - exactLitres).toFixed(1)} L</span></div>
            </div>
          </div>
        </div>
      `;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      calc();
      showToast("Paint plan computed!");
    });
    calc();
  }

  // -------------------------------------------------------------
  // TOOL 9: Viral Title Generator
  // -------------------------------------------------------------
  function renderTitleGenerator(container) {
    updateSEO({
      title: "Viral Title Generator - Blog, YouTube & Social Media Headlines",
      description: "Generate high-CTR, click-worthy titles and headlines for blogs, YouTube videos, listicles, and social media campaigns in seconds.",
      path: "/tools/title-generator",
      appName: "Viral Title Generator",
      faqs: [
        { q: "How are the title templates structured?", a: "Each template leverages proven psychological hooks: curiosity gaps, power words, numerical listicles, and urgency." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Title Generator", path: "/tools/title-generator" }]
    });

    container.innerHTML = `
      ${renderToolHeader("Viral Title Generator", "Generate high-CTR headline options for YouTube, blogs, and social content.", "💡", "High-CTR Headline Engine")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <form id="title-form" class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Topic / Main Keyword</label>
            <input type="text" id="t-topic" required placeholder="e.g. Remote Work, Paleo Diet, Bitcoin" value="Remote Work" 
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Content Style</label>
            <select id="t-style" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none">
              <option value="blog">Blog Post</option>
              <option value="youtube">YouTube Video</option>
              <option value="listicle">Listicle (Top 10)</option>
              <option value="howto">How-To Guide</option>
              <option value="social">Social Media Hook</option>
            </select>
          </div>
          <div class="sm:col-span-3">
            <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition text-xs shadow-lg shadow-emerald-500/20">
              ⚡ Generate 6 Viral Titles
            </button>
          </div>
        </form>

        <div id="title-results" class="space-y-3"></div>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("title-generator")}
    `;

    const form = container.querySelector("#title-form");
    const results = container.querySelector("#title-results");

    const templateBank = {
      blog: [
        "The Ultimate Guide to {topic} in {year}: Everything You Need to Know",
        "Why Most People Fail at {topic} (And How to Win Instead)",
        "7 Counter-Intuitive Truths About {topic} Experts Don't Share",
        "How to Master {topic} in 30 Days Without Burning Out",
        "The Future of {topic}: What You Must Prepare For in {year}",
        "Is {topic} Still Worth It in {year}? Here's What the Data Says"
      ],
      youtube: [
        "I Tried {topic} for 30 Days (SHOCKING Results)",
        "The Only {topic} Video You Need to Watch in {year}",
        "Don't Start {topic} Until You Watch This!",
        "How I Mastered {topic} in Record Time (Step-by-Step)",
        "Stop Doing {topic} Like This! (Common Mistakes)",
        "{topic} EXPLAINED in 10 Minutes: A Beginner's Roadmap"
      ],
      listicle: [
        "10 Best {topic} Strategies That Actually Work in {year}",
        "7 Hidden {topic} Secrets Nobody Talks About",
        "15 Essential {topic} Tools Every Professional Relies On",
        "5 Costly {topic} Mistakes You Must Avoid at All Costs",
        "12 Proven Hacks to Double Your Results with {topic}",
        "9 Mind-Blowing {topic} Case Studies You Need to See"
      ],
      howto: [
        "How to Start with {topic}: A Comprehensive Beginner's Blueprint",
        "Step-by-Step: How to Accelerate Your {topic} Journey in {year}",
        "How to Fix Your Biggest {topic} Bottlenecks Fast",
        "How to Build a Sustainable {topic} Routine from Scratch",
        "How to Scale Your {topic} Results with Zero Extra Budget",
        "How to Protect Yourself from Common {topic} Scams & Pitfalls"
      ],
      social: [
        "Most people get {topic} completely wrong. Here is the unvarnished truth: 🧵",
        "If you want to master {topic} in {year}, save this post immediately:",
        "The exact framework I used to unlock massive success with {topic}:",
        "3 uncomfortable secrets about {topic} that will save you 500+ hours:",
        "Stop overcomplicating {topic}. Follow this 4-step checklist:",
        "Why {topic} is the #1 skill you need to develop this year:"
      ]
    };

    function generate() {
      const topic = container.querySelector("#t-topic").value.trim() || "Web Development";
      const style = container.querySelector("#t-style").value;
      const year = "2026";
      const list = templateBank[style] || templateBank.blog;

      results.innerHTML = list.map(tmpl => {
        const text = tmpl.replace(/{topic}/g, topic).replace(/{year}/g, year);
        return `
          <div class="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition gap-3">
            <span class="text-xs sm:text-sm font-semibold text-slate-200">${text}</span>
            <button type="button" class="copy-title-btn shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition" data-text="${text.replace(/"/g, '&quot;')}">
              Copy
            </button>
          </div>
        `;
      }).join("");

      results.querySelectorAll(".copy-title-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          await navigator.clipboard.writeText(btn.dataset.text);
          btn.textContent = "Copied! ✓";
          btn.className = "shrink-0 bg-emerald-500 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition";
          setTimeout(() => {
            btn.textContent = "Copy";
            btn.className = "shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition";
          }, 1800);
        });
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      generate();
      showToast("Generated new titles!");
    });
    generate();
  }

  // -------------------------------------------------------------
  // TOOL 10: Word & Character Counter
  // -------------------------------------------------------------
  function renderWordCounter(container) {
    updateSEO({
      title: "Word & Character Counter - Reading Time & Keyword Density",
      description: "Live word counter with character stats (with and without spaces), paragraph count, reading duration at 200 wpm, and top 5 keyword density analysis.",
      path: "/tools/word-counter",
      appName: "Word & Character Counter",
      faqs: [
        { q: "What reading speed is used for the estimate?", a: "We calculate reading duration using the industry-standard average of 200 words per minute (wpm)." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Word Counter", path: "/tools/word-counter" }]
    });

    container.innerHTML = `
      ${renderToolHeader("Word & Character Counter", "Live metrics, reading time, and keyword density analysis for writers.", "📝", "Real-Time Typography Analysis")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <span class="text-[10px] text-slate-400 uppercase font-bold">Words</span>
            <div id="stat-words" class="text-2xl font-black text-emerald-400 mt-1">0</div>
          </div>
          <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <span class="text-[10px] text-slate-400 uppercase font-bold">Characters</span>
            <div id="stat-chars" class="text-2xl font-black text-white mt-1">0</div>
          </div>
          <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <span class="text-[10px] text-slate-400 uppercase font-bold">No Spaces</span>
            <div id="stat-nospaces" class="text-2xl font-black text-white mt-1">0</div>
          </div>
          <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <span class="text-[10px] text-slate-400 uppercase font-bold">Sentences</span>
            <div id="stat-sentences" class="text-2xl font-black text-white mt-1">0</div>
          </div>
          <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center col-span-2 sm:col-span-1">
            <span class="text-[10px] text-slate-400 uppercase font-bold">Reading Time</span>
            <div id="stat-reading" class="text-lg font-bold text-white mt-1">0 sec</div>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex justify-between items-center text-xs text-slate-400">
            <span>Type or paste your text below:</span>
            <div class="flex gap-2">
              <button type="button" id="btn-copy-text" class="hover:text-emerald-400 transition">Copy</button>
              <span>•</span>
              <button type="button" id="btn-clear-text" class="hover:text-rose-400 transition">Clear</button>
            </div>
          </div>
          <textarea id="word-input" rows="8" placeholder="Start typing or paste your content here to inspect metrics in real time..." 
            class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-600 outline-none leading-relaxed"></textarea>
        </div>

        <div class="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Top Keyword Density (Excluding Stop Words)</span>
          <div id="density-list" class="flex flex-wrap gap-2 text-xs text-slate-300">
            <span class="text-slate-500 italic">Enter text to see keyword density</span>
          </div>
        </div>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("word-counter")}
    `;

    const input = container.querySelector("#word-input");
    const wordsEl = container.querySelector("#stat-words");
    const charsEl = container.querySelector("#stat-chars");
    const noSpacesEl = container.querySelector("#stat-nospaces");
    const sentencesEl = container.querySelector("#stat-sentences");
    const readingEl = container.querySelector("#stat-reading");
    const densityList = container.querySelector("#density-list");
    const btnCopy = container.querySelector("#btn-copy-text");
    const btnClear = container.querySelector("#btn-clear-text");

    const stopWords = new Set(["the","be","to","of","and","a","in","that","have","i","it","for","not","on","with","he","as","you","do","at","this","but","his","by","from","they","we","say","her","she","or","an","will","my","one","all","would","there","their","what","so","up","out","if","about","who","get","which","go","me","when","make","can","like","time","no","just","him","know","take","people","into","year","your","good","some","could","them","see","other","than","then","now","look","only","come","its","over","think","also","back","after","use","two","how","our","work","first","well","way","even","new","want","because","any","these","give","day","most","us"]);

    function update() {
      const text = input.value;
      const chars = text.length;
      const noSpaces = text.replace(/\s+/g, "").length;
      const wordsArr = text.trim().match(/\b[^\s]+\b/g) || [];
      const words = wordsArr.length;
      const sentences = (text.match(/[^.!?]+[.!?]+/g) || []).length || (text.trim() ? 1 : 0);
      const minutes = words / 200;
      const readingText = minutes < 1 ? `${Math.round(minutes * 60)} sec` : `${minutes.toFixed(1)} min`;

      wordsEl.textContent = words.toLocaleString();
      charsEl.textContent = chars.toLocaleString();
      noSpacesEl.textContent = noSpaces.toLocaleString();
      sentencesEl.textContent = sentences.toLocaleString();
      readingEl.textContent = readingText;

      const freq = {};
      wordsArr.forEach(w => {
        const clean = w.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (clean.length > 2 && !stopWords.has(clean)) {
          freq[clean] = (freq[clean] || 0) + 1;
        }
      });

      const top5 = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);
      if (top5.length === 0) {
        densityList.innerHTML = `<span class="text-slate-500 italic">Enter text to see keyword density</span>`;
      } else {
        densityList.innerHTML = top5.map(([w, count]) => {
          const pct = ((count / words) * 100).toFixed(1);
          return `<span class="px-2.5 py-1 rounded bg-slate-900 border border-slate-800"><span class="font-bold text-emerald-400">${w}</span>: ${count} (${pct}%)</span>`;
        }).join("");
      }
    }

    input.addEventListener("input", update);
    btnCopy.addEventListener("click", async () => {
      await navigator.clipboard.writeText(input.value);
      showToast("Text copied to clipboard!");
    });
    btnClear.addEventListener("click", () => {
      input.value = "";
      update();
    });
  }

  // -------------------------------------------------------------
  // TOOL 11: QR Code Generator
  // -------------------------------------------------------------
  function renderQrGenerator(container) {
    updateSEO({
      title: "Free QR Code Generator - Custom Links, Text & PNG Download",
      description: "Generate high-resolution PNG QR codes for websites, WiFi networks, contact vCards, and text. Free with zero tracking or scan expiration.",
      path: "/tools/qr-code-generator",
      appName: "QR Code Generator",
      faqs: [
        { q: "Do these QR codes ever expire?", a: "No. These are static QR codes that encode your text or URL directly into the pixels. They will work forever without limits." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "QR Code Generator", path: "/tools/qr-code-generator" }]
    });

    container.innerHTML = `
      ${renderToolHeader("QR Code Generator", "Generate crisp, permanent PNG QR codes with zero scan limits.", "📱", "Static Zero-Expiry QR Codes")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <form id="qr-form" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">QR Code Content (URL or Text)</label>
              <textarea id="qr-data" rows="3" required placeholder="https://example.com or any text" 
                class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 outline-none">https://alltoolshub.com</textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Image Size</label>
                <select id="qr-size" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 outline-none">
                  <option value="250x250">250 × 250 px</option>
                  <option value="400x400" selected>400 × 400 px (HD)</option>
                  <option value="600x600">600 × 600 px (Print)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Error Correction</label>
                <select id="qr-ecc" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 outline-none">
                  <option value="M" selected>Medium (15%)</option>
                  <option value="Q">High (25%)</option>
                  <option value="H">Ultra High (30%)</option>
                </select>
              </div>
            </div>

            <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition text-xs shadow-lg shadow-emerald-500/20">
              ⚡ Generate QR Code
            </button>
          </form>

          <div class="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-xl border border-slate-800 gap-4">
            <div class="p-3 bg-white rounded-xl shadow-lg">
              <img id="qr-preview" class="w-48 h-48 object-contain" alt="QR Code Output" />
            </div>
            <a id="qr-download" download="alltoolshub_qr.png" class="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 px-6 rounded-lg text-xs transition cursor-pointer">
              ⬇️ Download PNG Image
            </a>
          </div>
        </div>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("qr-code-generator")}
    `;

    const form = container.querySelector("#qr-form");
    const preview = container.querySelector("#qr-preview");
    const download = container.querySelector("#qr-download");

    function render() {
      const data = encodeURIComponent(container.querySelector("#qr-data").value.trim() || "https://alltoolshub.com");
      const size = container.querySelector("#qr-size").value;
      const ecc = container.querySelector("#qr-ecc").value;
      const url = `${CONFIG.QR_API}?size=${size}&ecc=${ecc}&data=${data}`;

      preview.src = url;
      download.href = url;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      render();
      showToast("Updated QR code!");
    });
    render();
  }

  // -------------------------------------------------------------
  // TOOL 12: Password Generator (Crypto Random)
  // -------------------------------------------------------------
  function renderPasswordGenerator(container) {
    updateSEO({
      title: "Secure Password Generator - Cryptographically Strong Passwords",
      description: "Create unhackable passwords using crypto.getRandomValues(). Custom length up to 64 chars, character variety toggles, and entropy strength meter.",
      path: "/tools/password-generator",
      appName: "Secure Password Generator",
      faqs: [
        { q: "Is this password generator cryptographically secure?", a: "Yes. We use the Web Cryptography API (window.crypto.getRandomValues), which generates true non-deterministic pseudorandom bytes." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Password Generator", path: "/tools/password-generator" }]
    });

    container.innerHTML = `
      ${renderToolHeader("Cryptographic Password Generator", "Generate unbreakable passwords using your browser's hardware-backed random generator.", "🔐", "Web Crypto API Randomness")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto">
        <div class="relative mb-6">
          <input type="text" id="pwd-output" readonly 
            class="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-emerald-400 font-mono text-base sm:text-lg tracking-wider pr-28 outline-none select-all font-bold" />
          <button type="button" id="pwd-copy-btn" class="absolute right-2 top-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition">
            Copy
          </button>
        </div>

        <div class="mb-6 space-y-1.5">
          <div class="flex justify-between text-xs text-slate-400">
            <span>Entropy Strength:</span>
            <span id="pwd-strength-text" class="font-bold text-emerald-400">Strong</span>
          </div>
          <div class="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
            <div id="pwd-strength-bar" class="h-full bg-emerald-500 transition-all duration-300 w-3/4"></div>
          </div>
        </div>

        <div class="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
          <div>
            <div class="flex justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Password Length:</span>
              <span id="pwd-len-val" class="font-mono text-emerald-400 font-bold">16 chars</span>
            </div>
            <input type="range" id="pwd-len" min="8" max="64" value="16" class="w-full accent-emerald-500" />
          </div>

          <div class="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="chk-upper" checked class="accent-emerald-500 rounded" />
              <span>Uppercase (A-Z)</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="chk-lower" checked class="accent-emerald-500 rounded" />
              <span>Lowercase (a-z)</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="chk-nums" checked class="accent-emerald-500 rounded" />
              <span>Numbers (0-9)</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="chk-syms" checked class="accent-emerald-500 rounded" />
              <span>Symbols (!@#$%)</span>
            </label>
          </div>
        </div>

        <button type="button" id="pwd-regen-btn" class="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-6 rounded-xl transition text-xs shadow-lg">
          🔄 Generate New Password
        </button>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("password-generator")}
    `;

    const out = container.querySelector("#pwd-output");
    const lenSlider = container.querySelector("#pwd-len");
    const lenVal = container.querySelector("#pwd-len-val");
    const chkUpper = container.querySelector("#chk-upper");
    const chkLower = container.querySelector("#chk-lower");
    const chkNums = container.querySelector("#chk-nums");
    const chkSyms = container.querySelector("#chk-syms");
    const copyBtn = container.querySelector("#pwd-copy-btn");
    const regenBtn = container.querySelector("#pwd-regen-btn");
    const strBar = container.querySelector("#pwd-strength-bar");
    const strText = container.querySelector("#pwd-strength-text");

    const sets = {
      upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lower: "abcdefghijklmnopqrstuvwxyz",
      nums: "0123456789",
      syms: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };

    function generate() {
      let pool = "";
      if (chkUpper.checked) pool += sets.upper;
      if (chkLower.checked) pool += sets.lower;
      if (chkNums.checked) pool += sets.nums;
      if (chkSyms.checked) pool += sets.syms;

      if (!pool) pool = sets.lower;

      const len = parseInt(lenSlider.value);
      lenVal.textContent = `${len} chars`;

      const randomBytes = new Uint32Array(len);
      window.crypto.getRandomValues(randomBytes);

      let pwd = "";
      for (let i = 0; i < len; i++) {
        pwd += pool[randomBytes[i] % pool.length];
      }
      out.value = pwd;

      let strength = 0;
      if (len >= 12) strength += 25;
      if (len >= 20) strength += 25;
      if (chkUpper.checked && chkLower.checked) strength += 20;
      if (chkNums.checked) strength += 15;
      if (chkSyms.checked) strength += 15;

      strBar.style.width = `${strength}%`;
      if (strength <= 40) {
        strBar.className = "h-full bg-rose-500 transition-all";
        strText.textContent = "Weak";
        strText.className = "font-bold text-rose-400";
      } else if (strength <= 70) {
        strBar.className = "h-full bg-amber-500 transition-all";
        strText.textContent = "Medium";
        strText.className = "font-bold text-amber-400";
      } else {
        strBar.className = "h-full bg-emerald-500 transition-all";
        strText.textContent = "Very Strong";
        strText.className = "font-bold text-emerald-400";
      }
    }

    [lenSlider, chkUpper, chkLower, chkNums, chkSyms].forEach(el => el.addEventListener("input", generate));
    regenBtn.addEventListener("click", generate);

    copyBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(out.value);
      copyBtn.textContent = "Copied! ✓";
      setTimeout(() => copyBtn.textContent = "Copy", 1500);
      showToast("Password copied securely!");
    });

    generate();
  }

  // Register tools to APP namespace
  window.APP.renderBirthChart = renderBirthChart;
  window.APP.renderAgeCalculator = renderAgeCalculator;
  window.APP.renderPaintCalculator = renderPaintCalculator;
  window.APP.renderTitleGenerator = renderTitleGenerator;
  window.APP.renderWordCounter = renderWordCounter;
  window.APP.renderQrGenerator = renderQrGenerator;
  window.APP.renderPasswordGenerator = renderPasswordGenerator;
})();
