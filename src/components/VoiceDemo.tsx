import { useEffect, useMemo, useRef, useState } from 'react';
import { Mic, MicOff, RotateCcw, Volume2 } from 'lucide-react';
import { Waveform } from '../motion/Waveform';

type RecognitionAlternativeLike = { transcript: string };
type RecognitionResultLike = ArrayLike<RecognitionAlternativeLike> & { isFinal: boolean };
type RecognitionEventLike = { resultIndex: number; results: ArrayLike<RecognitionResultLike> };
type RecognitionErrorLike = { error: string };
type RecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onerror: ((event: RecognitionErrorLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type RecognitionWindow = Window & {
  SpeechRecognition?: new () => RecognitionLike;
  webkitSpeechRecognition?: new () => RecognitionLike;
};
type SpeechLanguage = 'en-IN' | 'hi-IN';
type TranscriptChunk = { text: string; isFinal: boolean };

const sample = 'I want to grow Wispr Flow in India. Start with real campus conversations, help people build by voice, and make the first useful moment feel obvious.';

function describeRecognitionError(error: string): string {
  switch (error) {
    case 'not-allowed':
    case 'service-not-allowed':
      return 'Microphone or speech recognition permission was blocked. Check this site’s browser permissions and try again.';
    case 'no-speech':
      return 'No speech was detected. Try again and speak closer to your microphone.';
    case 'audio-capture':
      return 'No microphone is available. Connect or enable a microphone, then try again.';
    case 'network':
      return 'The browser speech service reported a network error. Check your connection and retry.';
    default:
      return `Browser recognition error: ${error}. Check microphone permission and try again.`;
  }
}

export function VoiceDemo({ onPulse }: { onPulse?: () => void }) {
  const recognition = useRef<RecognitionLike | null>(null);
  const startAt = useRef(0);
  const stopRequested = useRef(false);
  const endMode = useRef<'normal' | 'simulated' | 'reset'>('normal');
  const chunks = useRef<TranscriptChunk[]>([]);
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState('Ready when you are. Browser support varies.');
  const [simulated, setSimulated] = useState(false);
  const [wavePulse, setWavePulse] = useState(0);
  const [language, setLanguage] = useState<SpeechLanguage>('en-IN');

  const words = useMemo(() => transcript.trim() ? transcript.trim().split(/\s+/).length : 0, [transcript]);
  const wpm = elapsed > 0 ? Math.round(words / (elapsed / 60)) : 0;
  const ratio = wpm / 40;

  useEffect(() => {
    const browserWindow = window as RecognitionWindow;
    setSupported(Boolean(browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition));
    return () => {
      stopRequested.current = true;
      recognition.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (!listening) return;
    const timer = window.setInterval(() => {
      setElapsed((performance.now() - startAt.current) / 1000);
    }, 250);
    return () => window.clearInterval(timer);
  }, [listening]);

  const start = () => {
    const browserWindow = window as RecognitionWindow;
    const Constructor = browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition;

    if (!Constructor) {
      setStatus('Speech recognition is not supported in this browser. Try an up-to-date Chrome or Edge browser, or play the clearly labelled simulated sample.');
      return;
    }

    try {
      const instance = new Constructor();
      stopRequested.current = false;
      endMode.current = 'normal';
      chunks.current = [];
      instance.lang = language;
      instance.continuous = true;
      instance.interimResults = true;

      instance.onresult = (event) => {
        for (let index = event.resultIndex; index < event.results.length; index += 1) {
          const result = event.results[index];
          if (!result) continue;

          const text = result[0]?.transcript?.trim() ?? '';
          if (text) {
            chunks.current[index] = { text, isFinal: result.isFinal };
          }
        }

        const finalText = chunks.current.filter(chunk => chunk?.isFinal).map(chunk => chunk.text).join(' ');
        const interimText = chunks.current.filter(chunk => chunk && !chunk.isFinal).map(chunk => chunk.text).join(' ');
        setTranscript([finalText, interimText].filter(Boolean).join(' ').trim());
        setWavePulse(value => value + 1);
        onPulse?.();
      };

      instance.onerror = (event) => {
        setStatus(describeRecognitionError(event.error));
        setListening(false);
        setElapsed((performance.now() - startAt.current) / 1000);
      };

      instance.onend = () => {
        setListening(false);
        setElapsed((performance.now() - startAt.current) / 1000);
        if (endMode.current === 'simulated' || endMode.current === 'reset') return;
        setStatus(stopRequested.current ? 'Stopped. Your transcript remains on this page.' : 'Recognition ended. Your transcript remains on this page.');
      };

      recognition.current = instance;
      startAt.current = performance.now();
      setElapsed(0);
      setTranscript('');
      setSimulated(false);
      setStatus(`Listening in ${language === 'en-IN' ? 'English (India)' : 'Hindi (India)'}. Speak naturally.`);
      setListening(true);
      instance.start();
    } catch {
      setStatus('Could not start recognition. Check microphone permission and make sure no other app is controlling the microphone.');
      setListening(false);
    }
  };

  const stop = () => {
    stopRequested.current = true;
    recognition.current?.stop();
    setListening(false);
    setElapsed((performance.now() - startAt.current) / 1000);
    setStatus('Stopped. Your transcript remains on this page.');
  };

  const simulate = () => {
    endMode.current = 'simulated';
    stopRequested.current = true;
    recognition.current?.stop();
    setListening(false);
    chunks.current = [];
    setTranscript(sample);
    setElapsed(15);
    setSimulated(true);
    setStatus('Simulated sample — this text was not captured from your microphone.');
    setWavePulse(value => value + 1);
    onPulse?.();
  };

  const reset = () => {
    endMode.current = 'reset';
    stopRequested.current = true;
    recognition.current?.stop();
    setListening(false);
    chunks.current = [];
    setTranscript('');
    setElapsed(0);
    setSimulated(false);
    setStatus('Ready when you are. Browser support varies.');
  };

  const changeLanguage = (nextLanguage: SpeechLanguage) => {
    if (listening || nextLanguage === language) return;
    reset();
    setLanguage(nextLanguage);
  };

  return <section className="voice-demo" aria-label="Live browser speech recognition demo">
    <div className="voice-demo__head">
      <div>
        <span className="eyebrow">TRY IT / IN YOUR BROWSER</span>
        <h3>Say it. See it land.</h3>
      </div>
      <div className={`listening-state${listening ? ' is-live' : ''}`} aria-live="polite">
        <i />{listening ? 'LISTENING' : 'STANDBY'}
      </div>
    </div>

    <div className="voice-demo__language" role="group" aria-label="Speech recognition language">
      <span className="eyebrow">RECOGNITION LANGUAGE</span>
      <button type="button" className={language === 'en-IN' ? 'is-active' : ''} aria-pressed={language === 'en-IN'} disabled={listening} onClick={() => changeLanguage('en-IN')}>ENGLISH / INDIA</button>
      <button type="button" className={language === 'hi-IN' ? 'is-active' : ''} aria-pressed={language === 'hi-IN'} disabled={listening} onClick={() => changeLanguage('hi-IN')}>HINDI / INDIA</button>
    </div>

    <div className="voice-demo__controls">
      <button type="button" data-cursor="listen" className={`mic-button${listening ? ' is-live' : ''}`} onClick={listening ? stop : start} aria-label={listening ? 'Stop browser voice demo' : 'Start browser voice demo'} aria-pressed={listening}>
        <span className="mic-button__ring" />{listening ? <MicOff size={26} /> : <Mic size={26} />}
      </button>
      <div className="voice-demo__status">
        <strong>Browser speech recognition</strong>
        <p role="status" aria-live="polite">{status}</p>
        <span className="mono">LANG: {language.toUpperCase()} / CONTINUOUS / INTERIM</span>
        <Waveform active={listening} pulse={wavePulse} />
      </div>
      <button type="button" data-cursor="play" className="sample-button" onClick={simulate}><Volume2 size={15} /> Play simulated sample</button>
      <button type="button" className="icon-button" onClick={reset} aria-label="Reset voice demo"><RotateCcw size={17} /></button>
    </div>

    <div className="voice-demo__transcript" aria-live="polite" aria-atomic="true">
      <div className="transcript-label"><span>LIVE TRANSCRIPT</span>{simulated && <em>SIMULATED</em>}</div>
      <p>{transcript || <span className="muted">Tap the microphone and speak. Your transcript will appear here.</span>}</p>
    </div>

    <div className="voice-metrics">
      <div className="voice-metric"><span className="eyebrow">YOUR SPEAKING PACE</span><strong>{wpm}<small> wpm</small></strong><div className="meter"><i style={{ width: `${Math.min(100, (wpm / 180) * 100)}%` }} /></div></div>
      <div className="voice-metric"><span className="eyebrow">TYPING BASELINE</span><strong>40<small> wpm</small></strong><div className="meter"><i style={{ width: `${40 / 180 * 100}%` }} /></div></div>
      <div className="voice-metric voice-metric--ratio"><span className="eyebrow">SPEECH / TYPING</span><strong>{ratio.toFixed(1)}<small>×</small></strong><p>{wpm > 40 ? 'Above the 40 wpm reference.' : 'Speak for longer to compare.'}</p></div>
    </div>

    <p className="micro-note">{supported ? 'Speech recognition is available in this browser. ' : 'No native speech-recognition API was detected; use the clearly labelled simulated sample. '}This is a browser demo, not a Wispr Flow integration. Recognition quality varies by browser, microphone, accent and language; code-switching between Hindi and English may be misheard. The site does not send transcripts to its own backend. Audio processing and retention are governed by your browser’s speech service and settings. Speaking pace is a rough estimate, not a controlled typing-speed comparison.</p>
  </section>;
}
