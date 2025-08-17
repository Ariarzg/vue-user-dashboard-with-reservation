<script setup>
import { onMounted } from 'vue';
import { Toast } from 'primevue';
import AppHeader from './components/AppHeader.vue';
import { useLayoutStore } from '@/stores/layout';

const layoutStore = useLayoutStore();
// layoutStore.updateColors('primary', 'blue');

onMounted(() => {
  layoutStore.updateColors('primary', layoutStore.primary);

  if (layoutStore.darkMode) {
    document.documentElement.classList.toggle('p-dark');
  }
});
</script>

<template>
  <Toast position="top-center" />
  <div class="relative">
    <AppHeader />
    <RouterView></RouterView>
  </div>
</template>
