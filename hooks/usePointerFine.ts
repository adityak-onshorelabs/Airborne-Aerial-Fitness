"use client";

import { useEffect, useState } from "react";

/**
 * True only on devices with a precise pointer (mouse/trackpad) AND no
 * reduced-motion preference. Starts false so SSR and the first client render
 * match (no hydration mismatch); pointer-driven effects mount after this flips.
 */
export function usePointerFine() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setOk(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return ok;
}
