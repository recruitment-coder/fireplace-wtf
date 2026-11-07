const animationTiming = {
	intro: 4.5,
	productSlide: 2.5,
	logoReveal: 0.8,
	panelReveal: 0.7,
	copyReveal: 0.8,
	ctaReveal: 0.5,
	idleCycle: 4.8,
	stopAfter: 15,
	stopEase: 0.8,
};

const clickTag = window.clickTag || 'https://example.com/landing';
const adLink = document.querySelector('.ad__link');
const background = document.querySelector('.ad__layer--background');
const logo = document.querySelector('.ad__layer--logo');
const box = document.querySelector('.ad__layer--box');
const copy = document.querySelector('.ad__layer--copy');
const cta = document.querySelector('.ad__cta');
let animationStarted = false;
let fallbackTimer;
adLink.href = clickTag;

const showFinalState = () => {
	gsap.set(background, { x: 0, y: 0, opacity: 1 });
	gsap.set(logo, { opacity: 1, x: 0, y: 0, scale: 1 });
	gsap.set(box, { opacity: 0.8 });
	gsap.set(copy, { opacity: 1, x: 0, y: 0 });
	gsap.set(cta, { opacity: 1, x: 0, y: 0, scale: 1 });
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

	intro.to(background, {
		x: 0,
		duration: animationTiming.productSlide,
		ease: 'power3.out',
	});

	intro.to(logo, {
		opacity: 1,
		scale: 1,
		duration: animationTiming.logoReveal,
		ease: 'power2.out',
	}, 0.4);

	intro.to(box, {
		opacity: 0.8,
		duration: animationTiming.panelReveal,
		ease: 'power2.out',
	}, animationTiming.productSlide);

	intro.to(copy, {
		opacity: 1,
		duration: animationTiming.copyReveal,
		ease: 'power2.out',
	}, animationTiming.productSlide + animationTiming.panelReveal);

	intro.to(cta, {
		opacity: 1,
		y: 0,
		duration: animationTiming.ctaReveal,
		ease: 'power2.out',
	}, animationTiming.intro - animationTiming.ctaReveal);

	function startIdle() {
		const idle = gsap.timeline({ repeat: -1, yoyo: true });

		idle.to(background, {
			scale: 1.025,
			duration: animationTiming.idleCycle / 2,
			ease: 'sine.inOut',
		}, 0);

		idle.to(cta, {
			scale: 1.025,
			duration: animationTiming.idleCycle / 4,
			ease: 'sine.inOut',
		}, 0);

		gsap.delayedCall(
			Math.max(0, animationTiming.stopAfter - (performance.now() - startTime) / 1000),
			() => {
				idle.kill();
				gsap.to([background, cta], {
					x: 0,
					scale: 1,
					duration: animationTiming.stopEase,
					ease: 'power2.out',
				});
			},
		);
	}
};

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	startAnimation();
} else {
	window.addEventListener('message', (event) => {
		if (window.parent === window || event.source !== window.parent || event.data !== 'start-ad') {
			return;
		}

		window.clearTimeout(fallbackTimer);
		startAnimation();
	});

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
