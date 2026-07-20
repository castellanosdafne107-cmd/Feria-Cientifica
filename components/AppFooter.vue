<template>
  <footer class="app-footer">
    <div class="footer-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#0A2540"/>
      </svg>
    </div>

    <div class="footer-content">
      <div class="footer-container">
        <!-- Columna 1: Info del evento -->
        <div class="footer-col">
          <div class="footer-brand">
            <img src="/images/logocolegio.jpg" alt="Logo" class="footer-logo" />
            <div>
              <h3 class="footer-brand-title">Colegio Visión de Fe</h3>
              <p class="footer-brand-subtitle">Feria Científica 2026</p>
            </div>
          </div>
          <p class="footer-desc">
            Impulsando el conocimiento científico y tecnológico en nuestra comunidad estudiantil. 
            Ciencia sin límites, futuro sin fronteras.
          </p>
        </div>

        <!-- Columna 2: Enlaces rápidos -->
        <div class="footer-col">
          <h4 class="footer-heading">Enlaces Rápidos</h4>
          <ul class="footer-links">
            <li><a href="#participar" @click.prevent="scrollTo('#participar')">Cómo Participar</a></li>
            <li><a href="#materiales" @click.prevent="scrollTo('#materiales')">Materiales y Equipo</a></li>
            <li><a href="#lapbook" @click.prevent="scrollTo('#lapbook')">Lapbook Giratorio</a></li>
            <li><a href="#recordatorio" @click.prevent="scrollTo('#recordatorio')">Recordatorios</a></li>
          </ul>
        </div>

        <!-- Columna 3: Contacto -->
        <div class="footer-col">
          <h4 class="footer-heading">Contacto</h4>
          <ul class="footer-contact">
            <li>
              <IconMapPin class="contact-icon" />
              <span>Colegio Visión de Fe, Guatemala</span>
            </li>

            <li>
              <IconUser class="contact-icon" />
              <span>Docente: Sitraly Castellanos</span>
            </li>
          </ul>
        </div>

        <!-- Columna 4: Horario -->
        <div class="footer-col">
          <h4 class="footer-heading">Calendario del Evento</h4>
          <div class="footer-schedule">
            
            <div class="schedule-item">
              <IconCalendar class="schedule-icon" />
              <div>
                <strong>Pruebas</strong>
                <span>Del 20 de julio al 31 de julio</span>
              </div>
            </div>
            <div class="schedule-item">
              <IconCalendar class="schedule-icon" />
              <div>
                <strong>Feria Oficial</strong>
                <span>07 de Agosto</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <p>© 2026 Colegio Visión de Fe. Feria Científica "Ciencia Sin Límites". Docente Sitraly Castellanos.</p>
        <p class="footer-credit">Diseñado con pasión por la ciencia 🧬</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import IconMapPin from './icons/IconMapPin.vue'

import IconUser from './icons/IconUser.vue'
import IconCalendar from './icons/IconCalendar.vue'

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
.app-footer {
  position: relative;
  margin-top: 4rem;
}

.footer-wave {
  display: block;
  line-height: 0;
  margin-bottom: -1px;
}

.footer-wave svg {
  width: 100%;
  height: auto;
  display: block;
}

.footer-content {
  background: var(--navy);
  padding: 3rem 0 1.5rem;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
  gap: 3rem;
}

/* Columna 1: Brand */
.footer-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.footer-logo {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  border: 2px solid rgba(0, 212, 170, 0.3);
}

.footer-brand-title {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--white);
}

.footer-brand-subtitle {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--mint);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-desc {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  max-width: 320px;
}

/* Columnas 2-4 */
.footer-heading {
  font-family: var(--font-title);
  font-weight: 600;
  font-size: 1rem;
  color: var(--white);
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(0, 212, 170, 0.3);
  display: inline-block;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-links a::before {
  content: '›';
  color: var(--mint);
  font-weight: bold;
  transition: transform 0.3s ease;
}

.footer-links a:hover {
  color: var(--mint);
  padding-left: 4px;
}

.footer-links a:hover::before {
  transform: translateX(4px);
}

/* Contacto */
.footer-contact {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-contact li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.5;
}

.contact-icon {
  width: 18px;
  height: 18px;
  color: var(--mint);
  flex-shrink: 0;
  margin-top: 2px;
}

/* Horario */
.footer-schedule {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.schedule-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.schedule-icon {
  width: 18px;
  height: 18px;
  color: var(--mint);
  flex-shrink: 0;
  margin-top: 2px;
}

.schedule-item div {
  display: flex;
  flex-direction: column;
}

.schedule-item strong {
  color: var(--white);
  font-family: var(--font-title);
  font-size: 0.85rem;
  font-weight: 600;
}

.schedule-item span {
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font-body);
  font-size: 0.8rem;
}

/* Copyright */
.footer-bottom {
  max-width: 1400px;
  margin: 3rem auto 0;
  padding: 1.5rem 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--font-body);
  font-size: 0.85rem;
}

.footer-credit {
  margin-top: 0.5rem;
  color: var(--mint) !important;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1.25rem;
  }

  .footer-bottom {
    padding: 1.5rem 1.25rem 0;
  }
}
</style>
