import { VoiceDemo } from '../components/VoiceDemo';

export function Voice() {
  return (
    <div className="page voice-page">
      <section className="section-pad">
        <div className="voice-page__intro">
          <span className="eyebrow">CRX / VOICE LAB</span>

          <h1>
            Speak once.
            <br />
            <i>See what lands.</i>
          </h1>

          <p>
            Try browser-based speech recognition in English (India) or Hindi
            (India). Speak naturally, watch the transcript appear, and compare
            the rough speaking pace with a fixed typing reference.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <VoiceDemo />
      </section>

      <section className="section-pad voice-page__note">
        <span className="eyebrow">REAL INPUT / REAL LIMITS</span>
        <p className="micro-note">
          This is a browser speech-recognition demonstration, not a Wispr Flow
          integration. Recognition support and accuracy depend on the browser,
          microphone, language, accent and speech service. The website does not
          send the transcript to its own backend; browser speech services may
          process audio under their own terms and settings.
        </p>
      </section>
    </div>
  );
}
