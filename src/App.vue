<script setup lang="ts">
import { RouterView } from 'vue-router'

import { ref, onMounted, onBeforeUnmount } from 'vue'

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
  prompt(): Promise<void>
}

const installable = ref(false)
const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt.value = e as BeforeInstallPromptEvent // Type assertion here
    installable.value = true
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', () => {})
})

function promptInstall() {
  if (deferredPrompt.value) {
    // Show the install prompt
    deferredPrompt.value.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      deferredPrompt.value = null
      installable.value = false
    })
  }
}
</script>

<template>
  <div class="hero"></div>

  <RouterView />
</template>

<style scoped>
.hero {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  height: 100%;
  background-image: url('/img/motovun.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
}

@media (min-width: 1024px) {
  .hero {
    background-position: right;
  }
}
</style>
