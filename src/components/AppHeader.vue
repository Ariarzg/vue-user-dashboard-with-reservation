<script setup>
import { useLayoutStore } from '@/stores/layout';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const layoutStore = useLayoutStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const userIconStyle = computed(() => {
  return userStore.currentUser ? { color: 'var(--p-primary-color)', cursor: 'pointer' } : {};
});

function goToDashboard() {
  router.push('/dashboard');
}
</script>

<template>
  <div
    class="p-3 bg-surface-50 dark:bg-surface-900 border-b-2 border-primary-300 w-full sticky top-0"
  >
    <div class="flex justify-between items-center">
      <div class="text-md flex gap-2 items-center">
        <i
          class="pi pi-user max-sm:bg-surface-200/75 dark:max-sm:bg-surface-800 p-2 rounded-md"
          style="font-size: 1.5rem"
          :style="userIconStyle"
          @click="goToDashboard"
          :title="userStore.currentUser ? 'Dashboard' : ''"
        ></i>
        <span class="leading-none">{{ route.name }}</span>
      </div>
      <button
        type="button"
        class="w-10 h-10 rounded-full grid place-items-center bg-surface-200/75 dark:bg-surface-800 cursor-pointer"
        @click="layoutStore.toggleDarkMode"
      >
        <i
          :class="[
            'pi text-base',
            { 'pi-moon': !layoutStore.darkMode, 'pi-sun': layoutStore.darkMode },
          ]"
        ></i>
      </button>
    </div>
  </div>
</template>
