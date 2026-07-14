<template>
  <section id="inicio" class="hero-section">
    <!-- Fondo animado de ADN -->
    <div class="dna-bg" aria-hidden="true">
      <div class="dna-strand dna-left">
        <div v-for="n in 20" :key="`l-${n}`" class="dna-rung" :style="{ animationDelay: `${n * 0.15}s` }">
          <div class="dna-bar"></div>
        </div>
      </div>
      <div class="dna-strand dna-right">
        <div v-for="n in 20" :key="`r-${n}`" class="dna-rung" :style="{ animationDelay: `${n * 0.15 + 0.075}s` }">
          <div class="dna-bar"></div>
        </div>
      </div>
    </div>

    <!-- Hexágonos flotantes -->
    <div class="hexagons" aria-hidden="true">
      <div v-for="n in 6" :key="`hex-${n}`" class="hexagon" :style="getHexStyle(n)"></div>
    </div>

    <!-- Contenido principal -->
    <div class="hero-content">
      <div class="hero-badge" v-intersect="{ handler: onBadgeIntersect, options: { threshold: 0.5 } }">
        <IconFlask class="badge-icon" />
        <span>Feria Científica 2026</span>
      </div>

      <h1 class="hero-title" ref="heroTitle">
        <span class="title-line">CIENCIA</span>
        <span class="title-line accent">SIN LÍMITES</span>
      </h1>

      <p class="hero-subtitle">
        Descubre, experimenta y transforma el mundo a través de la ciencia. 
        Únete a la Feria Científica del Colegio Visión de Fe y demuestra tu talento.
      </p>

      <div class="hero-cta-group">
        <a href="#participar" class="hero-cta-primary" @click.prevent="scrollTo('#participar')">
          <span>Quiero Participar</span>
          <IconArrowRight class="cta-arrow" />
        </a>
        <a href="#materiales" class="hero-cta-secondary" @click.prevent="scrollTo('#materiales')">
          <IconBeaker class="cta-icon" />
          <span>Ver Materiales</span>
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator" aria-hidden="true">
      <div class="scroll-mouse">
        <div class="scroll-wheel"></div>
      </div>
      <span>Desplázate</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import IconFlask from './icons/IconFlask.vue'
import IconArrowRight from './icons/IconArrowRight.vue'
import IconBeaker from './icons/IconBeaker.vue'

const heroTitle = ref(null)

const getHexStyle = (n) => {
  const positions = [
    { top: '15%', left: '8%', size: 80 },
    { top: '70%', left: '5%', size: 60 },
    { top: '25%', right: '10%', size: 100 },
    { top: '60%', right: '8%', size: 50 },
    { top: '40%', left: '3%', size: 40 },
    { top: '80%', right: '15%', size: 70 },
  ]
  const pos = positions[n - 1] || positions[0]
  return {
    top: pos.top,
    left: pos.left,
    right: pos.right,
    width: `${pos.size}px`,
    height: `${pos.size * 0.866}px`,
    animationDelay: `${n * 2}s`,
    animationDuration: `${8 + n * 2}s`,
  }
}

const scrollTo = (href) => {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const onBadgeIntersect = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in')
    }
  })
}

onMounted(() => {
  // Animación de entrada del título
  if (heroTitle.value) {
    const lines = heroTitle.value.querySelectorAll('.title-line')
    lines.forEach((line, i) => {
      line.style.opacity = '0'
      line.style.transform = 'translateY(40px)'
      setTimeout(() => {
        line.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        line.style.opacity = '1'
        line.style.transform = 'translateY(0)'
      }, 300 + i * 200)
    })
  }
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 2rem 4rem;
  overflow: hidden;
  background: linear-gradient(180deg, #f0fdf9 0%, #ffffff 50%, #f5f7fa 100%);
}

/* Fondo ADN */
.dna-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.dna-strand {
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 0;
}

.dna-left {
  left: 5%;
}

.dna-right {
  right: 5%;
}

.dna-rung {
  width: 4px;
  height: 40px;
  background: linear-gradient(180deg, transparent, var(--mint), transparent);
  border-radius: 2px;
  opacity: 0.15;
  animation: dna-pulse 3s ease-in-out infinite;
}

@keyframes dna-pulse {
  0%, 100% { opacity: 0.1; transform: scaleY(1); }
  50% { opacity: 0.25; transform: scaleY(1.3); }
}

/* Hexágonos */
.hexagons {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.hexagon {
  position: absolute;
  background: linear-gradient(135deg, rgba(0, 212, 170, 0.06), rgba(0, 212, 170, 0.02));
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: hex-float linear infinite;
}

@keyframes hex-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(10deg); }
}

/* Contenido */
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: rgba(0, 212, 170, 0.1);
  border: 1px solid rgba(0, 212, 170, 0.2);
  border-radius: 100px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--mint-dark);
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.hero-badge.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.badge-icon {
  width: 18px;
  height: 18px;
}

.hero-title {
  margin-bottom: 1.5rem;
}

.title-line {
  display: block;
  font-family: var(--font-title);
  font-weight: 800;
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--navy);
}

.title-line.accent {
  background: linear-gradient(135deg, var(--mint) 0%, var(--mint-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--gray-dark);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

/* CTA Group */
.hero-cta-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.hero-cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--mint) 0%, var(--mint-dark) 100%);
  color: var(--white);
  text-decoration: none;
  font-family: var(--font-title);
  font-weight: 600;
  font-size: 1rem;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 20px rgba(0, 212, 170, 0.35);
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.hero-cta-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 212, 170, 0.45);
}

.cta-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.hero-cta-primary:hover .cta-arrow {
  transform: translateX(4px);
}

.hero-cta-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: transparent;
  color: var(--navy);
  text-decoration: none;
  font-family: var(--font-title);
  font-weight: 600;
  font-size: 1rem;
  border-radius: var(--radius-md);
  border: 2px solid var(--navy);
  transition: all 0.3s ease;
  cursor: pointer;
}

.hero-cta-secondary:hover {
  background: var(--navy);
  color: var(--white);
  transform: translateY(-3px);
}

.cta-icon {
  width: 20px;
  height: 20px;
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--gray-text);
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.scroll-mouse {
  width: 24px;
  height: 40px;
  border: 2px solid var(--gray-text);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.scroll-wheel {
  width: 4px;
  height: 8px;
  background: var(--mint);
  border-radius: 2px;
  animation: scroll-wheel 1.5s ease-in-out infinite;
}

@keyframes scroll-wheel {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(12px); opacity: 0; }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 100px 1.25rem 3rem;
  }

  .hero-cta-group {
    flex-direction: column;
    align-items: center;
  }

  .hero-cta-primary,
  .hero-cta-secondary {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .dna-strand {
    display: none;
  }
}
</style>
