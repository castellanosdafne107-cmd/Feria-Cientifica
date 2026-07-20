<template>
  <section id="participar" class="participar-section">
    <div class="participar-container">
      <div class="section-header">
        <span class="section-tag">Sección 1</span>
        <h2 class="section-title">¿Cómo <span class="text-gradient">Participar?</span></h2>
        <p class="section-desc">
          Sigue estos pasos para ser parte de la Feria Científica 2026
        </p>
      </div>

      <div class="steps-timeline">
        <div 
          v-for="(step, i) in steps" 
          :key="i"
          class="step-item"
          :class="{ 'left': i % 2 === 0, 'right': i % 2 === 1, 'animate-in': visibleSteps.has(i) }"
          v-intersect="{ handler: (entries) => onStepIntersect(entries, i), options: { threshold: 0.3 } }"
        >
          <div class="step-number">{{ i + 1 }}</div>
          <div class="step-content">
            <div class="step-icon-wrapper">
              <component :is="step.icon" class="step-icon" />
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import IconClipboard from './icons/IconClipboard.vue'
import IconFileText from './icons/IconFileText.vue'
import IconDollar from './icons/IconDollar.vue'
import IconCheckCircle from './icons/IconCheckCircle.vue'

const visibleSteps = ref(new Set())

const steps = [
  {
    title: 'Aprobación del Proyecto',
    description: 'Tener aprobada por tu docente de Ciencias Naturales una de las propuestas presentadas en clase. ¡Puedes guiarte del temario para seleccionar tu proyecto!',
    icon: IconClipboard,
  },
  
  {
    title: 'Aporte Económico',
    description: 'Entregar Q30.00 (30 Quetzales) para la realización del evento. Este aporte ayuda a cubrir los costos de logística y materiales de la feria.',
    icon: IconDollar,
  },
  {
    title: '¡Listo para Crear!',
    description: '¡Listo!, si cumpliste con los pasos anteriores, es hora de comenzar a buscar los materiales para realizar tu proyecto. ¡La ciencia te espera!',
    icon: IconCheckCircle,
  },
]

const onStepIntersect = (entries, index) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      visibleSteps.value.add(index)
    }
  })
}
</script>

<style scoped>
.participar-section {
  padding: 6rem 2rem;
  background: var(--gray-bg);
  position: relative;
}

.participar-container {
  max-width: 1000px;
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

.steps-timeline {
  position: relative;
  padding: 2rem 0;
}

.step-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-item.left {
  flex-direction: row;
  transform: translateX(-60px);
  padding-right: calc(50% + 3rem);
}

.step-item.right {
  flex-direction: row-reverse;
  transform: translateX(60px);
  padding-left: calc(50% + 3rem);
}

.step-item.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.step-number {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--mint), var(--mint-dark));
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-title);
  font-weight: 800;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 212, 170, 0.3);
  z-index: 2;
  border: 4px solid var(--gray-bg);
}

.step-content {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-light);
  transition: all 0.3s ease;
}

.step-content:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--mint);
}

.step-icon-wrapper {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(0, 212, 170, 0.1), rgba(0, 212, 170, 0.05));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.step-icon {
  width: 28px;
  height: 28px;
  color: var(--mint);
}

.step-title {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--navy);
  margin-bottom: 0.5rem;
}

.step-desc {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--gray-dark);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .participar-section {
    padding: 4rem 1.25rem;
  }

  .step-item.left,
  .step-item.right {
    flex-direction: row;
    padding-left: 70px;
    padding-right: 0;
    transform: translateX(-30px);
  }

  .step-item.animate-in {
    transform: translateX(0);
  }

  .step-number {
    left: 28px;
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
    border-width: 3px;
  }
}
</style>
