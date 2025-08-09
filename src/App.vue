<script setup>
import { onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import { useLayoutStore } from '@/stores/layout';

const layoutStore = useLayoutStore();
// layoutStore.updateColors('primary', 'blue');

onMounted(() => {
  layoutStore.updateColors('primary', layoutStore.primary);
});
</script>

<template>
  <div class="relative">
    <AppHeader />
    <RouterView class="mt-54"></RouterView>
  </div>
</template>
