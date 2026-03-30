/**
 * Sound Engine — Web Audio API Synthesized Sound Effects
 * 
 * Generates game-like sound effects using the Web Audio API.
 * No external audio files needed — all sounds are synthesized.
 * 
 * Sound categories:
 * - UI feedback (click, hover)
 * - Rewards (points, badge, level up)
 * - Quiz feedback (correct, incorrect)
 * - Achievements (mission complete, streak)
 */

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

/**
 * Plays a synthesized tone.
 * @param {number} frequency - Hz
 * @param {string} type - oscillator type (sine, square, triangle, sawtooth)
 * @param {number} duration - seconds
 * @param {number} volume - 0 to 1
 * @param {number} delay - seconds before playing
 */
function playTone(frequency, type = 'sine', duration = 0.15, volume = 0.3, delay = 0) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
    gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch {
    // Audio not supported — fail silently
  }
}

/**
 * Play a sequence of tones (arpeggio / melody).
 */
function playMelody(notes) {
  notes.forEach(({ freq, type, duration, volume, delay }) => {
    playTone(freq, type || 'sine', duration || 0.15, volume || 0.25, delay || 0);
  });
}

/* ─── Public Sound Effects ─── */

/** Soft click for button/UI interaction */
export function playClick() {
  playTone(800, 'sine', 0.06, 0.15);
}

/** Positive chime for correct answers */
export function playCorrect() {
  playMelody([
    { freq: 523, type: 'sine', duration: 0.1, volume: 0.25, delay: 0 },
    { freq: 659, type: 'sine', duration: 0.1, volume: 0.25, delay: 0.08 },
    { freq: 784, type: 'sine', duration: 0.15, volume: 0.3, delay: 0.16 },
  ]);
}

/** Negative buzz for wrong answers */
export function playIncorrect() {
  playMelody([
    { freq: 250, type: 'square', duration: 0.15, volume: 0.15, delay: 0 },
    { freq: 200, type: 'square', duration: 0.2, volume: 0.12, delay: 0.12 },
  ]);
}

/** Points earned — ascending sparkle */
export function playPoints() {
  playMelody([
    { freq: 880, type: 'sine', duration: 0.08, volume: 0.2, delay: 0 },
    { freq: 1100, type: 'sine', duration: 0.08, volume: 0.2, delay: 0.06 },
    { freq: 1320, type: 'sine', duration: 0.12, volume: 0.25, delay: 0.12 },
  ]);
}

/** Badge unlocked — triumphant fanfare */
export function playBadgeUnlock() {
  playMelody([
    { freq: 523, type: 'triangle', duration: 0.12, volume: 0.3, delay: 0 },
    { freq: 659, type: 'triangle', duration: 0.12, volume: 0.3, delay: 0.1 },
    { freq: 784, type: 'triangle', duration: 0.12, volume: 0.3, delay: 0.2 },
    { freq: 1047, type: 'triangle', duration: 0.3, volume: 0.35, delay: 0.3 },
  ]);
}

/** Level up — epic ascending scale */
export function playLevelUp() {
  playMelody([
    { freq: 440, type: 'sine', duration: 0.1, volume: 0.25, delay: 0 },
    { freq: 554, type: 'sine', duration: 0.1, volume: 0.25, delay: 0.08 },
    { freq: 659, type: 'sine', duration: 0.1, volume: 0.25, delay: 0.16 },
    { freq: 880, type: 'sine', duration: 0.1, volume: 0.3, delay: 0.24 },
    { freq: 1047, type: 'triangle', duration: 0.15, volume: 0.3, delay: 0.32 },
    { freq: 1319, type: 'triangle', duration: 0.3, volume: 0.35, delay: 0.42 },
  ]);
}

/** Mission complete — satisfying resolution */
export function playMissionComplete() {
  playMelody([
    { freq: 392, type: 'triangle', duration: 0.1, volume: 0.25, delay: 0 },
    { freq: 523, type: 'triangle', duration: 0.1, volume: 0.25, delay: 0.1 },
    { freq: 659, type: 'triangle', duration: 0.15, volume: 0.3, delay: 0.2 },
    { freq: 784, type: 'sine', duration: 0.25, volume: 0.3, delay: 0.3 },
  ]);
}

/** Streak notification — quick upward sweep */
export function playStreak() {
  playMelody([
    { freq: 600, type: 'sawtooth', duration: 0.05, volume: 0.12, delay: 0 },
    { freq: 800, type: 'sawtooth', duration: 0.05, volume: 0.12, delay: 0.04 },
    { freq: 1000, type: 'sawtooth', duration: 0.05, volume: 0.15, delay: 0.08 },
    { freq: 1200, type: 'sine', duration: 0.1, volume: 0.2, delay: 0.12 },
  ]);
}

/** Hover effect — very subtle tick */
export function playHover() {
  playTone(1200, 'sine', 0.03, 0.06);
}

/** Navigation transition */
export function playNav() {
  playTone(600, 'sine', 0.08, 0.1);
}

/** Quiz start */
export function playQuizStart() {
  playMelody([
    { freq: 440, type: 'sine', duration: 0.1, volume: 0.2, delay: 0 },
    { freq: 660, type: 'sine', duration: 0.1, volume: 0.25, delay: 0.12 },
    { freq: 880, type: 'triangle', duration: 0.2, volume: 0.3, delay: 0.24 },
  ]);
}

/** Perfect score celebration */
export function playPerfect() {
  playMelody([
    { freq: 523, type: 'sine', duration: 0.08, volume: 0.25, delay: 0 },
    { freq: 659, type: 'sine', duration: 0.08, volume: 0.25, delay: 0.06 },
    { freq: 784, type: 'sine', duration: 0.08, volume: 0.25, delay: 0.12 },
    { freq: 1047, type: 'sine', duration: 0.08, volume: 0.3, delay: 0.18 },
    { freq: 1319, type: 'triangle', duration: 0.08, volume: 0.3, delay: 0.24 },
    { freq: 1568, type: 'triangle', duration: 0.3, volume: 0.35, delay: 0.3 },
  ]);
}

/* ─── Background Music (BGM) ─── */
let bgmBuffer = null;
let bgmSource = null;
let isBgmPlaying = false;
let isBgmLoading = false;

export async function playBGM(url = import.meta.env.BASE_URL + 'bgm.m4a') {
  if (isBgmPlaying) return;
  const ctx = getAudioContext();
  
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }

  // Prevent multiple simultaneous fetches
  if (isBgmLoading) return;
  isBgmLoading = true;

  try {
    if (!bgmBuffer) {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      bgmBuffer = await ctx.decodeAudioData(arrayBuffer);
    }

    if (isBgmPlaying) {
      isBgmLoading = false;
      return; 
    }

    // Double check we don't duplicate on race condition
    if (bgmSource) {
      try {
        bgmSource.stop();
      } catch (e) {}
      bgmSource.disconnect();
    }

    bgmSource = ctx.createBufferSource();
    bgmSource.buffer = bgmBuffer;
    bgmSource.loop = true;

    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.15; // Set volume to match Youtube player (15%)

    bgmSource.connect(gainNode);
    gainNode.connect(ctx.destination);

    bgmSource.start(0);
    isBgmPlaying = true;
  } catch (err) {
    console.warn("Failed to build/play BGM:", err);
  } finally {
    isBgmLoading = false;
  }
}

export function stopBGM() {
  if (bgmSource) {
    try {
      bgmSource.stop();
    } catch (e) {}
    bgmSource.disconnect();
    bgmSource = null;
  }
  isBgmPlaying = false;
}
