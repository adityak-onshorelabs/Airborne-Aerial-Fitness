import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server. Prevents the SSR
 * "useLayoutEffect does nothing on the server" warning. GSAP setup runs in a
 * layout effect so measurements happen before paint.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
