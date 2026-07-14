<template>
  <section id="recordatorio" class="recordatorio-section">
    <div class="recordatorio-container">
      <div class="section-header">
        <span class="section-tag">Sección 4</span>
        <h2 class="section-title"><span class="text-gradient">Recordatorios</span> Importantes</h2>
        <p class="section-desc">
          No olvides estos requisitos esenciales para el día de la feria científica.
        </p>
      </div>

      <div class="reminders-grid">
        <div 
          v-for="(reminder, i) in reminders" 
          :key="i"
          class="reminder-card"
          :class="[reminder.type, { 'animate-in': visibleCards.has(i) }]"
          :style="{ transitionDelay: `${i * 120}ms` }"
          v-intersect="{ handler: (entries) => onCardIntersect(entries, i), options: { threshold: 0.2 } }"
        >
          <div class="reminder-icon-wrapper">
            <component :is="reminder.icon" class="reminder-icon" />
          </div>
          <div class="reminder-content">
            <h3 class="reminder-title">{{ reminder.title }}</h3>
            <p class="reminder-text">{{ reminder.text }}</p>
          </div>
          <div class="reminder-accent"></div>
        </div>
      </div>

      <div class="final-cta" v-intersect="{ handler: onCtaIntersect, options: { threshold: 0.3 } }">
        <div class="cta-card" :class="{ 'animate-in': ctaVisible }">
          <IconStar class="cta-star" />
          <h3>¡Tu Proyecto Puede Cambiar el Mundo!</h3>
          <p>No esperes más. Reúne tu equipo, elige tu tema y comienza a construir tu proyecto científico. La ciencia necesita jóvenes como tú.</p>
          <a href="#participar" class="final-cta-button" @click.prevent="scrollTo('#participar')">
            <span>Comenzar Ahora</span>
            <IconArrowRight class="cta-arrow" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import IconShirt from './icons/IconShirt.vue'
import IconTable from './icons/IconTable.vue'
import IconFileSearch from './icons/IconFileSearch.vue'
import IconTestTube from './icons/IconTestTube.vue'
import IconStar from './icons/IconStar.vue'
import IconArrowRight from './icons/IconArrowRight.vue'

const visibleCards = ref(new Set())
const ctaVisible = ref(false)

const reminders = [
  {
    title: 'Uniforme de Laboratorio',
    text: 'Es obligatorio el uso de bata larga de color blanco y equipo de seguridad el día de la feria científica.',
    icon: IconShirt,
    type: 'info',
  },
  {
    title: 'Mantel de Exposición',
    text: 'Deberás llevar un mantel para cubrir tu área de exposición el día de la feria científica.',
    icon: IconTable,
    type: 'warning',
  },
  {
    title: 'Investigación Impresa',
    text: 'Deberán entregar una investigación sobre su proyecto de ciencias, impresa y bien presentada.',
    icon: IconFileSearch,
    type: 'info',
  },
  {
    title: 'Semana de Pruebas',
    text: 'Durante la semana del 15 al 19 de julio estaremos haciendo diferentes pruebas de los proyectos. Es importante que presentes los materiales en los días solicitados.',
    icon: IconTestTube,
    type: 'urgent',
  },
]

const onCardIntersect = (entries, index) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) visibleCards.value.add(index)
  })
}

const onCtaIntersect = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) ctaVisible.value = true
  })
}

const scrollTo = (href) => {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.recordatorio-section {
  padding: 6rem 2rem;
  background: var(--white);
  position: relative;
}

.recordatorio-container {
  max-width: 1100px;
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

.reminders-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.reminder-card {
  position: relative;
  display: flex;
  gap: 1.25rem;
  padding: 1.75rem;
  background: var(--white);
  border: 1px solid var(--gray-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(30px);
}

.reminder-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.reminder-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.reminder-card.info {
  border-left: 4px solid var(--mint);
}

.reminder-card.warning {
  border-left: 4px solid #F59E0B;
}

.reminder-card.urgent {
  border-left: 4px solid #EF4444;
}

.reminder-icon-wrapper {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.reminder-card.info .reminder-icon-wrapper {
  background: rgba(0, 212, 170, 0.1);
}

.reminder-card.warning .reminder-icon-wrapper {
  background: rgba(245, 158, 11, 0.1);
}

.reminder-card.urgent .reminder-icon-wrapper {
  background: rgba(239, 68, 68, 0.1);
}

.reminder-icon {
  width: 24px;
  height: 24px;
}

.reminder-card.info .reminder-icon {
  color: var(--mint);
}

.reminder-card.warning .reminder-icon {
  color: #F59E0B;
}

.reminder-card.urgent .reminder-icon {
  color: #EF4444;
}

.reminder-content {
  flex: 1;
}

.reminder-title {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--navy);
  margin-bottom: 0.5rem;
}

.reminder-text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--gray-dark);
  line-height: 1.6;
}

.reminder-accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(0, 212, 170, 0.05), transparent 70%);
  pointer-events: none;
}

.final-cta {
  display: flex;
  justify-content: center;
}

.cta-card {
  text-align: center;
  max-width: 600px;
  padding: 3rem;
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-card.animate-in {
  opacity: 1;
  transform: scale(1);
}

.cta-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 212, 170, 0.1), transparent 60%);
  pointer-events: none;
}

.cta-star {
  width: 48px;
  height: 48px;
  color: var(--mint);
  margin: 0 auto 1.5rem;
}

.cta-card h3 {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--white);
  margin-bottom: 1rem;
}

.cta-card p {
  font-family: var(--font-body);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.final-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, var(--mint), var(--mint-dark));
  color: var(--white);
  text-decoration: none;
  font-family: var(--font-title);
  font-weight: 600;
  font-size: 1rem;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 20px rgba(0, 212, 170, 0.3);
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.final-cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 212, 170, 0.4);
}

.cta-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.final-cta-button:hover .cta-arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .recordatorio-section {
    padding: 4rem 1.25rem;
  }

  .reminders-grid {
    grid-template-columns: 1fr;
  }

  .reminder-card {
    flex-direction: column;
    gap: 1rem;
  }

  .cta-card {
    padding: 2rem 1.5rem;
  }
}
</style>
