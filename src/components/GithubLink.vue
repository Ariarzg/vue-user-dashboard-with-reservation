<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function openGithub() {
  window.open('https://github.com/Ariarzg/vue-user-dashboard-with-reservation');
}
</script>

<template>
  <div
    class="absolute bottom-12 left-4 rounded-full bg-surface-200 dark:bg-surface-900 w-12 h-12 grid place-items-center cursor-pointer"
    @click="openGithub"
  >
    <FontAwesomeIcon :icon="faGithub" size="2xl" />
  </div>
</template>
