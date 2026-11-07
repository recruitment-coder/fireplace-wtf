const animationTiming = {
  intro: 4.5,
  headlineReveal: 1.4,
  idleCycle: 4.8,
  stopAfter: 15,
  stopEase: 0.8,
};

const clickTag = window.clickTag || 'https://example.com/landing';
const adLink = document.querySelector('.ad__link');
const background = document.querySelector('.ad__layer--background');
const headline = document.querySelector('.ad__layer--headline');
let animationStarted = false;
let fallbackTimer;
adLink.href = clickTag;

const showFinalState = () => {
  gsap.set(headline, { opacity: 1 });
};

const startAnimation = () => {
  if (animationStarted) {
    return;
  }

  animationStarted = true;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showFinalState();
    return;
  }

  const startTime = performance.now();
  const intro = gsap.timeline({ onComplete: startIdle });

  // The background zooms in slightly, then returns to its original size.
  intro.to(background, {
    scale: 1.02,
    duration: animationTiming.intro - animationTiming.stopEase,
    ease: 'sine.inOut',
  });

  intro.to(background, {
    scale: 1,
    duration: animationTiming.stopEase,
    ease: 'power2.out',
  });

  // The complete headline image fades in near the end of the intro.
  intro.to(headline, {
    opacity: 1,
    duration: animationTiming.headlineReveal,
    ease: 'power2.out',
  }, animationTiming.intro - animationTiming.headlineReveal);

  function startIdle() {
    const idle = gsap.timeline({ repeat: -1, yoyo: true });

    // The background fades slightly, then returns to normal until the animation stops.
    idle.to(background, {
      opacity: 0.94,
      duration: animationTiming.idleCycle / 4,
      ease: 'sine.inOut',
    });

    gsap.delayedCall(
      Math.max(0, animationTiming.stopAfter - (performance.now() - startTime) / 1000),
      () => {
        idle.kill();
        gsap.to(background, {
          opacity: 1,
          duration: animationTiming.stopEase,
          ease: 'power2.out',
        });
      },
    );
  }
};

const handleStartMessage = (event) => {
  if (window.parent === window || event.source !== window.parent || event.data !== 'start-ad') {
    return;
  }

  window.clearTimeout(fallbackTimer);
  startAnimation();
};

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  showFinalState();
} else {
  window.addEventListener('message', handleStartMessage);

  if (window.parent === window) {
    if (document.readyState === 'complete') {
      startAnimation();
    } else {
      window.addEventListener('load', startAnimation, { once: true });
    }
  } else {
    const scheduleFallback = () => {
      if (!animationStarted) {
        fallbackTimer = window.setTimeout(startAnimation, 5000);
      }
    };

    if (document.readyState === 'complete') {
      scheduleFallback();
    } else {
      window.addEventListener('load', scheduleFallback, { once: true });
    }
  }
}
