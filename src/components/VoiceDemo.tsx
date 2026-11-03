import { useEffect, useMemo, useRef, useState } from 'react';
import { Mic, MicOff, RotateCcw, Volume2 } from 'lucide-react';
import { Waveform } from '../motion/Waveform';

type RecognitionResult = { transcript: string };
type RecognitionEvent = { resultIndex: number; results: ArrayLike<ArrayLike<RecognitionResult> & { isFinal?: boolean }> };
type RecognitionErrorEvent = { error: string };
type RecognitionLike = {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void; stop: () => void;
};
type RecognitionWindow = Window & { SpeechRecognition?: new () => RecognitionLike; webkitSpeechRecognition?: new () => RecognitionLike };

const sample = 'I want to grow Wispr Flow in India. Start with real campus conversations, help people build by voice, and make the first useful moment feel obvious.';

export function VoiceDemo({ onPulse }: { onPulse: () => void }) {
  const recognition = useRef<RecognitionLike | null>(null);
  const startAt = useRef(0);
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState('Ready when you are. Browser support varies.');
  const [simulated, setSimulated] = useState(false);
  const [wavePulse, setWavePulse] = useState(0);
  const words = useMemo(() => transcript.trim() ? transcript.trim().split(/\s+/).length : 0, [transcript]);
  const wpm = elapsed > 0 ? Math.round(words / (elapsed / 60)) : 0;
  const ratio = wpm / 40;

  useEffect(() => {
    const w = window as RecognitionWindow;
    setSupported(Boolean(w.SpeechRecognition || w.webkitSpeechRecognition));
    return () => { recognition.current?.stop(); };
  }, []);
  useEffect(() => {
    if (!listening) return;
    const timer = window.setInterval(() => setElapsed((performance.now() - startAt.current) / 1000), 250);
    return () => window.clearInterval(timer);
  }, [listening]);

  const start = () => {
    const w = window as RecognitionWindow;
    const Constructor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Constructor) { setStatus('Speech recognition is not supported in this browser. Try Chrome or Edge, or play the labelled sample.'); return; }
    try {
      const instance = new Constructor();
      instance.lang = 'en-IN'; instance.continuous = true; instance.interimResults = true;
      instance.onresult = (event) => {
        let finalText = '';
        let interimText = '';
        for (let i = 0; i < event.results.length; i += 1) {
          const item = event.results[i];
          if (!item) continue;
          if (item[0]?.transcript) {
            if (item.isFinal) finalText += `${item[0].transcript} `;
            else interimText += `${item[0].transcript} `;
          }
        }
        setTranscript(`${finalText}${interimText}`.trim());
        setWavePulse(v => v + 1); onPulse();
      };
      instance.onerror = (event) => { setStatus(`Browser recognition error: ${event.error}. Check microphone permission and browser support.`); setListening(false); };
      instance.onend = () => { setListening(false); setStatus('Recognition ended. Your transcript stays here.'); };
      recognition.current = instance; startAt.current = performance.now(); setElapsed(0); setTranscript(''); setSimulated(false); setStatus('Listening in English (India). Speak naturally.'); setListening(true); instance.start();
    } catch { setStatus('Could not start recognition. Check microphone permission and try again.'); setListening(false); }
  };
  const stop = () => { recognition.current?.stop(); setListening(false); setStatus('Stopped. Transcript retained.'); };
  const simulate = () => { recognition.current?.stop(); setListening(false); setTranscript(sample); setElapsed(15); setSimulated(true); setStatus('Simulated sample — this was not captured from your microphone.'); setWavePulse(v => v + 1); onPulse(); };
  const reset = () => { recognition.current?.stop(); setListening(false); setTranscript(''); setElapsed(0); setSimulated(false); setStatus('Ready when you are. Browser support varies.'); };

  return <section className="voice-demo" aria-label="Browser voice demo">
    <div className="voice-demo__head"><div><span className="eyebrow">TRY IT / IN YOUR BROWSER</span><h3>Say it. See it land.</h3></div><div className={`listening-state${listening ? ' is-live' : ''}`}><i />{listening ? 'LISTENING' : 'STANDBY'}</div></div>
    <div className="voice-demo__controls">
      <button data-cursor="listen" className={`mic-button${listening ? ' is-live' : ''}`} onClick={listening ? stop : start} aria-label={listening ? 'Stop browser voice demo' : 'Start browser voice demo'}><span className="mic-button__ring" />{listening ? <MicOff size={26} /> : <Mic size={26} />}</button>
      <div className="voice-demo__status"><strong>Browser voice demo</strong><p>{status}</p><span className="mono">LANG: EN-IN / CONTINUOUS / INTERIM</span><Waveform active={listening} pulse={wavePulse} /></div>
      <button data-cursor="play" className="sample-button" onClick={simulate}><Volume2 size={15} /> Play simulated sample</button>
      <button className="icon-button" onClick={reset} aria-label="Reset voice demo"><RotateCcw size={17} /></button>
    </div>
    <div className="voice-demo__transcript"><div className="transcript-label"><span>LIVE TRANSCRIPT</span>{simulated && <em>SIMULATED</em>}</div><p>{transcript || <span className="muted">Your words will show up here. This site does not save your audio or transcript.</span>}</p></div>
    <div className="voice-metrics">
      <div className="voice-metric"><span className="eyebrow">YOUR SPEAKING PACE</span><strong>{wpm}<small> wpm</small></strong><div className="meter"><i style={{ width: `${Math.min(100, (wpm / 180) * 100)}%` }} /></div></div>
      <div className="voice-metric"><span className="eyebrow">TYPING BASELINE</span><strong>40<small> wpm</small></strong><div className="meter"><i style={{ width: `${40 / 180 * 100}%` }} /></div></div>
      <div className="voice-metric voice-metric--ratio"><span className="eyebrow">SPEECH / TYPING</span><strong>{ratio.toFixed(1)}<small>×</small></strong><p>{wpm > 40 ? 'Above the 40 wpm baseline.' : 'Build a longer sample to compare fairly.'}</p></div>
    </div>
    <p className="micro-note">WPM is a rough live estimate based on recognized words and elapsed time, not a benchmark test. Actual recognition depends on your browser and microphone permissions. {supported ? 'Speech recognition is available in this browser.' : 'Speech recognition is unavailable here; use the clearly labelled simulated sample.'}</p>
  </section>;
}
