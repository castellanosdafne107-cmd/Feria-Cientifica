<template>
  <header 
    class="app-header"
    :class="{ 'scrolled': isScrolled, 'menu-open': isMenuOpen }"
  >
    <div class="header-container">
      <!-- Logo -->
      <NuxtLink to="/" class="logo-link" @click="closeMenu">
        <div class="logo-wrapper">
          <img 
            src="/images/logocolegio.jpg" 
            alt="Logo Colegio Visión de Fe" 
            class="logo-img"
            loading="eager"
          />
          <div class="logo-text">
            <span class="logo-title">Colegio Visión de Fe</span>
            <span class="logo-subtitle">Feria Científica 2026</span>
          </div>
        </div>
      </NuxtLink>

      <!-- Navegación Desktop -->
      <nav class="nav-desktop">
        <ul class="nav-list">
          <li v-for="item in navItems" :key="item.href">
            <a 
              :href="item.href" 
              class="nav-link"
              :class="{ 'active': activeSection === item.href.replace('#', '') }"
              @click="scrollToSection(item.href)"
            >
              <component :is="item.icon" class="nav-icon" />
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Botón CTA -->
      <a href="#participar" class="cta-button" @click.prevent="scrollToSection('#participar')">
        <IconFlask class="cta-icon" />
        <span>Participar</span>
      </a>

      <!-- Botón menú móvil -->
      <button 
        class="menu-toggle"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-label="Abrir menú"
      >
        <span class="menu-bar" :class="{ 'open': isMenuOpen }"></span>
        <span class="menu-bar" :class="{ 'open': isMenuOpen }"></span>
        <span class="menu-bar" :class="{ 'open': isMenuOpen }"></span>
      </button>
    </div>

    <!-- Menú móvil -->
    <Transition name="slide-down">
      <nav v-if="isMenuOpen" class="nav-mobile">
        <ul class="nav-mobile-list">
          <li v-for="item in navItems" :key="item.href">
            <a 
              :href="item.href" 
              class="nav-mobile-link"
              @click="scrollToSection(item.href); closeMenu()"
            >
              <component :is="item.icon" class="nav-mobile-icon" />
              <span>{{ item.label }}</span>
            </a>
          </li>
          <li>
            <a href="#participar" class="nav-mobile-cta" @click.prevent="scrollToSection('#participar'); closeMenu()">
              <IconFlask class="nav-mobile-icon" />
              <span>Participar</span>
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import IconHome from './icons/IconHome.vue'
import IconClipboard from './icons/IconClipboard.vue'
import IconBeaker from './icons/IconBeaker.vue'
import IconBookOpen from './icons/IconBookOpen.vue'
import IconBell from './icons/IconBell.vue'
import IconFlask from './icons/IconFlask.vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const activeSection = ref('')

const navItems = [
  { href: '#inicio', label: 'Inicio', icon: IconHome },
  { href: '#participar', label: 'Cómo Participar', icon: IconClipboard },
  { href: '#materiales', label: 'Materiales', icon: IconBeaker },
  { href: '#lapbook', label: 'Lapbook', icon: IconBookOpen },
  { href: '#recordatorio', label: 'Recordatorio', icon: IconBell },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

const scrollToSection = (href) => {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    const headerHeight = 80
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  // Detectar sección activa
  const sections = navItems.map(item => item.href.replace('#', ''))
  for (const section of sections.reverse()) {
    const el = document.getElementById(section)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 120) {
        activeSection.value = section
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
}

.app-header.scrolled {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: var(--shadow-md);
}

.app-header.scrolled .logo-title,
.app-header.scrolled .nav-link,
.app-header.scrolled .nav-icon {
  color: var(--navy);
}

.app-header.scrolled .nav-link::after {
  background: var(--mint);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-img {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease;
}

.logo-link:hover .logo-img {
  transform: scale(1.05);
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--navy);
  line-height: 1.2;
  transition: color 0.3s ease;
}

.logo-subtitle {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--mint);
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Navegación Desktop */
.nav-desktop {
  display: flex;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  color: var(--navy);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--mint);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover,
.nav-link.active {
  color: var(--mint);
  background: rgba(0, 212, 170, 0.08);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 60%;
}

.nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* Botón CTA */
.cta-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background: linear-gradient(135deg, var(--mint) 0%, var(--mint-dark) 100%);
  color: var(--white);
  text-decoration: none;
  font-family: var(--font-title);
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 15px rgba(0, 212, 170, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 212, 170, 0.4);
}

.cta-icon {
  width: 18px;
  height: 18px;
}

/* Menú móvil toggle */
.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
}

.menu-bar {
  display: block;
  width: 24px;
  height: 2.5px;
  background: var(--navy);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-bar.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-bar.open:nth-child(2) {
  opacity: 0;
}

.menu-bar.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Navegación móvil */
.nav-mobile {
  display: none;
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-top: 1px solid var(--gray-light);
  box-shadow: var(--shadow-lg);
  padding: 1.5rem 2rem;
}

.nav-mobile-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-mobile-link,
.nav-mobile-cta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  color: var(--navy);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.nav-mobile-link:hover {
  background: rgba(0, 212, 170, 0.08);
  color: var(--mint);
}

.nav-mobile-cta {
  background: linear-gradient(135deg, var(--mint) 0%, var(--mint-dark) 100%);
  color: var(--white);
  margin-top: 0.5rem;
  font-weight: 600;
}

.nav-mobile-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Transiciones */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-desktop {
    display: none;
  }

  .cta-button {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-mobile {
    display: block;
  }

  .header-container {
    padding: 0 1.25rem;
  }
}

@media (max-width: 480px) {
  .logo-title {
    font-size: 0.95rem;
  }

  .logo-subtitle {
    font-size: 0.65rem;
  }

  .logo-img {
    width: 40px;
    height: 40px;
  }
}
</style>
