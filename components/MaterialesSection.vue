<template>
  <section id="materiales" class="materiales-section">
    <div class="materiales-container">
      <div class="section-header">
        <span class="section-tag">Sección 2</span>
        <h2 class="section-title">Materiales y <span class="text-gradient">Equipo</span></h2>
        <p class="section-desc">
          Es momento de comenzar a buscar los materiales y equipo que nos ayudarán a construir nuestro proyecto científico.
        </p>
      </div>

      <div class="materiales-content">
        <div class="materiales-image-wrapper" v-intersect="{ handler: onImageIntersect, options: { threshold: 0.3 } }">
          <div class="image-frame" :class="{ 'animate-in': imageVisible }">
            <img src="/images/seccion-materiales.png" alt="Materiales escolares y de laboratorio" class="materiales-image" />
            <div class="image-overlay"></div>
            <div class="image-badge">
              <IconBeaker class="badge-icon" />
              <span>Materiales Disponibles</span>
            </div>
          </div>
        </div>

        <div class="materiales-info" v-intersect="{ handler: onInfoIntersect, options: { threshold: 0.3 } }">
          <div class="info-card" :class="{ 'animate-in': infoVisible }">
            <div class="info-header">
              <IconBeaker class="info-icon" />
              <h3>Tipos de Materiales</h3>
            </div>
            <p class="info-text">
              Los materiales pueden ser <strong>Nuevos</strong> o <strong>Reciclados</strong>. Todo depende del proyecto que realizarás en la feria de ciencias.
            </p>

            <div class="material-types">
              <div class="type-item">
                <div class="type-dot new"></div>
                <span>Materiales Nuevos</span>
              </div>
              <div class="type-item">
                <div class="type-dot recycled"></div>
                <span>Materiales Reciclados</span>
              </div>
            </div>
          </div>

          <div class="info-card highlight" :class="{ 'animate-in': infoVisible }" style="transition-delay: 150ms;">
            <div class="info-header">
              <IconCalendar class="info-icon" />
              <h3>Semana de Pruebas</h3>
            </div>
            <p class="info-text">
              Es importante tener listos todos los materiales, ya que los estaremos utilizando para realizar las pruebas en la semana del <strong>14 al 22 de julio de 2026</strong>.
            </p>
            <div class="date-badge">
              <IconCalendar class="date-icon" />
              <span>14 - 22 Julio 2026</span>
            </div>
          </div>

          <div class="info-card" :class="{ 'animate-in': infoVisible }" style="transition-delay: 300ms;">
            <div class="info-header">
              <IconAlert class="info-icon" />
              <h3>Importante</h3>
            </div>
            <ul class="info-list">
              <li>
                <IconCheck class="list-check" />
                <span>Ten listos todos los materiales antes de la fecha</span>
              </li>
              <li>
                <IconCheck class="list-check" />
                <span>Consulta con tu docente si tienes dudas</span>
              </li>
              <li>
                <IconCheck class="list-check" />
                <span>Organiza tu equipo de trabajo</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import IconBeaker from './icons/IconBeaker.vue'
import IconCalendar from './icons/IconCalendar.vue'
import IconAlert from './icons/IconAlert.vue'
import IconCheck from './icons/IconCheck.vue'

const imageVisible = ref(false)
const infoVisible = ref(false)

const onImageIntersect = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) imageVisible.value = true
  })
}

const onInfoIntersect = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) infoVisible.value = true
  })
}
</script>

<style scoped>
.materiales-section {
  padding: 6rem 2rem;
  background: var(--white);
  position: relative;
}

.materiales-container {
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
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

.materiales-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.materiales-image-wrapper {
  position: sticky;
  top: 100px;
}

.image-frame {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  transform: translateX(-40px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-frame.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.materiales-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.image-frame:hover .materiales-image {
  transform: scale(1.03);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(10, 37, 64, 0.4) 100%);
}

.image-badge {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--navy);
}

.badge-icon {
  width: 18px;
  height: 18px;
  color: var(--mint);
}

.materiales-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: var(--white);
  border: 1px solid var(--gray-light);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateX(40px);
}

.info-card.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.info-card:hover {
  border-color: var(--mint);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.info-card.highlight {
  background: linear-gradient(135deg, rgba(0, 212, 170, 0.05), rgba(0, 212, 170, 0.02));
  border-color: var(--mint);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.info-icon {
  width: 24px;
  height: 24px;
  color: var(--mint);
}

.info-header h3 {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--navy);
}

.info-text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--gray-dark);
  line-height: 1.7;
}

.info-text strong {
  color: var(--navy);
}

.material-types {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.25rem;
}

.type-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--gray-dark);
}

.type-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.type-dot.new {
  background: var(--mint);
}

.type-dot.recycled {
  background: linear-gradient(135deg, #10B981, #059669);
}

.date-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  background: linear-gradient(135deg, var(--mint), var(--mint-dark));
  color: var(--white);
  border-radius: var(--radius-md);
  font-family: var(--font-title);
  font-weight: 600;
  font-size: 0.9rem;
}

.date-icon {
  width: 18px;
  height: 18px;
}

.info-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--gray-dark);
  line-height: 1.5;
}

.list-check {
  width: 18px;
  height: 18px;
  color: var(--mint);
  flex-shrink: 0;
  margin-top: 2px;
}

@media (max-width: 1024px) {
  .materiales-content {
    grid-template-columns: 1fr;
  }

  .materiales-image-wrapper {
    position: relative;
    top: 0;
  }

  .image-frame {
    max-width: 600px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .materiales-section {
    padding: 4rem 1.25rem;
  }

  .material-types {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
