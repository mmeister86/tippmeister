// Minecraft-style sound effects using Web Audio API
export class MinecraftSounds {
  private audioContext: AudioContext | null = null;

  constructor() {
    // Initialize audio context on first user interaction
    document.addEventListener("click", this.initAudio.bind(this), {
      once: true,
    });
    document.addEventListener("keydown", this.initAudio.bind(this), {
      once: true,
    });
  }

  private initAudio() {
    try {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn("Web Audio API not supported:", error);
    }
  }

  private createTone(
    frequency: number,
    duration: number,
    type: OscillatorType = "square"
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!this.audioContext) {
        resolve();
        return;
      }

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(
        frequency,
        this.audioContext.currentTime
      );

      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.1,
        this.audioContext.currentTime + 0.01
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        this.audioContext.currentTime + duration
      );

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);

      oscillator.onended = () => resolve();
    });
  }

  async playKeyPress() {
    // Minecraft block place sound (low click)
    await this.createTone(220, 0.1, "square");
  }

  async playError() {
    // Minecraft hurt sound (harsh note)
    await this.createTone(150, 0.3, "sawtooth");
    await this.createTone(130, 0.2, "sawtooth");
  }

  async playSuccess() {
    // Minecraft XP pickup sound (ascending tones)
    await this.createTone(440, 0.15, "sine");
    await this.createTone(554, 0.15, "sine");
    await this.createTone(659, 0.2, "sine");
  }

  async playLevelComplete() {
    // Minecraft achievement sound (celebratory sequence)
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    for (const note of notes) {
      await this.createTone(note, 0.4, "sine");
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  async playButtonClick() {
    // Minecraft button click (quick high note)
    await this.createTone(660, 0.08, "square");
  }
}

// Global sound system instance
export const minecraftSounds = new MinecraftSounds();
