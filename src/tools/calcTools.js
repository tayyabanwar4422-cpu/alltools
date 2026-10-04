/**
 * AllToolsHub - Calculators & Generator Tools
 * Tool 6: Birth Chart Calculator (Sun, Moon, Rising) — ACCURATE VERSION
 * Tool 7: Age Calculator
 * Tool 8: Paint Calculator
 * Tool 9: Title Generator
 * Tool 10: Word & Character Counter
 * Tool 11: QR Code Generator
 * Tool 12: Password Generator
 * Tool 13: Numerology Calculator
 */
(function() {
  "use strict";
  const { CONFIG, showToast, updateSEO, renderAdSlot, renderToolHeader, renderFaqs, renderRelatedTools } = window.APP;

  // -------------------------------------------------------------
  // TOOL 6: Birth Chart Calculator (ACCURATE astronomical math)
  // -------------------------------------------------------------
  function renderBirthChart(container) {
    updateSEO({
      title: "Free Birth Chart Calculator - Sun, Moon and Rising Sign",
      description: "Discover your astrological Big Three: Sun, Moon, and Ascendant (Rising) signs with accurate astronomical calculations.",
      path: "/tools/birth-chart-calculator",
      appName: "Birth Chart Calculator",
      faqs: [
        { q: "What is the 'Big Three' in astrology?", a: "Your Sun sign represents core ego and purpose, your Moon sign governs emotions and subconscious desires, and your Rising (Ascendant) sign is your outward social persona." },
        { q: "Why is exact birth time needed for the Rising sign?", a: "The Rising sign changes roughly every two hours as the Earth rotates, making exact birth time crucial for accuracy." },
        { q: "Does the birth city matter?", a: "Yes. Latitude affects the Ascendant calculation significantly. Our tool uses a built-in database of major world cities to determine coordinates automatically." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Birth Chart Calculator", path: "/tools/birth-chart-calculator" }]
    });

    const zodiacSigns = [
      { name: "Aries", symbol: "♈", element: "Fire", dates: "Mar 21 - Apr 19", traits: "Bold, ambitious, pioneering, energetic" },
      { name: "Taurus", symbol: "♉", element: "Earth", dates: "Apr 20 - May 20", traits: "Grounded, tenacious, dependable, sensual" },
      { name: "Gemini", symbol: "♊", element: "Air", dates: "May 21 - Jun 20", traits: "Curious, witty, expressive, adaptable" },
      { name: "Cancer", symbol: "♋", element: "Water", dates: "Jun 21 - Jul 22", traits: "Intuitive, nurturing, empathetic, protective" },
      { name: "Leo", symbol: "♌", element: "Fire", dates: "Jul 23 - Aug 22", traits: "Radiant, charismatic, theatrical, generous" },
      { name: "Virgo", symbol: "♍", element: "Earth", dates: "Aug 23 - Sep 22", traits: "Analytical, methodical, helpful, meticulous" },
      { name: "Libra", symbol: "♎", element: "Air", dates: "Sep 23 - Oct 22", traits: "Harmonious, diplomatic, aesthetic, fair-minded" },
      { name: "Scorpio", symbol: "♏", element: "Water", dates: "Oct 23 - Nov 21", traits: "Intense, perceptive, transformative, magnetic" },
      { name: "Sagittarius", symbol: "♐", element: "Fire", dates: "Nov 22 - Dec 21", traits: "Philosophical, adventurous, optimistic, free" },
      { name: "Capricorn", symbol: "♑", element: "Earth", dates: "Dec 22 - Jan 19", traits: "Strategic, disciplined, patient, resilient" },
      { name: "Aquarius", symbol: "♒", element: "Air", dates: "Jan 20 - Feb 18", traits: "Visionary, eccentric, humanitarian, inventive" },
      { name: "Pisces", symbol: "♓", element: "Water", dates: "Feb 19 - Mar 20", traits: "Dreamy, mystical, poetic, boundless compassion" }
    ];

    const CITY_COORDS = {
      "karachi": { lat: 24.8607, lon: 67.0011, tz: 5 },
      "lahore": { lat: 31.5204, lon: 74.3587, tz: 5 },
      "islamabad": { lat: 33.6844, lon: 73.0479, tz: 5 },
      "rawalpindi": { lat: 33.5651, lon: 73.0169, tz: 5 },
      "faisalabad": { lat: 31.4180, lon: 73.0790, tz: 5 },
      "peshawar": { lat: 34.0151, lon: 71.5249, tz: 5 },
      "quetta": { lat: 30.1798, lon: 66.9750, tz: 5 },
      "multan": { lat: 30.1575, lon: 71.5249, tz: 5 },
      "delhi": { lat: 28.6139, lon: 77.2090, tz: 5.5 },
      "mumbai": { lat: 19.0760, lon: 72.8777, tz: 5.5 },
      "bangalore": { lat: 12.9716, lon: 77.5946, tz: 5.5 },
      "chennai": { lat: 13.0827, lon: 80.2707, tz: 5.5 },
      "kolkata": { lat: 22.5726, lon: 88.3639, tz: 5.5 },
      "hyderabad": { lat: 17.3850, lon: 78.4867, tz: 5.5 },
      "dhaka": { lat: 23.8103, lon: 90.4125, tz: 6 },
      "kabul": { lat: 34.5553, lon: 69.2075, tz: 4.5 },
      "tehran": { lat: 35.6892, lon: 51.3890, tz: 3.5 },
      "dubai": { lat: 25.2048, lon: 55.2708, tz: 4 },
      "riyadh": { lat: 24.7136, lon: 46.6753, tz: 3 },
      "london": { lat: 51.5074, lon: -0.1278, tz: 0 },
      "paris": { lat: 48.8566, lon: 2.3522, tz: 1 },
      "berlin": { lat: 52.5200, lon: 13.4050, tz: 1 },
      "rome": { lat: 41.9028, lon: 12.4964, tz: 1 },
      "madrid": { lat: 40.4168, lon: -3.7038, tz: 1 },
      "new york": { lat: 40.7128, lon: -74.0060, tz: -5 },
      "los angeles": { lat: 34.0522, lon: -118.2437, tz: -8 },
      "chicago": { lat: 41.8781, lon: -87.6298, tz: -6 },
      "houston": { lat: 29.7604, lon: -95.3698, tz: -6 },
      "toronto": { lat: 43.6532, lon: -79.3832, tz: -5 },
      "vancouver": { lat: 49.2827, lon: -123.1207, tz: -8 },
      "sydney": { lat: -33.8688, lon: 151.2093, tz: 10 },
      "melbourne": { lat: -37.8136, lon: 144.9631, tz: 10 },
      "tokyo": { lat: 35.6762, lon: 139.6503, tz: 9 },
      "beijing": { lat: 39.9042, lon: 116.4074, tz: 8 },
      "shanghai": { lat: 31.2304, lon: 121.4737, tz: 8 },
      "singapore": { lat: 1.3521, lon: 103.8198, tz: 8 },
      "hong kong": { lat: 22.3193, lon: 114.1694, tz: 8 },
      "cairo": { lat: 30.0444, lon: 31.2357, tz: 2 },
      "lagos": { lat: 6.5244, lon: 3.3792, tz: 1 },
      "johannesburg": { lat: -26.2041, lon: 28.0473, tz: 2 },
      "nairobi": { lat: -1.2921, lon: 36.8219, tz: 3 },
      "sao paulo": { lat: -23.5505, lon: -46.6333, tz: -3 },
      "mexico city": { lat: 19.4326, lon: -99.1332, tz: -6 },
      "buenos aires": { lat: -34.6037, lon: -58.3816, tz: -3 },
      "istanbul": { lat: 41.0082, lon: 28.9784, tz: 3 },
      "moscow": { lat: 55.7558, lon: 37.6173, tz: 3 }
    };

    container.innerHTML = `
      ${renderToolHeader("Birth Chart Calculator", "Calculate your Sun, Moon, and Rising signs with accurate astronomical math.", "✨", "Astrology Big Three")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <form id="chart-form" class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Birth Date</label>
            <input type="date" id="birth-date" required value="1995-06-15" class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Birth Time (24h)</label>
            <input type="time" id="birth-time" value="14:30" required class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Birth City</label>
            <input type="text" id="birth-place" list="city-list" placeholder="e.g. karachi, london, new york" value="karachi" class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none" />
            <datalist id="city-list">
              ${Object.keys(CITY_COORDS).map(c => `<option value="${c}">`).join("")}
            </datalist>
            <p class="text-[10px] text-slate-500 mt-1.5">Major world cities supported. Unknown cities default to London.</p>
          </div>
          <div class="sm:col-span-3">
            <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition text-xs shadow-lg shadow-emerald-500/20">
              ⚡ Calculate My Big Three
            </button>
          </div>
        </form>

        <div id="chart-results" class="mt-8 hidden"></div>
        <p class="text-[11px] text-slate-400 text-center mt-6">
          * Calculations use real astronomical formulas (Julian Day, Lunar Longitude, Sidereal Time). For entertainment & educational use.
        </p>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("birth-chart-calculator")}
    `;

    const form = container.querySelector("#chart-form");
    const resultsBox = container.querySelector("#chart-results");

    function julianDay(year, month, day, hourDecimal) {
      if (month <= 2) { year -= 1; month += 12; }
      const A = Math.floor(year / 100);
      const B = 2 - A + Math.floor(A / 4);
      return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5 + (hourDecimal / 24);
    }

    function sunLongitude(jd) {
      const n = jd - 2451545.0;
      const L = 280.460 + 0.9856474 * n;
      const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;
      const lambda = L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g);
      return ((lambda % 360) + 360) % 360;
    }

    function moonLongitude(jd) {
      const n = jd - 2451545.0;
      const L = ((218.316 + 13.176396 * n) % 360 + 360) % 360;
      const M = ((134.963 + 13.064993 * n) % 360 + 360) % 360;
      const lambda = L + 6.289 * Math.sin(M * Math.PI / 180)
                       - 1.274 * Math.sin((2 * L - M) * Math.PI / 180)
                       + 0.658 * Math.sin(2 * L * Math.PI / 180);
      return ((lambda % 360) + 360) % 360;
    }

    function ascendant(jd, lat, lon) {
      const T = (jd - 2451545.0) / 36525;
      let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T;
      gmst = ((gmst % 360) + 360) % 360;
      const lst = ((gmst + lon) % 360 + 360) % 360;
      const lstRad = lst * Math.PI / 180;
      const latRad = lat * Math.PI / 180;
      const oblRad = 23.4393 * Math.PI / 180;
      const y = -Math.cos(lstRad);
      const x = Math.sin(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad);
      let ascDeg = Math.atan2(y, x) * 180 / Math.PI;
      ascDeg = ((ascDeg % 360) + 360) % 360;
      return ascDeg;
    }

    function degreeToSign(deg) {
      const idx = Math.floor(deg / 30) % 12;
      const degInSign = deg % 30;
      const d = Math.floor(degInSign);
      const m = Math.floor((degInSign - d) * 60);
      return {
        sign: zodiacSigns[idx],
        degree: d,
        minute: m,
        index: idx,
        formatted: `${zodiacSigns[idx].name} ${d}°${m.toString().padStart(2, "0")}'`
      };
    }

    function lookupCity(input) {
      const clean = (input || "").toLowerCase().trim();
      if (!clean) return { lat: 51.5074, lon: -0.1278, tz: 0, name: "London (default)" };
      if (CITY_COORDS[clean]) {
        return { ...CITY_COORDS[clean], name: clean };
      }
      for (const city of Object.keys(CITY_COORDS)) {
        if (clean.includes(city) || city.includes(clean)) {
          return { ...CITY_COORDS[city], name: city };
        }
      }
      return { lat: 51.5074, lon: -0.1278, tz: 0, name: clean + " (approximated as London)" };
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const dateVal = container.querySelector("#birth-date").value;
      const timeVal = container.querySelector("#birth-time").value || "12:00";
      const cityVal = container.querySelector("#birth-place").value;

      if (!dateVal) {
        showToast("Please enter your birth date.", "error");
        return;
      }

      const [year, month, day] = dateVal.split("-").map(Number);
      const [hour, minute] = timeVal.split(":").map(Number);
      const city = lookupCity(cityVal);

      const hourDecimalLocal = hour + minute / 60;
      const hourDecimalUT = hourDecimalLocal - city.tz;
      const jd = julianDay(year, month, day, hourDecimalUT);

      const sunLon = sunLongitude(jd);
      const moonLon = moonLongitude(jd);
      const ascLon = ascendant(jd, city.lat, city.lon);

      const sun = degreeToSign(sunLon);
      const moon = degreeToSign(moonLon);
      const rising = degreeToSign(ascLon);

      resultsBox.classList.remove("hidden");
      resultsBox.innerHTML = `
        <div class="fade-up space-y-6">
          <div class="text-center">
            <p class="text-xs uppercase tracking-widest text-slate-400 font-semibold">Your Astrological Big Three</p>
            <p class="text-[11px] text-slate-500 mt-1">Born ${day}/${month}/${year} at ${timeVal} in ${city.name.charAt(0).toUpperCase() + city.name.slice(1)}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-slate-950 p-6 rounded-2xl border border-amber-500/30">
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold uppercase tracking-wider text-amber-400">☀️ Sun Sign</span>
                <span class="text-3xl">${sun.sign.symbol}</span>
              </div>
              <h3 class="text-2xl font-black text-white">${sun.sign.name}</h3>
              <p class="text-xs text-amber-400 font-mono mt-1">${sun.formatted}</p>
              <p class="text-xs text-slate-400 mt-2">${sun.sign.dates} • ${sun.sign.element} Element</p>
              <div class="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong>Core Essence:</strong> ${sun.sign.traits}
              </div>
            </div>

            <div class="bg-slate-950 p-6 rounded-2xl border border-sky-500/30">
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold uppercase tracking-wider text-sky-400">🌙 Moon Sign</span>
                <span class="text-3xl">${moon.sign.symbol}</span>
              </div>
              <h3 class="text-2xl font-black text-white">${moon.sign.name}</h3>
              <p class="text-xs text-sky-400 font-mono mt-1">${moon.formatted}</p>
              <p class="text-xs text-slate-400 mt-2">${moon.sign.element} Element</p>
              <div class="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong>Emotional Heart:</strong> ${moon.sign.traits}
              </div>
            </div>

            <div class="bg-slate-950 p-6 rounded-2xl border border-emerald-500/30">
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">🌅 Rising (Ascendant)</span>
                <span class="text-3xl">${rising.sign.symbol}</span>
              </div>
              <h3 class="text-2xl font-black text-white">${rising.sign.name}</h3>
              <p class="text-xs text-emerald-400 font-mono mt-1">${rising.formatted}</p>
              <p class="text-xs text-slate-400 mt-2">${rising.sign.element} Element</p>
              <div class="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong>Social Mask:</strong> ${rising.sign.traits}
              </div>
            </div>
          </div>

          <div class="bg-slate-950 rounded-xl border border-slate-800 p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">📐 Astronomical Details</h4>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div>
                <span class="text-slate-500 block">Julian Day</span>
                <span class="text-slate-200 font-mono">${jd.toFixed(4)}</span>
              </div>
              <div>
                <span class="text-slate-500 block">Sun Longitude</span>
                <span class="text-slate-200 font-mono">${sunLon.toFixed(2)}°</span>
              </div>
              <div>
                <span class="text-slate-500 block">Moon Longitude</span>
                <span class="text-slate-200 font-mono">${moonLon.toFixed(2)}°</span>
              </div>
              <div>
                <span class="text-slate-500 block">Ascendant</span>
                <span class="text-slate-200 font-mono">${ascLon.toFixed(2)}°</span>
              </div>
              <div>
                <span class="text-slate-500 block">Latitude</span>
                <span class="text-slate-200 font-mono">${city.lat.toFixed(4)}</span>
              </div>
              <div>
                <span class="text-slate-500 block">Longitude</span>
                <span class="text-slate-200 font-mono">${city.lon.toFixed(4)}</span>
              </div>
              <div>
                <span class="text-slate-500 block">Timezone</span>
                <span class="text-slate-200 font-mono">UTC${city.tz >= 0 ? "+" : ""}${city.tz}</span>
              </div>
              <div>
                <span class="text-slate-500 block">Location</span>
                <span class="text-slate-200 font-mono">${city.name}</span>
              </div>
            </div>
          </div>
        </div>
      `;

      resultsBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      showToast("Birth chart calculated!");
    });

    setTimeout(() => { form.dispatchEvent(new Event("submit")); }, 300);
  }

  // -------------------------------------------------------------
  // TOOL 7: Age Calculator & Birthday Countdown
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
                class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 outline-none">https://alltoolshub.qd.je</textarea>
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
      const data = encodeURIComponent(container.querySelector("#qr-data").value.trim() || "https://alltoolshub.qd.je");
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

  // -------------------------------------------------------------
  // TOOL 13: Numerology Calculator
  // -------------------------------------------------------------
  function renderNumerology(container) {
    updateSEO({
      title: "Free Numerology Calculator - Life Path, Expression & Soul Urge Numbers",
      description: "Calculate your numerology core numbers: Life Path, Expression, Soul Urge, Personality, Birthday, and Personal Year. Free, accurate Pythagorean numerology.",
      path: "/tools/numerology-calculator",
      appName: "Numerology Calculator",
      faqs: [
        { q: "What is a Life Path number?", a: "Your Life Path number is derived from your full birth date and represents the core theme of your life — your purpose, challenges, and greatest potential." },
        { q: "What are master numbers?", a: "Master numbers are 11, 22, and 33. They are not reduced further because they carry higher spiritual significance and greater potential (and greater challenge)." },
        { q: "How is numerology calculated?", a: "We use the standard Pythagorean system where A=1, B=2, ... I=9, J=1, and so on. Letters are summed and reduced to a single digit unless they form a master number." }
      ],
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Numerology Calculator", path: "/tools/numerology-calculator" }]
    });

    const LETTER_VALUES = {
      A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
      J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9,
      S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8
    };
    const VOWELS = ["A","E","I","O","U"];

    const MEANINGS = {
      1: { title: "The Leader", traits: "Independent, pioneering, ambitious, original. You are here to lead, innovate, and stand on your own." },
      2: { title: "The Diplomat", traits: "Cooperative, sensitive, harmonious, intuitive. You are here to balance, partner, and heal relationships." },
      3: { title: "The Communicator", traits: "Expressive, creative, joyful, social. You are here to inspire through art, words, and connection." },
      4: { title: "The Builder", traits: "Disciplined, practical, dependable, methodical. You are here to build lasting foundations and systems." },
      5: { title: "The Adventurer", traits: "Free-spirited, curious, versatile, dynamic. You are here to experience freedom and embrace change." },
      6: { title: "The Nurturer", traits: "Caring, responsible, protective, harmonious. You are here to serve family, community, and beauty." },
      7: { title: "The Seeker", traits: "Analytical, spiritual, introspective, wise. You are here to seek truth, knowledge, and inner wisdom." },
      8: { title: "The Achiever", traits: "Ambitious, powerful, authoritative, business-minded. You are here to master the material world and lead." },
      9: { title: "The Humanitarian", traits: "Compassionate, selfless, idealistic, generous. You are here to serve humanity and let go of the ego." },
      11: { title: "The Intuitive Master", traits: "Highly intuitive, visionary, inspiring, spiritually attuned. A master number carrying amplified spiritual potential." },
      22: { title: "The Master Builder", traits: "Visionary realist, capable of manifesting big dreams into concrete reality. The most powerful master number for worldly achievement." },
      33: { title: "The Master Teacher", traits: "Compassionate healer, spiritual teacher, selfless servant. Rare and highly evolved; here to uplift humanity through love." }
    };

    function reduce(n, keepMaster = true) {
      while (n > 9) {
        if (keepMaster && (n === 11 || n === 22 || n === 33)) return n;
        n = String(n).split("").reduce((sum, d) => sum + parseInt(d), 0);
      }
      return n;
    }

    function letterSum(str) {
      return str.toUpperCase().replace(/[^A-Z]/g, "").split("")
        .reduce((sum, ch) => sum + (LETTER_VALUES[ch] || 0), 0);
    }

    function calculateNumerology(fullName, birthDate) {
      const [year, month, day] = birthDate.split("-").map(Number);

      const dateStr = `${day}${month}${year}`;
      const dateSum = dateStr.split("").reduce((s, d) => s + parseInt(d), 0);
      const lifePath = reduce(dateSum);

      const birthday = reduce(day);

      const expression = reduce(letterSum(fullName));

      const vowelsOnly = fullName.toUpperCase().split("").filter(c => VOWELS.includes(c)).join("");
      const soulUrge = reduce(letterSum(vowelsOnly));

      const consonantsOnly = fullName.toUpperCase().replace(/[^A-Z]/g, "").split("").filter(c => !VOWELS.includes(c)).join("");
      const personality = reduce(letterSum(consonantsOnly));

      const currentYear = new Date().getFullYear();
      const pySum = String(currentYear).split("").reduce((s, d) => s + parseInt(d), 0)
                  + reduce(day, false)
                  + reduce(month, false);
      const personalYear = reduce(pySum);

      return { lifePath, birthday, expression, soulUrge, personality, personalYear };
    }

    container.innerHTML = `
      ${renderToolHeader("Numerology Calculator", "Discover your Life Path, Expression, Soul Urge, Personality & Personal Year numbers.", "🔢", "Pythagorean Numerology")}

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <form id="num-form" class="space-y-4 mb-6">
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Full Birth Name</label>
            <input type="text" id="num-name" required placeholder="e.g. Tayyab Ali Khan" value="Tayyab Ali Khan"
              class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
            <p class="text-[10px] text-slate-500 mt-1.5">Use your full birth name as it appears on your birth certificate for accuracy.</p>
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-2">Birth Date</label>
            <input type="date" id="num-date" required value="1995-06-15"
              class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition text-xs shadow-lg shadow-emerald-500/20">
            ⚡ Calculate My Numerology Numbers
          </button>
        </form>

        <div id="num-results" class="mt-8 hidden"></div>
        <p class="text-[11px] text-slate-400 text-center mt-6">
          * Numerology is a symbolic study for entertainment and self-reflection.
        </p>
      </div>

      ${renderAdSlot("Below Tool Card")}
      ${renderRelatedTools("numerology-calculator")}
    `;

    const form = container.querySelector("#num-form");
    const resultsBox = container.querySelector("#num-results");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = container.querySelector("#num-name").value.trim();
      const date = container.querySelector("#num-date").value;

      if (!name || !date) {
        showToast("Please enter both your name and birth date.", "error");
        return;
      }

      const nums = calculateNumerology(name, date);

      function numberCard(label, value, icon, color) {
        const meaning = MEANINGS[value] || MEANINGS[reduce(value)];
        const isMaster = value === 11 || value === 22 || value === 33;
        return `
          <div class="bg-slate-950 p-5 rounded-xl border border-${color}-500/30">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-${color}-400">${icon} ${label}</span>
              <span class="text-3xl font-black text-white">${value}${isMaster ? '<span class="text-[10px] text-amber-400 ml-1 align-super">MASTER</span>' : ''}</span>
            </div>
            <p class="text-sm font-bold text-white mb-1">${meaning.title}</p>
            <p class="text-[11px] text-slate-400 leading-relaxed">${meaning.traits}</p>
          </div>
        `;
      }

      resultsBox.classList.remove("hidden");
      resultsBox.innerHTML = `
        <div class="fade-up space-y-6">
          <div class="text-center">
            <p class="text-xs uppercase tracking-widest text-slate-400 font-semibold">Your Numerology Profile</p>
            <p class="text-[11px] text-slate-500 mt-1">${name} • Born ${date}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${numberCard("Life Path", nums.lifePath, "🛤️", "emerald")}
            ${numberCard("Expression / Destiny", nums.expression, "🎯", "purple")}
            ${numberCard("Soul Urge", nums.soulUrge, "❤️", "rose")}
            ${numberCard("Personality", nums.personality, "🎭", "amber")}
            ${numberCard("Birthday", nums.birthday, "🎂", "sky")}
            ${numberCard("Personal Year (current)", nums.personalYear, "📅", "cyan")}
          </div>

          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <strong class="text-slate-200">How to read your chart:</strong> Your <strong class="text-emerald-400">Life Path</strong> is your life's main journey. <strong class="text-purple-400">Expression</strong> shows your natural talents. <strong class="text-rose-400">Soul Urge</strong> reveals what your heart truly desires. <strong class="text-amber-400">Personality</strong> is how others first see you. <strong class="text-sky-400">Birthday</strong> shows special gifts. <strong class="text-cyan-400">Personal Year</strong> describes the energy of your current year (1–9 cycle).
          </div>
        </div>
      `;

      resultsBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      showToast("Numerology calculated!");
    });

    setTimeout(() => { form.dispatchEvent(new Event("submit")); }, 300);
  }

  // Register tools to APP namespace
  window.APP.renderBirthChart = renderBirthChart;
  window.APP.renderNumerology = renderNumerology;
  window.APP.renderAgeCalculator = renderAgeCalculator;
  window.APP.renderPaintCalculator = renderPaintCalculator;
  window.APP.renderTitleGenerator = renderTitleGenerator;
  window.APP.renderWordCounter = renderWordCounter;
  window.APP.renderQrGenerator = renderQrGenerator;
  window.APP.renderPasswordGenerator = renderPasswordGenerator;
})();
