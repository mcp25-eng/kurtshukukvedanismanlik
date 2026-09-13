(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const year = document.querySelector("[data-year]");

  if (year) year.textContent = String(new Date().getFullYear());

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ——— Hero 3D parallax ——— */
  const hero = document.querySelector("[data-hero]");
  if (hero) {
    const stage = hero.querySelector(".hero-stage");
    const content = hero.querySelector("[data-hero-content]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollY = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;

      if (stage) {
        const rx = (-currentY * 1.2).toFixed(3);
        const ry = (currentX * 1.6).toFixed(3);
        stage.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      }

      if (content) {
        const cx = (currentX * -8).toFixed(2);
        const cy = (currentY * -5).toFixed(2);
        content.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }

      requestAnimationFrame(render);
    };

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
      targetY = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const onHeroScroll = () => {
      scrollY = Math.max(0, -hero.getBoundingClientRect().top);
    };

    if (!reduceMotion) {
      if (!isTouch) {
        hero.addEventListener("pointermove", onMove);
        hero.addEventListener("pointerleave", onLeave);
      }
      window.addEventListener("scroll", onHeroScroll, { passive: true });
      onHeroScroll();
      requestAnimationFrame(render);
    }
  }

  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const email = String(data.get("email") || "").trim();
      const subject = String(data.get("subject") || "Hukuki Danışmanlık Talebi").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !phone || !message) {
        alert("Lütfen ad soyad, telefon ve mesaj alanlarını doldurun.");
        return;
      }

      const body = [
        `Ad Soyad: ${name}`,
        `Telefon: ${phone}`,
        `E-posta: ${email || "-"}`,
        "",
        message,
      ].join("\n");

      const mailto = `mailto:kurtshukuk@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
    });
  }
})();
