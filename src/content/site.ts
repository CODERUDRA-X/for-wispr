export type FillKey =
  | 'origin-flop'
  | 'builder-flop'
  | 'scale-flop'
  | 'builder-learned'
  | 'builder-next'
  | 'wispr-fit'
  | 'growth-reason'
  | 'vibe-how'
  | 'ideathon-learning'
  | 'community-change'
  | 'community-target'
  | 'scale-role'
  | 'scale-learned'
  | 'scale-next'
  | 'now-learned'
  | 'now-next'
  | 'availability'
  | 'bangalore-plan'
  | 'aegis-repo'
  | 'vanshika-repo'
  | 'voice-raw'
  | 'voice-clean';

export const identity = {
  name: 'Shreyansh Srivastava',
  alias: 'CODERUDRA-X',
  short: 'CRX',
  degree: 'B.Tech CSE (Data Science)',
  institute: 'United Institute of Technology, Prayagraj',
  affiliation: 'AKTU',
  location: 'Prayagraj, India',
  stack: ['Python', 'React', 'FastAPI', 'Computer Vision', 'UI/UX'],
  mission: 'I build AI systems, and I build the people who build them.',
} as const;

export const links = {
  linkedin: 'https://linkedin.com/in/coderudrax',
  x: 'https://x.com/coderudrax',
  github: 'https://github.com/CODERUDRA-X',
  hashnode: 'https://coderudra-x.hashnode.dev',
  kaggle: 'https://kaggle.com/coderudrax',
  community: 'https://wegeminibuilders.xyz',
  ecspl: 'https://ecspl.in',
} as const;

export const metrics = [
  { value: 600, suffix: '+', label: 'Vibe Coding Hack attendees', note: 'Nov 2025' },
  {
  value: 2,
  suffix: 'nd',
  label: 'Global Reddit Rank',
  note: '#2 trending — community recognition'
},
  { value: 2500, suffix: '+', label: 'Pan-India hackathon participants', note: '110+ colleges' },
  { value: 1700, suffix: '+', label: 'Competitive programming rating', note: 'Peak shared in brief' },
  { value: 6000, suffix: '', label: 'Social followers', note: 'Snapshot supplied by owner' },
] as const;

export const chapters = [
  {
    id: 'origin', number: '01', title: 'Origin', eyebrow: 'CONTESTS → SYSTEMS',
    did: ['Maths Olympiad — national rank 90', 'Early coding contests', 'HCL TechBee right after Class XII'],
    wrong: null,
    learned: 'I keep building.',
    next: 'Moved from contests to systems that run.',
  },
  {
    id: 'builder', number: '02', title: 'Builder', eyebrow: 'FROM MODELS TO SYSTEMS',
    did: ['AEGIS-SWARM — consensus-driven multi-agent AI; AIR 10 at National AI Hackday', 'VidyutNetra AI — power-grid inspection; 99.2% damage recall', 'Vanshika — no-LLM Hinglish parser; “2 ghante baad chai” becomes a timestamp'],
    wrong: null,
    learned: null,
    next: null,
  },
  {
    id: 'community', number: '03', title: 'Community', eyebrow: 'ROOMS ARE BUILT, NOT CLAIMED',
    did: ['Gemini Builders Community at UIT', 'Vibe Coding Hack, November 2025 — 600+ attendees', 'Brand Ideathon — a 19-page brand kit and a premium DSA resource as the reward'],
    wrong: 'Only two people showed up to the Brand Ideathon.',
    learned: null,
    next: null,
  },
  {
    id: 'scale', number: '04', title: 'Scale', eyebrow: 'OPERATIONS IS PRODUCT WORK',
    did: ['Operations and logistics for India Tech Summit: Innovate 2026', 'A Pan-India GSA hackathon with 2,500+ participants across 110+ colleges', 'Built an automation pipeline to evaluate 600–700 submissions'],
    wrong: null,
    learned: null,
    next: null,
  },
  {
    id: 'now', number: '05', title: 'Now', eyebrow: 'THE NEXT EXPERIMENT',
    did: ['I want to grow Wispr Flow in India.', 'The campaign concepts on this site are proposals, not reported outcomes.'],
    wrong: 'No campaign has been executed yet; these are plans, not results.',
    learned: null,
    next: null,
  },
] as const;

