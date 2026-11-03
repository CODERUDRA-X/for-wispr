export type ParseResult = { ok: true; date: Date; explanation: string } | { ok: false; explanation: string };

export function parseHinglishTime(input: string, now = new Date()): ParseResult {
  const text = input.toLowerCase().replace(/[.,!?]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return { ok: false, explanation: 'Type a phrase first.' };
  const relative = text.match(/(\d+)\s*(ghante|ghanta|hour|hours|hr|hrs|minute|min|minutes)\s*baad/);
  if (relative) {
    const amount = Number(relative[1]);
    const unit = relative[2];
    if (!unit) return { ok: false, explanation: 'Could not identify the time unit.' };
    if (!Number.isFinite(amount) || amount < 0 || amount > 10000) return { ok: false, explanation: 'That duration is outside this tiny parser’s supported range.' };
    const date = new Date(now);
    if (unit.startsWith('gh') || unit.startsWith('hour') || unit.startsWith('hr')) date.setMinutes(date.getMinutes() + amount * 60);
    else date.setMinutes(date.getMinutes() + amount);
    return { ok: true, date, explanation: `Added ${amount} ${unit} to the current local time. “Baad” was interpreted as a future offset.` };
  }
  const date = new Date(now);
  if (/\bparso\b/.test(text)) date.setDate(date.getDate() + 2);
  else if (/\bkal\b/.test(text)) date.setDate(date.getDate() + 1);
  else if (/\bsubah\b/.test(text)) {
    if (date.getHours() >= 9) date.setDate(date.getDate() + 1);
  } else if (/\bshaam\b|\braat\b/.test(text)) {
    const hour = /\braat\b/.test(text) ? 21 : 18;
    if (date.getHours() >= hour) date.setDate(date.getDate() + 1);
  } else {
    return { ok: false, explanation: 'No supported time phrase found. Try “2 ghante baad chai”, “kal subah”, or “parso raat”.' };
  }
  if (/\bsubah\b/.test(text)) date.setHours(9, 0, 0, 0);
  else if (/\bshaam\b/.test(text)) date.setHours(18, 0, 0, 0);
  else if (/\braat\b/.test(text)) date.setHours(21, 0, 0, 0);
  return { ok: true, date, explanation: 'Date words use the upcoming meaning of “kal” and “parso”. Day-part words map to fixed example times: subah 09:00, shaam 18:00, raat 21:00.' };
}

export function formatLocalDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}
