import type { ReactNode } from "react";

/**
 * CSS-driven marquee (transform only), duplicated content for a seamless loop.
 * Pauses on hover; respects reduced-motion via global CSS override.
 */
export function Marquee({
  children,
  className = "",
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div
        className="marquee-track animate-marquee [animation-play-state:running] hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <div className="flex shrink-0">{children}</div>
        <div aria-hidden className="flex shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}
