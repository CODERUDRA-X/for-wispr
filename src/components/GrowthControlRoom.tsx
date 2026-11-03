import { useState } from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, Megaphone, Mic, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { campaigns } from '../content/site';

const campaignModes = [
  { label: 'CAMPUS BUILD CHALLENGE', icon: Mic, descriptor: 'MAKE THE PRODUCT TANGIBLE' },
  { label: 'CREATOR DISTRIBUTION', icon: Megaphone, descriptor: 'SHOW THE REAL WORKFLOW' },
  { label: 'CAMPUS AMBASSADOR LOOP', icon: Users, descriptor: 'TURN REACH INTO A REPEATABLE LOOP' },
] as const;

export function GrowthControlRoom() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCampaign = campaigns[selectedIndex] ?? campaigns[0];
  const selectedMode = campaignModes[selectedIndex] ?? campaignModes[0];
  const ModeIcon = selectedMode.icon;

  return (
    <section className="growth-console" aria-label="Wispr Flow India growth experiment selector">
      <aside className="growth-console__rail">
        <div className="growth-console__rail-head">
          <span className="eyebrow">SELECT A GROWTH LEVER</span>
          <p>Three growth loops.<br />One clear test at a time.</p>
        </div>

        <div className="growth-console__choices" role="group" aria-label="Choose a proposed growth experiment">
          {campaigns.map((campaign, index) => {
            const ChoiceIcon = campaignModes[index]?.icon ?? Target;
            const isActive = selectedIndex === index;

            return (
              <button
                className={`growth-choice${isActive ? ' is-active' : ''}`}
                key={campaign.id}
                type="button"
                aria-pressed={isActive}
                aria-controls="growth-console-detail"
                onClick={() => setSelectedIndex(index)}
              >
                <span className="growth-choice__number">0{index + 1}</span>
                <span className="growth-choice__copy">
                  <strong>{campaign.title}</strong>
                  <small>{campaign.subtitle}</small>
                </span>
                <ChoiceIcon size={17} aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div className="growth-console__rail-foot">
          <span className="status-dot" />
          <span className="mono">STRATEGY MODE / NOT LIVE DATA</span>
        </div>
      </aside>

      <div className="growth-console__detail" id="growth-console-detail" aria-live="polite">
        <div className="growth-console__topline">
          <span className="mono">{selectedCampaign.tag}</span>
          <span className="growth-proposal-status"><i /> PROPOSED PILOT</span>
        </div>

        <div className="growth-console__intro">
          <div className="growth-console__mode">
            <ModeIcon size={15} aria-hidden="true" />
            <span>{selectedMode.label}</span>
          </div>
          <h3>{selectedCampaign.title}<span>.</span></h3>
          <p>{selectedCampaign.goal}</p>
          <span className="growth-console__descriptor">{selectedMode.descriptor}</span>
        </div>

        <div className="growth-console__specs">
          <article className="growth-spec">
            <span className="eyebrow"><Users size={12} /> DISTRIBUTION CHANNEL</span>
            <p>{selectedCampaign.channel}</p>
          </article>
          <article className="growth-spec growth-spec--metric">
            <span className="eyebrow"><Target size={12} /> SUCCESS SIGNAL / PROPOSED</span>
            <p>{selectedCampaign.metric}</p>
          </article>
        </div>

        <div className="growth-console__execution">
          <div className="growth-console__execution-head">
            <div>
              <span className="eyebrow"><CalendarDays size={12} /> FIRST 7 DAYS</span>
              <h4>Execution sequence</h4>
            </div>
            <span className="mono">{selectedCampaign.week.length} KEY MOVES</span>
          </div>

          <ol className="growth-steps">
            {selectedCampaign.week.map((step, index) => (
              <li key={`${selectedCampaign.id}-${step}`}>
                <span className="growth-steps__number">0{index + 1}</span>
                <span>{step}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>

        <div className="growth-console__footer">
          <div className="growth-console__honesty">
            <span className="growth-console__honesty-mark"><Target size={17} /></span>
            <p><strong>No vanity-result claims.</strong><br />These are proposed tests. No installs, conversions, or retention outcomes are being presented as achieved.</p>
          </div>
          <Link className="growth-console__link" to="/campaigns">
            OPEN FULL PLANS <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
