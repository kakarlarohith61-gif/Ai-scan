/**
 * Web Audio API synthesizer for authentic emergency siren sounds
 * Provides Wail and Yelp emergency sirens without requiring external audio assets.
 */

class AmbulanceSoundSystem {
  private audioCtx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private sirenInterval: number | null = null;
  private isPlaying: boolean = false;
  private currentFreq: number = 700;
  private goingUp: boolean = true;

  private initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public startSiren(volume: number = 0.08) {
    if (this.isPlaying) return;

    try {
      this.initContext();
      if (!this.audioCtx) return;

      this.osc = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.osc.type = 'sawtooth';
      this.osc.frequency.setValueAtTime(650, this.audioCtx.currentTime);

      // Low volume to prevent loud startling
      this.gainNode.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(Math.min(volume, 0.15), this.audioCtx.currentTime + 0.1);

      this.osc.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);
      this.osc.start();
      this.isPlaying = true;

      // Two-tone European/US emergency wail sweep
      this.currentFreq = 650;
      this.goingUp = true;

      this.sirenInterval = window.setInterval(() => {
        if (!this.audioCtx || !this.osc) return;

        if (this.goingUp) {
          this.currentFreq += 25;
          if (this.currentFreq >= 960) {
            this.goingUp = false;
          }
        } else {
          this.currentFreq -= 25;
          if (this.currentFreq <= 650) {
            this.goingUp = true;
          }
        }

        this.osc.frequency.setTargetAtTime(this.currentFreq, this.audioCtx.currentTime, 0.04);
      }, 35);
    } catch {
      // Audio autoplay policy fallback
      this.isPlaying = false;
    }
  }

  public stopSiren() {
    if (!this.isPlaying) return;

    if (this.sirenInterval) {
      clearInterval(this.sirenInterval);
      this.sirenInterval = null;
    }

    if (this.gainNode && this.audioCtx) {
      try {
        this.gainNode.gain.setTargetAtTime(0.0001, this.audioCtx.currentTime, 0.08);
      } catch {
        // ignore
      }
    }

    setTimeout(() => {
      if (this.osc) {
        try {
          this.osc.stop();
          this.osc.disconnect();
        } catch {
          // ignore
        }
        this.osc = null;
      }
      this.isPlaying = false;
    }, 120);
  }

  public playSingleBeep(freq: number = 880, durationMs: number = 80) {
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + durationMs / 1000);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + durationMs / 1000);
    } catch {
      // ignore
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambulanceAudio = new AmbulanceSoundSystem();
