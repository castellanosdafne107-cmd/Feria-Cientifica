<template>
  <section class="pillars-section">
    <div class="pillars-container">
      <div class="section-header">
        <span class="section-tag">Áreas de Conocimiento</span>
        <h2 class="section-title">Tus <span class="text-gradient">Pilares Científicos</span></h2>
        <p class="section-desc">
          Explora las diferentes áreas en las que puedes desarrollar tu proyecto para la feria científica.
        </p>
      </div>

      <div class="pillars-grid">
        <div 
          v-for="(pillar, i) in pillars" 
          :key="i"
          class="pillar-card"
          :class="{ 'animate-in': visibleCards.has(i) }"
          :style="{ transitionDelay: `${i * 100}ms` }"
          v-intersect="{ handler: (entries) => onCardIntersect(entries, i), options: { threshold: 0.2 } }"
        >
          <div class="pillar-icon-wrapper">
            <component :is="pillar.icon" class="pillar-icon" />
          </div>
          <h3 class="pillar-title">{{ pillar.title }}</h3>
          <p class="pillar-desc">{{ pillar.description }}</p>
          <div class="pillar-glow"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import IconDna from './icons/IconDna.vue'
import IconRobot from './icons/IconRobot.vue'
import IconAtom from './icons/IconAtom.vue'
import IconMicroscope from './icons/IconMicroscope.vue'
import IconRocket from './icons/IconRocket.vue'

const visibleCards = ref(new Set())

const pillars = [
  {
    title: 'Biología',
    description: 'Explora el mundo de los seres vivos, desde la célula hasta los ecosistemas. Proyectos de botánica, zoología, microbiología y ecología.',
    icon: IconDna,
  },
  {
    title: 'Robótica',
    description: 'Diseña y construye robots, automatizaciones y sistemas inteligentes. Programación, electrónica e ingeniería mecánica.',
    icon: IconRobot,
  },
  {
    title: 'Química',
    description: 'Experimenta con reacciones químicas, compuestos y transformaciones de la materia. Química orgánica, inorgánica y ambiental.',
    icon: IconAtom,
  },
  {
    title: 'Microscopía',
    description: 'Observa el mundo invisible. Proyectos de biología celular, microbiología y análisis microscópico de muestras.',
    icon: IconMicroscope,
  },
  {
    title: 'Astronomía',
    description: 'Descubre los secretos del universo. Proyectos de observación astronómica, física espacial y cosmología.',
    icon: IconRocket,
  },
]

const onCardIntersect = (entries, index) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      visibleCards.value.add(index)
    }
  })
}
</script>

<style scoped>
.pillars-section {
  padding: 6rem 2rem;
  background: var(--white);
  position: relative;
}

.pillars-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-tag {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: rgba(0, 212, 170, 0.1);
  color: var(--mint-dark);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 100px;
  margin-bottom: 1rem;
}

.section-title {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: var(--navy);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-desc {
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--gray-text);
  max-width: 550px;
  margin: 0 auto;
  line-height: 1.6;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.pillar-card {
  position: relative;
  background: var(--white);
  border: 1px solid var(--gray-light);
  border-radius: var(--radius-lg);
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  opacity: 0;
  transform: translateY(40px);
}

.pillar-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.pillar-card:hover {
  transform: translateY(-8px);
  border-color: var(--mint);
  box-shadow: 0 20px 40px rgba(0, 212, 170, 0.12);
}

.pillar-icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 212, 170, 0.1), rgba(0, 212, 170, 0.05));
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.pillar-card:hover .pillar-icon-wrapper {
  background: linear-gradient(135deg, var(--mint), var(--mint-dark));
  transform: scale(1.05);
}

.pillar-icon {
  width: 40px;
  height: 40px;
  color: var(--mint);
  transition: color 0.3s ease;
}

.pillar-card:hover .pillar-icon {
  color: var(--white);
}

.pillar-title {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--navy);
  margin-bottom: 0.75rem;
}

.pillar-desc {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--gray-text);
  line-height: 1.6;
}

.pillar-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 212, 170, 0.06), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.pillar-card:hover .pillar-glow {
  opacity: 1;
}

@media (max-width: 768px) {
  .pillars-section {
    padding: 4rem 1.25rem;
  }

  .pillars-grid {
    grid-template-columns: 1fr;
  }
}
</style>
