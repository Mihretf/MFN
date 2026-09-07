import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const initAnimations = () => {
  if (prefersReducedMotion()) {
    gsap.set("[data-gsap-animate]", { autoAlpha: 1 });
    return;
  }
  ScrollTrigger.config({ ignoreMobileResize: true });
};

export const killAllAnimations = () => {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  gsap.globalTimeline.clear();
};

function splitText(element: HTMLElement, type: "lines" | "words" | "chars") {
  const text = element.textContent || "";
  element.innerHTML = "";
  element.style.display = "inline-block";

  const fragments: HTMLElement[] = [];
  let delimiter = "";

  if (type === "lines") {
    // For lines, we need to wrap in a container and split by actual line breaks or approximate
    delimiter = "\n";
  } else if (type === "words") {
    delimiter = " ";
  } else {
    delimiter = "";
  }

  const parts = type === "chars" ? text.split("") : text.split(delimiter);
  
  parts.forEach((part, i) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.transform = "translateY(30px)";
    span.textContent = part + (type === "words" && i < parts.length - 1 ? " " : "");
    element.appendChild(span);
    fragments.push(span);
  });

  return {
    lines: type === "lines" ? fragments : [],
    words: type === "words" ? fragments : [],
    chars: type === "chars" ? fragments : [],
    revert: () => {
      element.textContent = text;
      element.style.display = "";
    }
  };
}

export const animateTextReveal = (
  selector: string,
  options: {
    type?: "lines" | "words" | "chars";
    stagger?: number;
    duration?: number;
    ease?: string;
    y?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  if (prefersReducedMotion()) return;

  const {
    type = "lines",
    stagger = 0.03,
    duration = 0.8,
    ease = "power3.out",
    y = 30,
    start = "top 85%",
    end = "bottom 20%",
    scrub = false,
  } = options;

  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (!elements.length) return;

  elements.forEach((el) => {
    const split = splitText(el, type);
    const targets = type === "lines" ? split.lines : type === "words" ? split.words : split.chars;

    gsap.set(targets, { autoAlpha: 0, y });

    if (scrub) {
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        stagger,
        duration,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
        },
      });
    } else {
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        stagger,
        duration,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          toggleActions: "play none none reverse",
        },
      });
    }
  });
};

export const animateImageReveal = (
  selector: string,
  options: {
    scale?: number;
    y?: number;
    duration?: number;
    ease?: string;
    start?: string;
    end?: string;
    stagger?: number;
  } = {}
) => {
  if (prefersReducedMotion()) return;

  const {
    scale = 1.05,
    y = 40,
    duration = 1,
    ease = "power3.out",
    start = "top 85%",
    end = "bottom 20%",
    stagger = 0.1,
  } = options;

  const images = document.querySelectorAll<HTMLImageElement>(selector);
  if (!images.length) return;

  gsap.set(images, { autoAlpha: 0, scale, y });

  gsap.to(images, {
    autoAlpha: 1,
    scale: 1,
    y: 0,
    duration,
    ease,
    stagger,
    scrollTrigger: {
      trigger: images[0].parentElement,
      start,
      end,
      toggleActions: "play none none reverse",
    },
  });
};

export const animateCounter = (
  selector: string,
  endValue: number,
  options: {
    duration?: number;
    ease?: string;
    start?: string;
    decimals?: number;
    suffix?: string;
  } = {}
) => {
  if (prefersReducedMotion()) {
    const el = document.querySelector<HTMLElement>(selector);
    if (el) el.textContent = `${endValue}${options.suffix || ""}`;
    return;
  }

  const { duration = 2, ease = "power1.out", start = "top 85%", decimals = 0, suffix = "" } = options;

  const obj = { value: 0 };
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return;

  gsap.to(obj, {
    value: endValue,
    duration,
    ease,
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: "play none none reset",
    },
    onUpdate: () => {
      element.textContent = `${obj.value.toFixed(decimals)}${suffix}`;
    },
  });
};

