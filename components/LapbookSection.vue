<template>
  <section id="lapbook" class="lapbook-section">
    <div class="lapbook-container">
      <div class="section-header">
        <span class="section-tag">Sección 3</span>
        <h2 class="section-title">El <span class="text-gradient">Lapbook Giratorio</span></h2>
        <p class="section-desc">
          Tu proyecto en formato tríptico. Aprende las medidas y contenido necesario.
        </p>
        <div class="tutorial-btn-wrapper">
          <a href="https://www.youtube.com/watch?v=DAa6rmAOwU8" target="_blank" rel="noopener noreferrer" class="tutorial-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="tutorial-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Ver Tutorial
          </a>
        </div>
      </div>

      <div class="lapbook-content">
        <div class="lapbook-diagram-wrapper" v-intersect="{ handler: onDiagramIntersect, options: { threshold: 0.3 } }">
          <div class="diagram-frame" :class="{ 'animate-in': diagramVisible }">
            <img src="/images/seccion-lapbook.png" alt="Diagrama del Lapbook - Estructura tríptico" class="lapbook-diagram" />
            <div class="diagram-overlay">
              <div class="dimension-badge top">
                <span>Alto: 50 cm</span>
              </div>
              <div class="dimension-badge bottom">
                <span>Ancho: 50 cm</span>
              </div>
            </div>
          </div>
        </div>

        <div class="lapbook-details" v-intersect="{ handler: onDetailsIntersect, options: { threshold: 0.2 } }">
          <div class="details-card" :class="{ 'animate-in': detailsVisible }">
            <div class="details-header">
              <IconBookOpen class="details-icon" />
              <h3>¿Qué incluye el Lapbook?</h3>
            </div>

            <div class="content-list">
              <div class="content-item" v-for="(item, i) in contents" :key="i" :style="{ transitionDelay: `${i * 80}ms` }">
                <div class="content-number">{{ i + 1 }}</div>
                <div class="content-text">
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="details-card dimensions-card" :class="{ 'animate-in': detailsVisible }" style="transition-delay: 200ms;">
            <div class="details-header">
              <IconRuler class="details-icon" />
              <h3>Medidas Oficiales</h3>
            </div>
            <div class="dimensions-grid">
              <div class="dimension-item">
                <span class="dim-label">Alto</span>
                <span class="dim-value">50 cm</span>
              </div>
              <div class="dimension-item">
                <span class="dim-label">Ancho Total</span>
                <span class="dim-value">50 cm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import IconBookOpen from './icons/IconBookOpen.vue'
import IconRuler from './icons/IconRuler.vue'

const diagramVisible = ref(false)
const detailsVisible = ref(false)

const contents = [
  { title: 'Título Creativo', desc: 'Nombre atractivo de tu proyecto' },
  { title: 'Materiales y Equipo', desc: 'Lista de todo lo utilizado' },
  { title: 'Procedimiento', desc: 'Paso a paso de tu experimento' },
  { title: 'Datos Interesantes', desc: 'Curiosidades sobre tu tema' },
  { title: 'Hipótesis', desc: 'Tu predicción inicial' },
  { title: 'Explicación Científica', desc: 'Por qué sucede lo que observaste' },
  { title: 'Imágenes', desc: 'Fotos del tema de estudio' },
]

const onDiagramIntersect = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) diagramVisible.value = true
  })
}

const onDetailsIntersect = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) detailsVisible.value = true
  })
}
</script>

<style scoped>
.lapbook-section {
  padding: 6rem 2rem;
  background: var(--gray-bg);
  position: relative;
}

.lapbook-container {
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

.lapbook-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.lapbook-diagram-wrapper {
  position: sticky;
  top: 100px;
}

.diagram-frame {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.diagram-frame.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.lapbook-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.diagram-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.dimension-badge {
  position: absolute;
  padding: 0.4rem 0.8rem;
  background: rgba(10, 37, 64, 0.85);
  backdrop-filter: blur(4px);
  color: var(--white);
  font-family: var(--font-title);
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
}

.dimension-badge.top {
  top: 1rem;
  left: 1rem;
}

.dimension-badge.bottom {
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

.dimension-badge.side {
  top: 50%;
  left: 1rem;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: left center;
}

.lapbook-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.details-card {
  background: var(--white);
  border: 1px solid var(--gray-light);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateX(40px);
}

.details-card.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.details-card:hover {
  border-color: var(--mint);
  box-shadow: var(--shadow-md);
}

.details-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.details-icon {
  width: 24px;
  height: 24px;
  color: var(--mint);
}

.details-header h3 {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--navy);
}

.content-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.content-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background: var(--gray-bg);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.content-item:hover {
  background: rgba(0, 212, 170, 0.08);
  transform: translateX(4px);
}

.content-number {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, var(--mint), var(--mint-dark));
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.content-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.content-text strong {
  font-family: var(--font-title);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--navy);
}

.content-text span {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--gray-text);
}

.dimensions-card {
  background: linear-gradient(135deg, var(--navy), var(--navy-light));
  border-color: transparent;
}

.dimensions-card .details-header h3 {
  color: var(--white);
}

.dimensions-card .details-icon {
  color: var(--mint);
}

.dimensions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.dimension-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  text-align: center;
}

.dim-label {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dim-value {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--mint);
}

.tutorial-btn-wrapper {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  perspective: 1000px;
}

.tutorial-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, var(--mint), var(--mint-dark));
  color: var(--white);
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  border-radius: 100px;
  box-shadow: 0 10px 25px rgba(0, 212, 170, 0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.tutorial-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: all 0.6s ease;
  z-index: -1;
}

.tutorial-btn:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 35px rgba(0, 212, 170, 0.6);
  color: var(--white);
}

.tutorial-btn:hover::before {
  left: 100%;
}

.tutorial-icon {
  width: 24px;
  height: 24px;
  animation: pulse-icon 2s infinite;
}

@keyframes pulse-icon {
  0% { transform: scale(1); }
  50% { transform: scale(1.25); }
  100% { transform: scale(1); }
}

@media (max-width: 1024px) {
  .lapbook-content {
    grid-template-columns: 1fr;
  }

  .lapbook-diagram-wrapper {
    position: relative;
    top: 0;
  }

  .diagram-frame {
    max-width: 700px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .lapbook-section {
    padding: 4rem 1.25rem;
  }

  .dimensions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
