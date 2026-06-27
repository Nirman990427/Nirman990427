/* ============================================================
   DropPilot — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- navbar shadow on scroll ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  const burger = document.getElementById("burger");
  const links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));

  /* ---------- animated number counters ---------- */
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const isFloat = !Number.isInteger(target);
    const duration = 1500;
    let start = null;
    function frame(ts) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const val = target * easeOut(p);
      el.textContent =
        (isFloat ? val.toFixed(1) : Math.floor(val).toLocaleString("en-GB")) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else
        el.textContent =
          (isFloat ? target.toFixed(1) : target.toLocaleString("en-GB")) + suffix;
    }
    requestAnimationFrame(frame);
  }
  const countIO = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll(".count").forEach((el) => countIO.observe(el));

  /* ---------- product score bars fill on view ---------- */
  const barIO = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll(".scorebar").forEach((el) => barIO.observe(el));

  /* ---------- pricing billing toggle ---------- */
  const sw = document.getElementById("billingSwitch");
  const monthlyLbl = document.getElementById("btMonthly");
  const annualLbl = document.getElementById("btAnnual");
  const amounts = document.querySelectorAll(".plan__amt");
  if (sw) {
    sw.addEventListener("click", () => {
      const annual = sw.classList.toggle("on");
      monthlyLbl.classList.toggle("is-active", !annual);
      annualLbl.classList.toggle("is-active", annual);
      amounts.forEach((el) => {
        const next = annual ? el.dataset.annual : el.dataset.monthly;
        el.textContent = next;
      });
    });
  }

  /* ---------- lead form (demo handling) ---------- */
  document.querySelectorAll("#leadForm, #leadFormBottom").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type=email]");
      const btn = form.querySelector("button");
      if (!input.value) return;
      const original = btn.innerHTML;
      btn.textContent = "✓ Check your inbox!";
      btn.disabled = true;
      input.value = "";
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
      }, 2600);
    });
  });
})();
