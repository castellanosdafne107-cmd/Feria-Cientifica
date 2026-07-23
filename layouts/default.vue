<template>
  <div class="app-wrapper">
    <!-- Fondo dinámico de partículas -->
    <div class="particles-bg" aria-hidden="true">
      <div v-for="n in 80" :key="n" class="particle" :style="getParticleStyle(n)"></div>
    </div>

    <!-- Canvas de fondo biológico -->
    <canvas ref="bioCanvas" class="bio-canvas" aria-hidden="true"></canvas>

    <!-- Contenido principal -->
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
const bioCanvas = ref(null)

// Partículas estilo biológico
const getParticleStyle = (n) => {
  const size = Math.random() * 6 + 2
  const left = Math.random() * 100
  const top = Math.random() * 100
  const delay = Math.random() * 15
  const duration = Math.random() * 10 + 10
  const opacity = Math.random() * 0.3 + 0.1

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    top: `${top}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity: opacity,
  }
}

// Canvas animado de fondo biológico
onMounted(() => {
  const canvas = bioCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let animationId
  let time = 0

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  // Células flotantes
  const cells = []
  for (let i = 0; i < 25; i++) {
    cells.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 60 + 30,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      hue: Math.random() * 40 + 140, // Verde-menta
      opacity: Math.random() * 0.03 + 0.01,
    })
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    time += 0.005

    // Dibujar células
    cells.forEach((cell, i) => {
      cell.x += cell.speedX
      cell.y += cell.speedY

      // Rebotar en bordes
      if (cell.x < -cell.radius) cell.x = canvas.width + cell.radius
      if (cell.x > canvas.width + cell.radius) cell.x = -cell.radius
      if (cell.y < -cell.radius) cell.y = canvas.height + cell.radius
      if (cell.y > canvas.height + cell.radius) cell.y = -cell.radius

      // Dibujar célula con efecto orgánico
      const gradient = ctx.createRadialGradient(
        cell.x, cell.y, 0,
        cell.x, cell.y, cell.radius
      )
      gradient.addColorStop(0, `hsla(${cell.hue}, 80%, 60%, ${cell.opacity * 2})`)
      gradient.addColorStop(0.5, `hsla(${cell.hue}, 70%, 50%, ${cell.opacity})`)
      gradient.addColorStop(1, `hsla(${cell.hue}, 60%, 40%, 0)`)

      ctx.beginPath()
      ctx.arc(cell.x, cell.y, cell.radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Núcleo de la célula
      ctx.beginPath()
      ctx.arc(
        cell.x + Math.sin(time + i) * 5,
        cell.y + Math.cos(time + i) * 5,
        cell.radius * 0.2,
        0, Math.PI * 2
      )
      ctx.fillStyle = `hsla(${cell.hue}, 90%, 70%, ${cell.opacity * 3})`
      ctx.fill()
    })

    // Dibujar conexiones entre células cercanas (sinapsis)
    for (let i = 0; i < cells.length; i++) {
      for (let j = i + 1; j < cells.length; j++) {
        const dx = cells[i].x - cells[j].x
        const dy = cells[i].y - cells[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 300) {
          ctx.beginPath()
          ctx.moveTo(cells[i].x, cells[i].y)
          ctx.lineTo(cells[j].x, cells[j].y)
          ctx.strokeStyle = `hsla(160, 70%, 50%, ${0.02 * (1 - dist / 300)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    // Dibujar moléculas flotantes pequeñas
    for (let i = 0; i < 15; i++) {
      const mx = (Math.sin(time * 0.5 + i * 1.5) * 0.5 + 0.5) * canvas.width
      const my = (Math.cos(time * 0.3 + i * 2) * 0.5 + 0.5) * canvas.height

      // Hexágono molecular
      ctx.beginPath()
      for (let h = 0; h < 6; h++) {
        const angle = (Math.PI / 3) * h + time * 0.2
        const hx = mx + Math.cos(angle) * 15
        const hy = my + Math.sin(angle) * 15
        if (h === 0) ctx.moveTo(hx, hy)
        else ctx.lineTo(hx, hy)
      }
      ctx.closePath()
      ctx.strokeStyle = `hsla(160, 80%, 55%, 0.08)`
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    animationId = requestAnimationFrame(draw)
  }

  draw()

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.app-wrapper {
  position: relative;
  min-height: 100vh;
  background: var(--white);
}

.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: var(--mint);
  animation: particle-float linear infinite;
  filter: blur(1px);
}

.bio-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

main {
  position: relative;
  z-index: 1;
}
</style>
