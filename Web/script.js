(() => {
  const supportsPointer = window.matchMedia("(pointer: fine)").matches;
  if (!supportsPointer) {
    return;
  }

  const preview = document.querySelector(".cursor-preview");
  const previewImg = preview?.querySelector(".cursor-preview__img");
  const targets = document.querySelectorAll("[data-preview]");
  if (!preview || !previewImg || targets.length === 0) {
    return;
  }

  const offset = { x: 32, y: 32 };
  const ease = 0.16;
  let current = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };
  let rafId = null;

  const setTarget = (x, y) => {
    target.x = x + offset.x;
    target.y = y + offset.y;
  };

  const tick = () => {
    current.x += (target.x - current.x) * ease;
    current.y += (target.y - current.y) * ease;
    preview.style.setProperty("--x", `${current.x}px`);
    preview.style.setProperty("--y", `${current.y}px`);
    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (rafId === null) {
      rafId = requestAnimationFrame(tick);
    }
  };

  const stop = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  targets.forEach((targetEl) => {
    targetEl.addEventListener("pointerenter", (e) => {
      const src = targetEl.getAttribute("data-preview");
      if (!src) return;
      previewImg.style.backgroundImage = `url("${src}")`;
      preview.classList.add("is-visible");
      setTarget(e.clientX, e.clientY);
      start();
    });

    targetEl.addEventListener("pointermove", (e) => {
      setTarget(e.clientX, e.clientY);
    });

    targetEl.addEventListener("pointerleave", () => {
      preview.classList.remove("is-visible");
      stop();
    });
  });
})();