export const builds = [
  {
    id: 'aegis', name: 'AEGIS-SWARM', category: 'MULTI-AGENT AI', number: '01',
    pitch: 'A recommendation should survive disagreement before it becomes a decision.',
    facts: ['Consensus-driven multi-agent AI', 'AIR 10 at National AI Hackday'],
    repo: null,
  },
  {
    id: 'vidyutnetra', name: 'VidyutNetra AI', category: 'COMPUTER VISION', number: '02',
    pitch: 'Computer vision for power-grid inspection, built around finding damage that matters.',
    facts: ['Power-grid inspection', '99.2% damage recall', 'Reference: ecspl.in'],
    repo: links.ecspl,
  },
  {
    id: 'vanshika', name: 'Vanshika', category: 'HINGLISH PARSING', number: '03',
    pitch: 'A no-LLM Hinglish parser that turns everyday time phrases into timestamps.',
    facts: ['“2 ghante baad chai” → a timestamp', 'Rule-based parsing; limits are shown in the demo'],
    repo: null,
  },
] as const;

export const campaigns = [
  {
    id: 'voice-campus', tag: 'PROPOSAL / 01', title: 'Build by Voice', subtitle: 'A campus build challenge',
    goal: 'Make voice input tangible: ship a working project by dictating it.',
    channel: 'College clubs, WhatsApp / Discord, and one flagship event.',
    metric: 'Entries and week-4 active users.',
    week: ['Lock rules and judging rubric', 'Pitch college clubs', 'Open registration', 'Run a live build demo', 'Publish the first leaderboard'],
  },
  {
    id: 'hinglish-clips', tag: 'PROPOSAL / 02', title: 'Hinglish demo clips', subtitle: 'Proof over polish',
    goal: 'Show real speech, real mistakes, and the speed of getting thoughts down.',
    channel: 'X and LinkedIn, using tagged links.',
    metric: 'Install clicks per clip via tagged links.',
    week: ['Write 10 short scripts', 'Record in one sitting', 'Post daily', 'Review click-throughs', 'Double down on the top two formats'],
  },
  {
    id: 'ambassador-loop', tag: 'PROPOSAL / 03', title: 'Campus ambassador loop', subtitle: 'A repeatable college engine',
    goal: 'Turn campus relationships into a measurable, repeatable install loop.',
    channel: 'One ambassador per college, a one-page kit, and a weekly leaderboard.',
    metric: 'Installs per ambassador and week-4 active users.',
    week: ['Create the one-page kit', 'Shortlist campuses', 'Onboard ambassadors', 'Issue referral links', 'Publish the first leaderboard'],
  },
] as const;

export const askItems = [
  {
    question: 'What did you own?',
    answer: 'I built an automation pipeline to evaluate 600–700 submissions for the India Tech Summit: Innovate 2026 hackathon. My exact operations and logistics title still needs to be stated precisely.',
    fill: 'scale-role' as FillKey,
  },
  {
    question: 'What failed?',
    answer: 'The Brand Ideathon. I put together a 19-page brand kit and made a premium DSA resource the reward. Two people showed up. What I misread and what I changed afterward need a more specific account.',
    fill: 'ideathon-learning' as FillKey,
  },
  {
    question: 'Why growth?',
    answer: 'I want to grow Wispr Flow in India. The personal reason, prior growth examples, and the specific kind of work I want to own still need a fact-backed answer.',
    fill: 'growth-reason' as FillKey,
  },
  {
    question: 'How do you run 110+ colleges?',
    answer: 'I can point to one scale experience: a Pan-India GSA hackathon with 2,500+ participants across 110+ colleges, plus an automation pipeline for 600–700 submissions. My exact role and operating playbook need more detail.',
    fill: 'scale-role' as FillKey,
  },
  {
    question: 'Why Wispr Flow?',
    answer: 'I want to grow Wispr Flow in India. The specific product insight or personal reason that makes this a strong fit has not been supplied yet.',
    fill: 'wispr-fit' as FillKey,
  },
  {
    question: 'When can you start?',
    answer: 'I am a B.Tech student at UIT Prayagraj on an intern track. Exact availability and the Bangalore plan are not supplied yet.',
    fill: 'availability' as FillKey,
  },
] as const;

