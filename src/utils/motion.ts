import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function initScrollAnimations(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Show all elements directly
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return () => {};
  }

  const triggers: ScrollTrigger[] = [];

  // 1. Reveal items with [data-reveal]
  const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  revealElements.forEach((el) => {
    const delay = parseFloat(el.getAttribute('data-delay') || '0');
    const yOffset = parseInt(el.getAttribute('data-y') || '30', 10);

    const tween = gsap.fromTo(
      el,
      {
        opacity: 0,
        y: yOffset
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );

    if (tween.scrollTrigger) {
      triggers.push(tween.scrollTrigger);
    }
  });

  // 2. Staggered groups with [data-reveal-group]
  const groupContainers = document.querySelectorAll<HTMLElement>('[data-reveal-group]');
  groupContainers.forEach((container) => {
    const items = container.querySelectorAll<HTMLElement>('[data-reveal-item]');
    if (!items.length) return;

    const tween = gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 24
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none'
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
