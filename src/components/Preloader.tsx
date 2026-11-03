import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const INTRO_DURATION = 3150;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
  warm: boolean;
};

export function Preloader() {
  const [show, setShow] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  const finishIntro = () => {
  setShow(false);
};

 useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  setShow(true);

  const timer = window.setTimeout(() => {
    setShow(false);
  }, INTRO_DURATION);

  return () => window.clearTimeout(timer);
}, []);

  useEffect(() => {
    if (!show) return;

    const activeElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    skipRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        finishIntro();
      } else if (event.key === 'Tab') {
        // The intro has one action, so keep keyboard focus inside the dialog.
        event.preventDefault();
        skipRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (activeElement?.isConnected) activeElement.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    if (!show) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: Particle[] = [];
    let lastTime = 0;
    const reduceWork = window.matchMedia('(max-width: 640px)').matches;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = reduceWork ? 44 : 88;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.13,
        vy: (Math.random() - 0.5) * 0.13,
        radius: Math.random() * 1.1 + 0.25,
        alpha: Math.random() * 0.42 + 0.12,
        phase: Math.random() * Math.PI * 2,
        warm: Math.random() > 0.84,
      }));
    };

    const render = (time: number) => {
      const delta = Math.min((time - (lastTime || time)) / 16.67, 2);
      lastTime = time;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        if (particle.x < -3) particle.x = width + 3;
        if (particle.x > width + 3) particle.x = -3;
        if (particle.y < -3) particle.y = height + 3;
        if (particle.y > height + 3) particle.y = -3;

        const twinkle = 0.72 + Math.sin(time * 0.0008 + particle.phase) * 0.28;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = particle.warm
          ? `rgba(255, 176, 32, ${particle.alpha * twinkle})`
          : `rgba(225, 229, 235, ${particle.alpha * twinkle})`;
        context.fill();
      });

      frame = window.requestAnimationFrame(render);
    };

    resize();
    frame = window.requestAnimationFrame(render);
    window.addEventListener('resize', resize, { passive: true });

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
      } else {
        lastTime = 0;
        frame = window.requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader preloader--ignition"
          role="dialog"
          aria-modal="true"
          aria-label="CODERUDRA-X intro sequence"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(9px)', transition: { duration: 0.58, ease: [0.7, 0, 0.2, 1] } }}
        >
          <canvas ref={canvasRef} className="ignition-particles" aria-hidden="true" />
          <div className="ignition-grid" aria-hidden="true" />
          <div className="ignition-vignette" aria-hidden="true" />

          <div className="ignition-frame">
            <header className="ignition-topline">
              <div className="ignition-identity">
                <span className="ignition-mark">CR<span>X</span></span>
                <span className="ignition-divider" />
                <span className="ignition-microcopy">INDEPENDENT BUILDER<br />FIELD SYSTEM / 001</span>
              </div>
              <div className="ignition-system-state"><i /> PORTFOLIO BOOT SEQUENCE</div>
            </header>

            <main className="ignition-stage" aria-label="Build, break, rebuild">
              <div className="ignition-coordinate ignition-coordinate--left" aria-hidden="true">
                <span>INPUT / SIGNAL</span>
                <b>01—03</b>
              </div>
              <div className="ignition-coordinate ignition-coordinate--right" aria-hidden="true">
                <span>OUTPUT / SYSTEMS</span>
                <b>CRX_IDENTITY</b>
              </div>

              <div className="ignition-orbit-system" aria-hidden="true">
                <div className="ignition-axis ignition-axis--horizontal" />
                <div className="ignition-axis ignition-axis--vertical" />
                <div className="ignition-orbit ignition-orbit--outer"><span>BUILD / 01</span></div>
                <div className="ignition-orbit ignition-orbit--middle"><span>BREAK / 02</span></div>
                <div className="ignition-orbit ignition-orbit--inner"><span>REBUILD / 03</span></div>
                <div className="ignition-core">
                  <span className="ignition-core__top">CRX / CORE</span>
                  <strong>CR<span>X</span></strong>
                  <span className="ignition-core__bottom">SIGNAL LOCKED</span>
                </div>
                <span className="ignition-satellite ignition-satellite--one" />
                <span className="ignition-satellite ignition-satellite--two" />
                <span className="ignition-satellite ignition-satellite--three" />
              </div>

              <div className="ignition-wordmark">
                <span className="ignition-wordmark__eyebrow">NOT A TEMPLATE. A BUILD LOG.</span>
                <h1>CODERUDRA<span>-X</span></h1>
                <p>BUILD<span>.</span> BREAK<span>.</span> REBUILD<span>.</span></p>
              </div>
            </main>

            <footer className="ignition-bottomline">
              <div className="ignition-footer-note">
                <span className="ignition-live-dot" />
                <span>THINK / BUILD / ITERATE</span>
              </div>
              <div className="ignition-progress" aria-hidden="true"><i /></div>
              <button ref={skipRef} type="button" className="ignition-skip" onClick={finishIntro}>
                SKIP INTRO <span aria-hidden="true">↗</span>
              </button>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
