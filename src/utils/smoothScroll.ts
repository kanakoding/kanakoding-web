/**
 * Custom 60fps smooth scroll utility using requestAnimationFrame and easeInOutCubic.
 * Works consistently across all browsers and OS settings (even when native CSS
 * scroll-behavior: smooth is bypassed by OS settings), with automatic navbar offset.
 */

const NAVBAR_OFFSET = 84;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

let currentAnimationFrame: number | null = null;

export function smoothScrollToY(targetY: number, duration = 800): void {
  if (currentAnimationFrame !== null) {
    cancelAnimationFrame(currentAnimationFrame);
  }

  const startY = window.scrollY || window.pageYOffset;
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const clampedTargetY = Math.min(Math.max(0, targetY), maxScroll);
  const distance = clampedTargetY - startY;

  if (Math.abs(distance) < 2) {
    window.scrollTo(0, clampedTargetY);
    return;
  }

  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      currentAnimationFrame = requestAnimationFrame(step);
    } else {
      currentAnimationFrame = null;
    }
  };

  currentAnimationFrame = requestAnimationFrame(step);
}

export function smoothScrollToElement(
  sectionId: string,
  duration = 850
): boolean {
  if (sectionId === 'top' || sectionId === 'beranda') {
    smoothScrollToY(0, duration);
    return true;
  }

  const element = document.getElementById(sectionId);
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const targetY = rect.top + (window.scrollY || window.pageYOffset) - NAVBAR_OFFSET;
  smoothScrollToY(targetY, duration);
  return true;
}
