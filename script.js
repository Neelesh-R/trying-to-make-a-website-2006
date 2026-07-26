/* =====================================================================
   ============================  CUSTOMIZE  ============================
   Everything below in this top block is the only thing you should need
   to touch. Swap in her name, your images, your words. No other code
   needs to change.
   ===================================================================== */

/* --- Lock screen: pick ONE method to enforce, or leave both active
       (either a correct password OR a correct answer will unlock it) --- */
const LOCK = {
  password: "ourplaceholder123",           // change me
  question: "What nickname do I call you?",// shown on the "question" tab
  acceptedAnswers: ["placeholder-nickname"] // lowercase, trimmed match; add variants
};

/* --- Her name, shown in the welcome sequence --- */
const HER_NAME = "Her Name";

/* --- Full-screen backgrounds, one per section, in section order:
       [welcome, story, gallery, timeline, surprise, finale] --- */
const backgrounds = [
  "assets/images/photo1.jpg",
  "assets/images/photo2.jpg",
  "assets/images/photo3.jpg",
  "assets/images/photo4.jpg",
  "assets/images/photo5.jpg",
  "assets/images/photo6.jpg"
];

/* --- The keyword story. Each unlocks only after the previous one has
       been opened and fully read. --- */
const memories = [
  {
    title: "Smile",
    image: "assets/images/smile.jpg",
    message: "Your smile has a way of arriving before your words do. It's the first thing I look for in a room, and the thing I remember longest after I leave it."
  },
  {
    title: "Eyes",
    image: "assets/images/eyes.jpg",
    message: "I've never been good at poetry, but if I were, it would probably just be a very long list of things I notice in your eyes when you're not paying attention."
  },
  {
    title: "Kindness",
    image: "assets/images/kindness.jpg",
    message: "You are kind in the quiet way — the way that doesn't perform for anyone. I've watched you do it when you thought no one was looking, which is exactly why it matters."
  },
  {
    title: "Laugh",
    image: "assets/images/laugh.jpg",
    message: "Your laugh is the least serious sound in the world and somehow one of the most important things in mine."
  },
  {
    title: "Dreams",
    image: "assets/images/dreams.jpg",
    message: "I love the way you talk about the future — like it's a place you're excited to walk into, not just arrive at. I want a front-row seat to that."
  },
  {
    title: "Love",
    image: "assets/images/love.jpg",
    message: "Loving you has never felt like work. It feels like the one thing I do effortlessly, even on the days I get everything else wrong."
  },
  {
    title: "Future",
    image: "assets/images/future.jpg",
    message: "I don't know exactly what's ahead for us, but I know I want you standing next to me for all of it — the ordinary Tuesdays included."
  },
  {
    title: "Forever",
    image: "assets/images/forever.jpg",
    message: "Forever is a big word. I'm not scared of it when it's attached to your name."
  }
];

/* --- Gallery photos, unlocked after the story above is finished --- */
const gallery = [
  { image: "assets/images/gallery1.jpg", caption: "that afternoon", tilt: -3 },
  { image: "assets/images/gallery2.jpg", caption: "your favorite laugh", tilt: 2 },
  { image: "assets/images/gallery3.jpg", caption: "the good kind of tired", tilt: -2 },
  { image: "assets/images/gallery4.jpg", caption: "us, mid-conversation", tilt: 3 },
  { image: "assets/images/gallery5.jpg", caption: "a Tuesday, somehow perfect", tilt: -1 },
  { image: "assets/images/gallery6.jpg", caption: "one more, for the road", tilt: 2 }
];

/* --- Memory timeline --- */
const timeline = [
  { title: "We met ❤️", desc: "The day everything quietly rearranged itself." },
  { title: "Our first laugh 😂", desc: "The moment I knew this was going to be easy." },
  { title: "Our best memory ✨", desc: "You know the one. I think about it more than I let on." },
  { title: "Another unforgettable day 🌸", desc: "Proof that ordinary days can still surprise you." },
  { title: "Today ❤️", desc: "One more year of you. I'll take it." }
];

/* --- The surprise letter. Each array entry becomes its own line,
       typed out one at a time. --- */
