import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function initScrollAnimations(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-reveal], [data-reveal-item]').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return () => {};
  }

  const triggers: ScrollTrigger[] = [];

  // 1. Individual text & block reveals: [data-reveal]
  const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  revealElements.forEach((el) => {
    const delay = parseFloat(el.getAttribute('data-delay') || '0');
    const yOffset = parseInt(el.getAttribute('data-y') || '16', 10);

    const tween = gsap.fromTo(
      el,
      {
        opacity: 0,
        y: yOffset
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        delay,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true
        }
      }
    );

    if (tween.scrollTrigger) {
      triggers.push(tween.scrollTrigger);
    }
  });

  // 2. Staggered groups: [data-reveal-group] > [data-reveal-item]
  const groupContainers = document.querySelectorAll<HTMLElement>('[data-reveal-group]');
  groupContainers.forEach((container) => {
    const items = container.querySelectorAll<HTMLElement>('[data-reveal-item]');
    if (!items.length) return;

    const tween = gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 16
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          once: true
        }
      }
    );

    if (tween.scrollTrigger) {
      triggers.push(tween.scrollTrigger);
    }
  });

  return () => {
    triggers.forEach((t) => t.kill());
  };
}
