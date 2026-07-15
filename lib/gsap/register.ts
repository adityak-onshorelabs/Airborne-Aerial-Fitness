/**
 * Central GSAP plugin registration. Client-only, runs once. Every module that
 * needs GSAP scroll features imports { gsap, ScrollTrigger, ScrollSmoother }
 * from here so the plugins are guaranteed registered before use.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export { gsap, ScrollTrigger, ScrollSmoother };
