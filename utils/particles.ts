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
    const colors = ["var(--minecraft-gold)", "var(--minecraft-emerald)"];
    const emojis = ["✨", "⭐"];

    // Drastisch reduziert: nur 3 Partikel für 0.5 Sekunden
    for (let i = 0; i < 3; i++) {
      this.addParticle({
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2 - 1,
        life: 30, // 0.5 Sekunden bei 60fps
        maxLife: 30,
        size: Math.random() * 4 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji:
          Math.random() > 0.5
            ? emojis[Math.floor(Math.random() * emojis.length)]
            : undefined,
      });
    }
  }

  createErrorParticles(x: number, y: number) {
    const colors = ["var(--minecraft-redstone)"];
    const emojis = ["💥"];

    // Stark reduziert: nur 2 Partikel für 0.5 Sekunden
    for (let i = 0; i < 2; i++) {
      this.addParticle({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 15,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 1.5 - 0.5,
        life: 30, // 0.5 Sekunden bei 60fps
        maxLife: 30,
        size: Math.random() * 3 + 2,
        color: colors[0],
        emoji: Math.random() > 0.3 ? emojis[0] : undefined,
      });
    }
  }

  createLevelCompleteParticles() {
    const rect = document.body.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Massiv reduziert: nur 5 Partikel für 1 Sekunde
    for (let i = 0; i < 5; i++) {
      this.addParticle({
        x: centerX + (Math.random() - 0.5) * 80,
        y: centerY + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 2 - 1,
        life: 60, // 1 Sekunde bei 60fps
        maxLife: 60,
        size: Math.random() * 6 + 4,
        color:
          Math.random() > 0.5
            ? "var(--minecraft-gold)"
            : "var(--minecraft-emerald)",
        emoji: ["🎉", "🏆"][Math.floor(Math.random() * 2)],
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
    // Performance-optimiert: weniger DOM-Manipulationen
    this.particles = this.particles.filter((particle) => {
      particle.life--;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.05; // reduzierte Gravity

      const element = document.getElementById(`particle-${particle.id}`);
      if (element && particle.life > 0) {
        const opacity = particle.life / particle.maxLife;

        // Weniger CSS-Updates für bessere Performance
        element.style.opacity = opacity.toString();
        element.style.transform = `translate(${
          particle.x - particle.size / 2
        }px, ${particle.y - particle.size / 2}px)`;
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
