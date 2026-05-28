/**
 * Play a pleasant notification chime using Web Audio API.
 * No external audio files needed.
 */
export function playNotificationSound() {
  try {
    const ctx = new AudioContext();

    const playTone = (freq: number, startTime: number, duration: number, volume: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;

    // Two-tone chime: high note → higher note (ding-dong)
    playTone(880, now, 0.2, 0.3);        // A5
    playTone(1108, now + 0.15, 0.25, 0.3); // C#6

    // Close context after sound finishes
    setTimeout(() => ctx.close(), 600);
  } catch {
    // Silently ignore — audio may be blocked by browser policy
  }
}