export const animateLogoEntrance = (
  logoSelector: string,
  textSelector?: string
) => {
  if (prefersReducedMotion()) return;

  const logo = document.querySelector<HTMLElement>(logoSelector);
  const text = textSelector ? document.querySelector<HTMLElement>(textSelector) : null;

  const tl = gsap.timeline({ delay: 0.3 });

  tl.from(logo, {
    scale: 0.6,
    autoAlpha: 0,
    duration: 1,
    ease: "elastic.out(1, 0.5)",
  });

  if (text) {
    tl.from(text, {
      y: 20,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.6");
  }
};

export const animateLogoHover = (logoSelector: string) => {
  if (prefersReducedMotion()) return;

  const logo = document.querySelector<HTMLElement>(logoSelector);
  if (!logo) return;

  logo.addEventListener("mouseenter", () => {
    gsap.to(logo, { scale: 1.08, duration: 0.3, ease: "power2.out" });
  });

  logo.addEventListener("mouseleave", () => {
    gsap.to(logo, { scale: 1, duration: 0.3, ease: "power2.out" });
  });
};

export const animateRotating3D = (
  containerSelector: string,
  imageSelector: string,
  options: {
    rotateX?: number;
    rotateY?: number;
    perspective?: number;
    scrub?: boolean | number;
    pin?: boolean;
    start?: string;
    end?: string;
  } = {}
) => {
  if (prefersReducedMotion()) return;

  const {
    rotateX = 0,
    rotateY = 45,
    perspective = 1000,
    scrub = 1,
    pin = true,
    start = "top top",
    end = "bottom bottom",
  } = options;

  const container = document.querySelector<HTMLElement>(containerSelector);
  const image = document.querySelector<HTMLElement>(imageSelector);
  if (!container || !image) return;

  gsap.set(container, { perspective, transformStyle: "preserve-3d" });
  gsap.set(image, { transformOrigin: "center center" });

  gsap.to(image, {
    rotateX,
    rotateY,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start,
      end,
      scrub,
      pin,
      anticipatePin: 1,
    },
  });
};

export const animateStickyGrid = (
  gridSelector: string,
  itemSelector: string,
  options: {
    start?: string;
    end?: string;
    stagger?: number;
    pin?: boolean;
  } = {}
) => {
  if (prefersReducedMotion()) return;

  const { start = "top top", end = "bottom bottom", stagger = 0.1, pin = true } = options;

  const grid = document.querySelector<HTMLElement>(gridSelector);
  const items = document.querySelectorAll<HTMLElement>(itemSelector);
  if (!grid || !items.length) return;

  gsap.set(items, { autoAlpha: 0, scale: 0.8, y: 50 });

  gsap.to(items, {
    autoAlpha: 1,
    scale: 1,
    y: 0,
    stagger,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: grid,
      start,
      end,
      scrub: 1,
      pin,
      anticipatePin: 1,
    },
  });
};

export const animateOnScrollTextMotion = (
  selector: string,
  options: {
    type?: "chars" | "words";
    x?: number;
    y?: number;
    rotateX?: number;
    rotateY?: number;
    blur?: number;
    stagger?: number;
    scrub?: boolean | number;
    start?: string;
    end?: string;
  } = {}
) => {
  if (prefersReducedMotion()) return;

  const {
    type = "chars",
    x = 0,
    y = 50,
    rotateX = 0,
    rotateY = 0,
    blur = 10,
    stagger = 0.02,
    scrub = 1,
    start = "top 90%",
    end = "top 10%",
  } = options;

  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (!elements.length) return;

  elements.forEach((el) => {
    const split = splitText(el, type);
    const targets = type === "chars" ? split.chars : split.words;

    gsap.set(targets, {
      autoAlpha: 0,
      x,
      y,
      rotateX,
      rotateY,
      filter: `blur(${blur}px)`,
      transformOrigin: "center center",
    });

    gsap.to(targets, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      filter: "blur(0px)",
      stagger,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
      },
    });
  });
};

export const animateSVGMaskTransition = (
  maskSelector: string,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  if (prefersReducedMotion()) return;

  const { start = "top bottom", end = "bottom top", scrub = 1 } = options;

  const mask = document.querySelector<SVGElement>(maskSelector);
  if (!mask) return;

  const paths = mask.querySelectorAll("path, rect, polygon");
  if (!paths.length) return;

  gsap.set(paths, { scaleY: 0, transformOrigin: "center top" });

  gsap.to(paths, {
    scaleY: 1,
    stagger: 0.03,
    ease: "none",
    scrollTrigger: {
      trigger: mask.parentElement,
      start,
      end,
      scrub,
    },
  });
};