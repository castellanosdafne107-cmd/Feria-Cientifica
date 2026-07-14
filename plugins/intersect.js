export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('intersect', {
    mounted(el, binding) {
      const observer = new IntersectionObserver(
        (entries) => {
          binding.value.handler(entries)
        },
        binding.value.options || { threshold: 0.1 }
      )
      observer.observe(el)
      el._intersectObserver = observer
    },
    unmounted(el) {
      if (el._intersectObserver) {
        el._intersectObserver.disconnect()
      }
    },
  })
})