export const arsenal = {
  hackathons: ['ICUB8 2025 — winner', 'TechZephyr 4.0 — national finalist', 'Elite Coders Summer of Code — top 20'],
  internships: ['Empyrean Robotic Technologies', 'Promptly AI'],
  projects: ['FlowSync AI'],
  openSource: ['Open source contributions'],
};

export const fills: Record<FillKey, { label: string; path: string; prompt: string }> = {
  'origin-flop': { label: 'Origin: what went wrong', path: 'src/content/site.ts → chapters[0].wrong', prompt: 'One short, matter-of-fact sentence about what went wrong in your origin chapter.' },
  'builder-flop': { label: 'Builder: what went wrong', path: 'src/content/site.ts → chapters[1].wrong', prompt: 'A specific builder setback, described factually.' },
  'scale-flop': { label: 'Scale: what went wrong', path: 'src/content/site.ts → chapters[3].wrong', prompt: 'A real operational setback from Innovate 2026, or confirm there was none you want to report.' },
  'builder-learned': { label: 'Builder: what I learned', path: 'src/content/site.ts → chapters[1].learned', prompt: 'A specific lesson learned across AEGIS-SWARM, VidyutNetra AI, or Vanshika.' },
  'builder-next': { label: 'Builder: what I did next', path: 'src/content/site.ts → chapters[1].next', prompt: 'The concrete next action that followed the builder chapter.' },
  'wispr-fit': { label: 'Why Wispr Flow', path: 'src/content/site.ts → askItems[4]', prompt: 'Your personal product insight and why your experience makes this role a fit.' },
  'growth-reason': { label: 'Why growth', path: 'src/content/site.ts → askItems[2]', prompt: 'A fact-backed explanation of why growth work matters to you, with an example.' },
  'vibe-how': { label: 'How the Vibe Coding Hack reached 600+', path: 'src/pages/Community.tsx', prompt: 'Your exact role, channels, partners, and what drove attendance.' },
  'ideathon-learning': { label: 'What the Brand Ideathon taught you', path: 'src/content/site.ts → chapters[2].learned', prompt: 'What you got wrong and what you learned from only two attendees.' },
  'community-change': { label: 'What changed after the Ideathon', path: 'src/pages/Community.tsx', prompt: 'Concrete changes you made to event design, distribution, or validation.' },
  'community-target': { label: 'Your next community target', path: 'src/pages/Community.tsx', prompt: 'A measurable target number, timeframe, and what counts as success.' },
  'scale-role': { label: 'Exact role at Innovate 2026', path: 'src/content/site.ts → chapters[3] and askItems', prompt: 'Official title, scope, team size, decisions owned, and reporting line.' },
  'scale-learned': { label: 'Scale: what I learned', path: 'src/content/site.ts → chapters[3].learned', prompt: 'A concrete operational lesson from coordinating a 110+ college event.' },
  'scale-next': { label: 'Scale: what I did next', path: 'src/content/site.ts → chapters[3].next', prompt: 'The concrete follow-on action after Innovate 2026.' },
  'now-learned': { label: 'Now: what I learned', path: 'src/content/site.ts → chapters[4].learned', prompt: 'What you have learned so far that informs your Wispr Flow growth plan.' },
  'now-next': { label: 'Now: next action', path: 'src/content/site.ts → chapters[4].next', prompt: 'The specific next action you plan to take, distinct from the campaign proposals.' },
  availability: { label: 'Internship availability', path: 'src/pages/Contact.tsx', prompt: 'Earliest start date, weekly hours, semester constraints, and internship duration.' },
  'bangalore-plan': { label: 'Bangalore plan', path: 'src/pages/Contact.tsx', prompt: 'Whether relocation is possible, expected timeline, and any constraints.' },
  'aegis-repo': { label: 'AEGIS-SWARM repository URL', path: 'src/content/site.ts → builds[0].repo', prompt: 'Paste the public repository URL.' },
  'vanshika-repo': { label: 'Vanshika repository URL', path: 'src/content/site.ts → builds[2].repo', prompt: 'Paste the public repository URL.' },
  'voice-raw': { label: 'Raw voice receipt', path: 'src/pages/Voice.tsx', prompt: 'Paste a real, unedited spoken excerpt. Do not write a cleaned-up version here.' },
  'voice-clean': { label: 'Cleaned voice receipt', path: 'src/pages/Voice.tsx', prompt: 'Paste the edited version of the same spoken excerpt.' },
};
