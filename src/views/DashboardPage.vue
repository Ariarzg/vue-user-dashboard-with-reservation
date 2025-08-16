<script setup>
import { useUserStore } from '@/stores/user';
import { Button, useToast } from 'primevue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();

const userName = userStore.currentUser.name;

function logoutUser() {
  const logoutResponse = userStore.logoutUser();
  if (logoutResponse.valid) {
    router.push('/');
    toast.add({
      severity: 'success',
      detail: logoutResponse.message,
      summary: 'Account',
      life: 3000,
    });
  } else {
    toast.add({
      severity: 'warn',
      detail: logoutResponse.message,
      summary: 'Account',
      life: 3000,
    });
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 mt-[20svh]">
    <h1>Welcome back, {{ userName }}</h1>
    <Button severity="danger" type="button" @click.prevent="logoutUser">Logout</Button>
  </div>
</template>