const letterLines = [
  "I wanted to write you something before the confetti, while it's just the two of us and this screen.",
  "Thank you for being exactly the kind of person worth building a small, silly website for at 1am.",
  "I hope this year brings you everything you quietly hope for and don't say out loud.",
  "Happy birthday. I'm so glad you exist."
];

/* =====================================================================
   ============================  ENGINE  ================================
   Nothing below this line needs to change for basic customization.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------------
     0. SHARED HELPERS
     --------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function spawnFloatingHeart(container = document.body, x, y) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML = "&#10084;";
    heart.style.left = (x ?? Math.random() * window.innerWidth) + "px";
    heart.style.top = (y ?? window.innerHeight - 40) + "px";
    heart.style.fontSize = 14 + Math.random() * 16 + "px";
    heart.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 3500);
  }

  /* ---------------------------------------------------------------
     1. CUSTOM CURSOR
     --------------------------------------------------------------- */
  const cursorDot = $(".cursor-dot");
  const cursorRing = $(".cursor-ring");
  if (cursorDot && cursorRing && !prefersReducedMotion) {
    window.addEventListener("pointermove", (e) => {
      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
      cursorRing.style.left = e.clientX + "px";
      cursorRing.style.top = e.clientY + "px";
    });
    document.addEventListener("pointerdown", () => {
      cursorRing.style.transform = "translate(-50%,-50%) scale(0.8)";
      setTimeout(() => (cursorRing.style.transform = "translate(-50%,-50%) scale(1)"), 160);
      // occasional cursor sparkle
      if (Math.random() < 0.5) spawnCursorSparkle(event.clientX, event.clientY);
    });
  }
  function spawnCursorSparkle(x, y) {
    const s = document.createElement("div");
    s.textContent = "✨";
    s.style.position = "fixed";
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.zIndex = 9998;
    s.style.pointerEvents = "none";
    s.style.fontSize = "14px";
    s.style.transition = "opacity .6s, transform .6s";
    document.body.appendChild(s);
    requestAnimationFrame(() => {
      s.style.opacity = "0";
      s.style.transform = "translateY(-24px) scale(1.4)";
    });
    setTimeout(() => s.remove(), 650);
  }

  /* ---------------------------------------------------------------
     2. AMBIENT CANVAS — fireflies + drifting sparkles/stars
     --------------------------------------------------------------- */
  const ambientCanvas = $("#ambient-canvas");
  if (ambientCanvas) {
    const ctx = ambientCanvas.getContext("2d");
    let particles = [];
    function resizeAmbient() {
      ambientCanvas.width = window.innerWidth;
      ambientCanvas.height = window.innerHeight;
    }
    function makeParticles() {
      const count = prefersReducedMotion ? 0 : Math.min(60, Math.floor(window.innerWidth / 22));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.6 + 0.6,
        speedY: Math.random() * 0.25 + 0.06,
        speedX: (Math.random() - 0.5) * 0.18,
        glow: Math.random() * 0.5 + 0.5,
        flicker: Math.random() * Math.PI * 2
      }));
    }
    function tickAmbient() {
      ctx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
      particles.forEach((p) => {
        p.flicker += 0.02;
        const alpha = p.glow * (0.5 + 0.5 * Math.sin(p.flicker));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,196,160,${alpha.toFixed(2)})`;
        ctx.fill();
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -10) p.y = window.innerHeight + 10;
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;
      });
      requestAnimationFrame(tickAmbient);
    }
    resizeAmbient();
    makeParticles();
    window.addEventListener("resize", () => { resizeAmbient(); makeParticles(); });
    if (!prefersReducedMotion) tickAmbient();
  }

  /* ---------------------------------------------------------------
     3. LOCK SCREEN — password OR personal question
     --------------------------------------------------------------- */
  const lockScreen = $("#lockScreen");
  const lockForm = $("#lockForm");
  const lockError = $("#lockError");
  const lockToggleBtns = $$(".lock-toggle-btn");
  const lockFields = $$(".lock-field");
  const lockQuestionText = $("#lockQuestionText");
  let lockMode = "password";

  if (lockQuestionText) lockQuestionText.textContent = LOCK.question;

  // build floating lock particles
  const lockParticles = $("#lockParticles");
  if (lockParticles) {
    for (let i = 0; i < 22; i++) {
      const s = document.createElement("span");
      const size = Math.random() * 6 + 3;
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.left = Math.random() * 100 + "%";
      s.style.setProperty("--drift", (Math.random() * 100 - 50) + "px");
      s.style.animationDuration = 8 + Math.random() * 10 + "s";
      s.style.animationDelay = Math.random() * 8 + "s";
      lockParticles.appendChild(s);
    }
  }

  lockToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      lockMode = btn.dataset.mode;
      lockToggleBtns.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      lockFields.forEach((f) => f.classList.toggle("is-hidden", f.dataset.field !== lockMode));
      lockError.classList.remove("is-visible");
    });
  });

  lockForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    let correct = false;

    if (lockMode === "password") {
      const val = $("#lockPassword").value.trim();
      correct = val.length > 0 && val === LOCK.password;
    } else {
      const val = $("#lockAnswer").value.trim().toLowerCase();
      correct = LOCK.acceptedAnswers.some((ans) => ans.toLowerCase() === val);
    }

    if (correct) {
      unlockSite();
    } else {
      lockError.classList.add("is-visible");
      lockScreen.style.animation = "none";
      requestAnimationFrame(() => { lockScreen.style.animation = ""; });
    }
  });

  function unlockSite() {
    lockScreen.classList.add("is-unlocking");
    showLoadingScreen();
    setTimeout(() => {
      lockScreen.style.display = "none";
    }, 1150);
  }

  /* ---------------------------------------------------------------
     4. LOADING SCREEN -> reveal main experience
     --------------------------------------------------------------- */
  const loadingScreen = $("#loadingScreen");
  const loadingFill = $("#loadingFill");
  const mainExperience = $("#mainExperience");
  const heartProgress = $("#heartProgress");
  const bgMusic = $("#bgMusic");

  function showLoadingScreen() {
    loadingScreen.classList.add("is-active");
    let pct = 0;
    const step = () => {
      pct += Math.random() * 18 + 8;
      loadingFill.style.width = Math.min(pct, 100) + "%";
      if (pct < 100) {
        setTimeout(step, 180);
      } else {
        setTimeout(revealMain, 350);
      }
    };
    step();
  }

  function revealMain() {
    loadingScreen.classList.remove("is-active");
    mainExperience.classList.add("is-shown");
    mainExperience.removeAttribute("aria-hidden");
    heartProgress?.classList.add("is-visible");
    document.documentElement.classList.add("snap-scroll");
    // try to start music (browsers may still require a user gesture;
    // the floating button always works as a fallback)
    bgMusic?.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
    initSectionBackgrounds();
    runWelcomeSequence();
  }

  /* ---------------------------------------------------------------
     5. SECTION BACKGROUNDS (Ken Burns) + parallax + inview
     --------------------------------------------------------------- */
  function initSectionBackgrounds() {
    $$(".section").forEach((section) => {
      const idx = Number(section.dataset.bgIndex);
      const bgEl = section.querySelector(".section-bg");
      if (bgEl && backgrounds[idx]) {
        bgEl.style.backgroundImage =
          `linear-gradient(180deg, rgba(15,10,26,.15), rgba(15,10,26,.5)), url('${backgrounds[idx]}')`;
      }
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-inview", entry.isIntersecting);
      });
    }, { threshold: 0.35 });
    $$(".section").forEach((s) => io.observe(s));

    // gentle parallax on pointer move (desktop only)
    if (!prefersReducedMotion && matchMedia("(hover:hover)").matches) {
      window.addEventListener("pointermove", (e) => {
        const relX = (e.clientX / window.innerWidth - 0.5) * 14;
        const relY = (e.clientY / window.innerHeight - 0.5) * 14;
        $$("[data-parallax]").forEach((el) => {
          el.style.translate = `${relX}px ${relY}px`;
        });
      });
    }

    // heart-shaped scroll progress fill
    const heartPath = heartProgress?.querySelector("path");
    const total = document.documentElement.scrollHeight - window.innerHeight;
    window.addEventListener("scroll", () => {
      const progress = Math.min(1, window.scrollY / Math.max(total, 1));
      if (heartPath) heartPath.style.strokeDashoffset = (320 - 320 * progress).toString();
    });
  }

  /* ---------------------------------------------------------------
     6. WELCOME SEQUENCE
     --------------------------------------------------------------- */
  function runWelcomeSequence() {
    $("#welcomeName").textContent = HER_NAME;
    const lines = $$(".reveal-line");
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add("is-shown"), 400 + i * 700);
    });
    setTimeout(() => $(".scroll-cue")?.classList.add("is-shown"), 400 + lines.length * 700);

    // local floating hearts drifting up behind the welcome text
    const localHeartsBox = $(".floating-hearts-local");
    if (localHeartsBox && !prefersReducedMotion) {
      setInterval(() => {
        if (document.hidden) return;
        const x = Math.random() * localHeartsBox.offsetWidth;
        spawnFloatingHeart(localHeartsBox, x, localHeartsBox.offsetHeight);
      }, 1400);
    }

    $("#beginJourney")?.addEventListener("click", () => {
      $("#story")?.scrollIntoView({ behavior: "smooth" });
    });

    // keyboard shortcut: press H anytime for a floating heart
    const toast = $("#shortcutToast");
    setTimeout(() => toast?.classList.add("is-shown"), 3000);
    setTimeout(() => toast?.classList.remove("is-shown"), 7000);
    window.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "h") {
        spawnFloatingHeart(document.body, Math.random() * window.innerWidth, window.innerHeight - 60);
      }
    });
  }

  /* ---------------------------------------------------------------
     7. MUSIC TOGGLE
     --------------------------------------------------------------- */
  const musicToggle = $("#musicToggle");
  function setMusicState(playing) {
    musicToggle?.setAttribute("aria-pressed", playing ? "true" : "false");
    musicToggle?.setAttribute("aria-label", playing ? "Pause background music" : "Play background music");
  }
  musicToggle?.addEventListener("click", () => {
    if (!bgMusic) return;
    if (bgMusic.paused) {
      bgMusic.play().then(() => setMusicState(true)).catch(() => {});
    } else {
      bgMusic.pause();
      setMusicState(false);
    }
  });

  /* ---------------------------------------------------------------
     8. KEYWORD STORY JOURNEY
     --------------------------------------------------------------- */
  const keywordTrack = $("#keywordTrack");
  const keywordOverlay = $("#keywordOverlay");
  const keywordCardTitle = $("#keywordCardTitle");
  const keywordCardImage = $("#keywordCardImage");
  const keywordCardText = $("#keywordCardText");
  const keywordNextBtn = $("#keywordNext");
  const keywordCloseBtn = $("#keywordClose");
  let currentKeywordIndex = -1;
  let completedCount = 0;

  function buildKeywordTrack() {
    if (!keywordTrack) return;
    memories.forEach((mem, i) => {
      const chip = document.createElement("button");
      chip.className = "keyword-chip" + (i === 0 ? " is-unlocked-ready" : " is-locked");
      chip.textContent = mem.title;
      chip.dataset.index = i;
      chip.disabled = i !== 0;
      keywordTrack.appendChild(chip);
      requestAnimationFrame(() => setTimeout(() => chip.classList.add("is-visible"), i * 90));
      chip.addEventListener("click", () => openKeyword(i));
    });
  }

  function openKeyword(i) {
    const chip = keywordTrack.children[i];
    if (chip.classList.contains("is-locked")) return;
    currentKeywordIndex = i;
    const mem = memories[i];
    keywordCardTitle.textContent = mem.title;
    keywordCardImage.style.backgroundImage = mem.image ? `url('${mem.image}')` : "none";
    keywordCardText.innerHTML = "";
    keywordNextBtn.classList.remove("is-ready");
    keywordNextBtn.textContent = i === memories.length - 1 ? "Finish ✓" : "Next →";
    keywordOverlay.classList.add("is-open");
    typewriteParagraph(mem.message, keywordCardText, () => {
      keywordNextBtn.classList.add("is-ready");
    });
  }

  function closeKeyword() {
    keywordOverlay.classList.remove("is-open");
  }

  keywordCloseBtn?.addEventListener("click", closeKeyword);
  keywordOverlay?.addEventListener("click", (e) => {
    if (e.target === keywordOverlay) closeKeyword();
  });

  keywordNextBtn?.addEventListener("click", () => {
    const chip = keywordTrack.children[currentKeywordIndex];
    chip.classList.remove("is-locked", "is-unlocked-ready");
    chip.classList.add("is-done");
    completedCount++;

    const nextChip = keywordTrack.children[currentKeywordIndex + 1];
    if (nextChip) {
      nextChip.classList.remove("is-locked");
      nextChip.classList.add("is-unlocked-ready");
      nextChip.disabled = false;
    }

    closeKeyword();

    if (completedCount >= memories.length) {
      unlockGallery();
    } else if (nextChip) {
      setTimeout(() => openKeyword(currentKeywordIndex + 1), 450);
    }
  });

  /* Typewriter: splits text into sentence-ish chunks, reveals line by
     line with a fade — "like someone is writing a letter" — rather
     than a jittery character-by-character crawl, which reads as more
     premium and is easier to actually read. */
  function typewriteParagraph(text, container, onDone) {
    const chunks = text.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) || [text];
    let i = 0;
    function next() {
      if (i >= chunks.length) { onDone?.(); return; }
      const p = document.createElement("p");
      p.className = "type-line";
      p.textContent = chunks[i];
      container.appendChild(p);
      requestAnimationFrame(() => p.classList.add("is-shown"));
      i++;
      setTimeout(next, prefersReducedMotion ? 0 : 650);
    }
    next();
  }

  /* ---------------------------------------------------------------
     9. GALLERY — unlocks after all keywords, then lightbox
     --------------------------------------------------------------- */
  const gallerySection = $("#gallerySection");
  const polaroidGrid = $("#polaroidGrid");

  function buildGallery() {
    if (!polaroidGrid) return;
    gallery.forEach((item) => {
      const card = document.createElement("div");
      card.className = "polaroid";
      card.style.setProperty("--tilt", (item.tilt ?? -2) + "deg");
      card.innerHTML = `
        <div class="polaroid-img" style="background-image:url('${item.image}')"></div>
        <p class="polaroid-caption">${item.caption}</p>
      `;
      card.addEventListener("click", () => openLightbox(item));
      polaroidGrid.appendChild(card);
    });
  }

  function unlockGallery() {
    gallerySection?.classList.add("is-unlocked");
    gallerySection?.classList.remove("is-locked");
    spawnFloatingHeart(document.body, window.innerWidth / 2, window.innerHeight - 80);
  }

  // simple lightbox
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close photo">&times;</button>
    <div>
      <div class="lightbox-img"></div>
      <p class="lightbox-caption"></p>
    </div>
  `;
  document.body.appendChild(lightbox);
  function openLightbox(item) {
    lightbox.querySelector(".lightbox-img").style.backgroundImage = `url('${item.image}')`;
    lightbox.querySelector(".lightbox-caption").textContent = item.caption || "";
    lightbox.classList.add("is-open");
  }
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.closest(".lightbox-close")) {
      lightbox.classList.remove("is-open");
    }
  });

  /* ---------------------------------------------------------------
     10. TIMELINE — reveal on scroll
     --------------------------------------------------------------- */
  const timelineTrack = $("#timelineTrack");
  function buildTimeline() {
    if (!timelineTrack) return;
    timeline.forEach((item) => {
      const el = document.createElement("div");
      el.className = "timeline-item";
      el.innerHTML = `
        <span class="timeline-dot"></span>
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-desc">${item.desc}</p>
      `;
      timelineTrack.appendChild(el);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.3 });
    $$(".timeline-item").forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------------
     11. SURPRISE LETTER
     --------------------------------------------------------------- */
  const surpriseBtn = $("#surpriseBtn");
  const surpriseTeaser = $("#surpriseTeaser");
  const letterCard = $("#letterCard");
  const letterBody = $("#letterBody");
  let letterOpened = false;

  surpriseBtn?.addEventListener("click", () => {
    if (letterOpened) return;
    letterOpened = true;
    surpriseTeaser.classList.add("is-hidden");
    letterCard.classList.add("is-open");
    letterBody.innerHTML = "";
    let i = 0;
    function nextLine() {
      if (i >= letterLines.length) return;
      const p = document.createElement("p");
      p.className = "type-line";
      p.textContent = letterLines[i];
      letterBody.appendChild(p);
      requestAnimationFrame(() => p.classList.add("is-shown"));
      i++;
      setTimeout(nextLine, prefersReducedMotion ? 0 : 1100);
    }
    nextLine();
  });

  /* ---------------------------------------------------------------
     12. FINALE — confetti / balloons / fireworks / heart rain
     --------------------------------------------------------------- */
  const finaleSection = $("#finaleSection");
  const celebrationCanvas = $("#celebrationCanvas");
  let finaleFired = false;

  function buildFinaleStars() {
    const box = $(".finale-stars");
    if (!box) return;
    for (let i = 0; i < 40; i++) {
      const s = document.createElement("span");
      s.style.position = "absolute";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.width = s.style.height = Math.random() * 2 + 1 + "px";
      s.style.borderRadius = "50%";
      s.style.background = "rgba(247,238,227,.7)";
      s.style.opacity = Math.random().toFixed(2);
      box.appendChild(s);
    }
  }

  function runFinale() {
    if (finaleFired) return;
    finaleFired = true;
    $("#finaleTitle")?.classList.add("is-shown");
    $$("#finaleEnding p").forEach((p, i) => setTimeout(() => p.classList.add("is-shown"), 600 + i * 500));
    if (!prefersReducedMotion) startCelebrationCanvas();
  }

  function startCelebrationCanvas() {
    const ctx = celebrationCanvas.getContext("2d");
    const resize = () => {
      celebrationCanvas.width = finaleSection.offsetWidth;
      celebrationCanvas.height = finaleSection.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#D9A57C", "#E8A7C4", "#9B7FD4", "#F7EEE3", "#E8C4A0"];
    let confetti = Array.from({ length: 90 }, () => ({
      x: Math.random() * celebrationCanvas.width,
      y: -Math.random() * celebrationCanvas.height,
      r: Math.random() * 5 + 3,
      c: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 2 + 1.5,
      drift: Math.random() * 2 - 1,
      rot: Math.random() * 360,
      spin: Math.random() * 6 - 3
    }));
    let hearts = Array.from({ length: 22 }, () => ({
      x: Math.random() * celebrationCanvas.width,
      y: celebrationCanvas.height + Math.random() * 200,
      speed: Math.random() * 0.8 + 0.4,
      size: Math.random() * 10 + 8,
      drift: Math.random() * 1 - 0.5
    }));
    let fireworks = [];
    function spawnFirework() {
      const x = Math.random() * celebrationCanvas.width * 0.8 + celebrationCanvas.width * 0.1;
      const y = Math.random() * celebrationCanvas.height * 0.5 + 40;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const sparks = Array.from({ length: 26 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        return { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1 };
      });
      fireworks.push({ sparks, color });
    }
    const fireworkInterval = setInterval(spawnFirework, 900);
    setTimeout(() => clearInterval(fireworkInterval), 9000);

    function drawHeart(x, y, size, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 20, size / 20);
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.bezierCurveTo(-10, -4, -10, -12, 0, -12);
      ctx.bezierCurveTo(10, -12, 10, -4, 0, 6);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.restore();
    }

    let frame = 0;
    const maxFrames = prefersReducedMotion ? 0 : 620; // ~10s at 60fps, then settle
    function tick() {
      frame++;
      ctx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);

      confetti.forEach((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.rot += p.spin;
        if (p.y > celebrationCanvas.height + 20) p.y = -20;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
        ctx.restore();
      });

      hearts.forEach((h) => {
        h.y -= h.speed;
        h.x += h.drift;
        if (h.y < -20) h.y = celebrationCanvas.height + 20;
        drawHeart(h.x, h.y, h.size, "rgba(232,167,196,0.55)");
      });

      fireworks.forEach((fw) => {
        fw.sparks.forEach((s) => {
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.02;
          s.life -= 0.012;
          if (s.life > 0) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = fw.color;
            ctx.globalAlpha = Math.max(s.life, 0);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        });
      });
      fireworks = fireworks.filter((fw) => fw.sparks.some((s) => s.life > 0));

      if (frame < maxFrames || fireworks.length) requestAnimationFrame(tick);
    }
    tick();
  }

  /* ---------------------------------------------------------------
     13. WIRE IT UP: build dynamic content + finale trigger
     --------------------------------------------------------------- */
  buildKeywordTrack();
  buildGallery();
  buildTimeline();
  buildFinaleStars();

  const finaleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) runFinale(); });
  }, { threshold: 0.4 });
  if (finaleSection) finaleObserver.observe(finaleSection);

});
