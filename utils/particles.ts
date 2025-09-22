// Minecraft-style particle effects
export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  emoji?: string;
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private container: HTMLElement | null = null;

  constructor(containerId: string = "particle-container") {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = containerId;
      this.container.className = "minecraft-particles";
      this.container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1000;
            `;
      document.body.appendChild(this.container);
    }
  }

  createSuccessParticles(x: number, y: number) {
    const colors = [
      "var(--minecraft-gold)",
      "var(--minecraft-emerald)",
      "var(--minecraft-diamond)",
    ];
    const emojis = ["✨", "⭐", "💎", "🌟"];

    for (let i = 0; i < 15; i++) {
      this.addParticle({
        x: x + (Math.random() - 0.5) * 100,
        y: y + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 3 - 2,
        life: 120,
        maxLife: 120,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji:
          Math.random() > 0.7
            ? emojis[Math.floor(Math.random() * emojis.length)]
            : undefined,
      });
    }
  }

  createErrorParticles(x: number, y: number) {
    const colors = ["var(--minecraft-redstone)", "var(--minecraft-lava)"];
    const emojis = ["💥", "❌", "⚡"];

    for (let i = 0; i < 8; i++) {
      this.addParticle({
        x: x + (Math.random() - 0.5) * 60,
        y: y + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 2 - 1,
        life: 60,
        maxLife: 60,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji:
          Math.random() > 0.5
            ? emojis[Math.floor(Math.random() * emojis.length)]
            : undefined,
      });
    }
  }

  createLevelCompleteParticles() {
    const rect = document.body.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    for (let i = 0; i < 50; i++) {
      this.addParticle({
        x: centerX + (Math.random() - 0.5) * 200,
        y: centerY + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 4 - 3,
        life: 180,
        maxLife: 180,
        size: Math.random() * 12 + 6,
        color:
          Math.random() > 0.5
            ? "var(--minecraft-gold)"
            : "var(--minecraft-emerald)",
        emoji: ["🎉", "🏆", "⭐", "💎", "✨"][Math.floor(Math.random() * 5)],
      });
    }
  }

  private addParticle(config: Omit<Particle, "id">) {
    const particle: Particle = {
      id: Math.random().toString(36).substr(2, 9),
      ...config,
    };
    this.particles.push(particle);
    this.renderParticle(particle);
    this.startAnimation();
  }

  private renderParticle(particle: Particle) {
    if (!this.container) return;

    const element = document.createElement("div");
    element.id = `particle-${particle.id}`;
    element.className = "particle";
    element.style.cssText = `
            position: absolute;
            left: ${particle.x}px;
            top: ${particle.y}px;
            width: ${particle.size}px;
            height: ${particle.size}px;
            background: ${particle.color};
            font-size: ${particle.size}px;
            line-height: 1;
            user-select: none;
            pointer-events: none;
            transform-origin: center;
            image-rendering: pixelated;
        `;

    if (particle.emoji) {
      element.textContent = particle.emoji;
      element.style.background = "transparent";
    }

    this.container.appendChild(element);
  }

  private animationFrame: number | null = null;

  private startAnimation() {
    if (this.animationFrame) return;

    const animate = () => {
      this.updateParticles();

      if (this.particles.length > 0) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.animationFrame = null;
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  private updateParticles() {
    this.particles = this.particles.filter((particle) => {
      particle.life--;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.1; // gravity

      const element = document.getElementById(`particle-${particle.id}`);
      if (element) {
        const opacity = particle.life / particle.maxLife;
        const scale = 0.5 + opacity * 0.5;

        element.style.transform = `translate(-50%, -50%) scale(${scale})`;
        element.style.opacity = opacity.toString();
        element.style.left = `${particle.x}px`;
        element.style.top = `${particle.y}px`;
      }

      if (particle.life <= 0) {
        element?.remove();
        return false;
      }

      return true;
    });
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.particles.forEach((particle) => {
      document.getElementById(`particle-${particle.id}`)?.remove();
    });
    this.particles = [];
    this.container?.remove();
  }
}

// Global particle system instance
export const globalParticles = new ParticleSystem();

// Convenience functions
export const celebrateSuccess = (x?: number, y?: number) => {
  const rect = document.body.getBoundingClientRect();
  globalParticles.createSuccessParticles(
    x ?? rect.width / 2,
    y ?? rect.height / 2
  );
};

export const showError = (x?: number, y?: number) => {
  const rect = document.body.getBoundingClientRect();
  globalParticles.createErrorParticles(
    x ?? rect.width / 2,
    y ?? rect.height / 2
  );
};

export const celebrateLevelComplete = () => {
  globalParticles.createLevelCompleteParticles();
};
