
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUpRight,
  AudioWaveform,
  MoveUpRight,
} from 'lucide-react';

import { identity, metrics, campaigns } from '../content/site';
import { Counter } from '../components/Counter';
import { GrowthControlRoom } from '../components/GrowthControlRoom';
import { Spotlight } from '../components/Spotlight';
import { Magnetic } from '../components/Magnetic';
import { Marquee } from '../motion/Marquee';

const HeroField = lazy(() => import('../components/HeroField'));

export function Home() {
  return (
    <div className="page home-page">

      {/* ========================================
          01. HERO — CODERUDRA-X IDENTITY
      ======================================== */}

      <section className="hero section-pad">

        <div className="hero-bg">
          <Suspense
            fallback={
              <div className="hero-field hero-field--fallback" />
            }
          >
            <HeroField />
          </Suspense>
        </div>

        <div className="hero-topline">
          <span className="eyebrow">
            INDEPENDENT BUILDER / {identity.location.toUpperCase()}
          </span>

          <span className="mono">
            PORTFOLIO / 2026
          </span>
        </div>

        <div className="hero-copy">

          <div className="hero-index">
            <span className="hero-index__line" />

            <span className="eyebrow">
              ENGINEERING × COMMUNITY × GROWTH
            </span>
          </div>

          <h1>
            CODERUDRA-X
            <br />
            <em>Build. Break. Rebuild.</em>
          </h1>

          <div className="hero-bottomline">

            <p>
              {identity.alias}: {identity.mission}
            </p>

            <div className="hero-actions">

              <Magnetic>
                <Link
                  className="button button--primary"
                  to="/builds"
                >
                  Explore the builds
                  <MoveUpRight size={16} />
                </Link>
              </Magnetic>

              <Link
                className="text-link"
                to="/thread"
              >
                Read the thread
                <ArrowUpRight size={15} />
              </Link>

              <Link
                className="text-link text-link--voice"
                to="/voice"
              >
                Experience voice
                <AudioWaveform size={16} />
              </Link>

            </div>
          </div>

        </div>

        <div className="hero-aside">

          <span className="vertical-label">
            BUILDING SYSTEMS THAT SURVIVE REAL INPUT
          </span>

          <div className="hero-aside__wave">
            <AudioWaveform size={19} />

            <span className="mono">
              VOICE / INPUT / OUTPUT
            </span>
          </div>

        </div>

        <button
          type="button"
          className="scroll-cue"
          onClick={() => {
            const reducedMotion = window.matchMedia(
              '(prefers-reduced-motion: reduce)'
            ).matches;

            document
              .getElementById('growth-control')
              ?.scrollIntoView({
                behavior: reducedMotion ? 'auto' : 'smooth',
              });
          }}
          aria-label="Scroll to explore the growth plan"
        >
          <span>SCROLL TO EXPLORE THE GROWTH PLAN</span>
          <ArrowDown size={15} />
        </button>

        <div className="hero-corner mono">
          01 — 08
          <br />
          CRX / STUDIO LOG
        </div>

      </section>


      {/* ========================================
          02. INTRO — THE PHILOSOPHY
      ======================================== */}

      <section className="intro-band section-pad">

        <div className="eyebrow">
          THE POINT
        </div>

        <p>
          I build software. I test ideas in public.
          Sometimes the room fills up. Sometimes it doesn't.

          <span>
            Both are part of the work.
          </span>
        </p>

        <div className="intro-band__stamp">
          NO
          <br />
          COSTUME
          <br />
          JUST WORK.
        </div>

      </section>


      {/* ========================================
          03. WISPR FLOW — INDIA GROWTH CONTROL ROOM
      ======================================== */}

      <section
        id="growth-control"
        className="section-pad voice-section growth-section"
      >

        <div className="section-heading">

          <div>
            <span className="eyebrow">
              01 / THE WISPR FLOW PITCH
            </span>

            <h2>
              Make voice a habit.
              <br />
              <i>Not a one-time demo.</i>
            </h2>
          </div>

          <p>
            Three proposed India growth experiments.
            Choose one to inspect its goal, channel,
            success metric and first-week execution.

            These are plans, not results.
          </p>

        </div>

        <GrowthControlRoom />

      </section>


      {/* ========================================
          04. NUMBERS — EVIDENCE
      ======================================== */}

      <section className="numbers-section section-pad">

        <div className="section-heading section-heading--compact">

          <div>
            <span className="eyebrow">
              02 / THE RECEIPTS
            </span>

            <h2>
              Some numbers.
              <br />
              <i>Full context.</i>
            </h2>
          </div>

          <p>
            Wins and misses belong in the same room.
            These are the numbers supplied for this portfolio,
            not live counters.
          </p>

        </div>

        <div className="numbers-grid">

          {metrics.map((item, i) => (
            <div
              className={`number-cell number-cell--${i + 1}`}
              key={item.label}
            >

              <span className="mono number-index">
                0{i + 1} / DATA POINT
              </span>

              <strong>
                <Counter
                  value={item.value}
                  suffix={item.suffix}
                />
              </strong>

              <span className="number-label">
                {item.label}
              </span>

              <span className="number-note">
                {item.note}
              </span>

            </div>
          ))}

        </div>

        <p className="micro-note">
          Metrics are presented as owner-supplied figures.
          The 99.2% project recall and competition placements
          are documented on their own pages.
        </p>

      </section>


      {/* ========================================
          05. THE THREAD — YOUR JOURNEY
      ======================================== */}

      <section className="thread-teaser section-pad">

        <div className="thread-teaser__left">

          <span className="eyebrow">
            03 / THE THREAD
          </span>

          <div className="thread-giant">
            5
            <span>CHAPTERS</span>
          </div>

        </div>

        <div className="thread-teaser__right">

          <h2>
            Not a highlight reel.
            <br />
            <i>A build log.</i>
          </h2>

          <p>
            Origin. Builder. Community. Scale. Now.

            The useful part is what changed between the chapters.
          </p>

          <Link
            to="/thread"
            className="button button--line"
          >
            Follow the thread
            <ArrowUpRight size={16} />
          </Link>

        </div>

        <Marquee>
          BUILD → BREAK → REBUILD
        </Marquee>

      </section>


      {/* ========================================
          06. CAMPAIGNS — GROWTH EXPERIMENTS
      ======================================== */}

      <section className="campaign-teaser section-pad">

        <div className="section-heading section-heading--compact">

          <div>
            <span className="eyebrow">
              04 / THE WISPR FLOW PITCH
            </span>

            <h2>
              Three experiments.
              <br />
              <i>Not promises.</i>
            </h2>
          </div>

          <Link
            className="text-link"
            to="/campaigns"
          >
            See the campaign plans
            <ArrowUpRight size={15} />
          </Link>

        </div>

        <div className="campaign-mini-grid">

          {campaigns.map((campaign, index) => (
            <Spotlight
              className="campaign-mini"
              key={campaign.id}
            >

              <span className="mono">
                {campaign.tag}
              </span>

              <span className="campaign-mini__number">
                0{index + 1}
              </span>

              <h3>
                {campaign.title}
              </h3>

              <p>
                {campaign.subtitle}
              </p>

              <Link
                to="/campaigns"
                aria-label={`Read ${campaign.title} plan`}
              >
                OPEN PLAN
                <ArrowUpRight size={14} />
              </Link>

            </Spotlight>
          ))}

        </div>

      </section>


      {/* ========================================
          07. CLOSING — START A CONVERSATION
      ======================================== */}

      <section className="home-closer section-pad">

        <div className="eyebrow">
          END OF HOME / START OF CONVERSATION
        </div>

        <h2>
          Make the next
          <br />
          <span>thing useful.</span>
        </h2>

        <div className="home-closer__bottom">

          <p>
            Shreyansh Srivastava / CRX
            <br />
            B.Tech CSE (Data Science) · UIT Prayagraj
          </p>

          <Link
            to="/contact"
            className="button button--primary"
          >
            Let's talk
            <ArrowUpRight size={16} />
          </Link>

        </div>

      </section>

    </div>
  );
}
