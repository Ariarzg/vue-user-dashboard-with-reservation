<script setup>
import { Form } from '@primevue/forms';
import * as yup from 'yup';
import {
  FloatLabel,
  InputText,
  InputIcon,
  IconField,
  Password,
  Button,
  Divider,
  useToast,
  Toast,
  Message,
} from 'primevue';
import { onMounted, reactive } from 'vue';
import { yupResolver } from '@primevue/forms/resolvers/yup';
import { useLayoutStore } from '@/stores/layout';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const toast = useToast();

const router = useRouter();

const layoutStore = useLayoutStore();
const userStore = useUserStore();

const initialValues = reactive({
  email: '',
});
const resolver = yupResolver(
  yup.object().shape({
    email: yup.string().required('Email is required').email('Please Provide a Valid Email'),
  }),
);

const onFormSubmit = (state) => {
  if (state.valid) {
    const values = state.values;

    const user = {
      email: values.email,
      password: values.password,
    };

    userStore.loginUser(user).then((loginResponse) => {
      if (loginResponse.valid) {
        const userName = userStore.currentUser.name;

        toast.add({
          severity: 'success',
          detail: loginResponse.message,
          summary: 'Account',
          life: 3000,
        });
        toast.add({
          summary: `Welcome back ${userName}`,
          life: 5000,
        });
        router.push('/dashboard');
      } else {
        toast.add({
          severity: 'error',
          detail: loginResponse.message,
          summary: 'Account',
          life: 3000,
        });
      }
    });
  }
};

onMounted(() => {
  layoutStore.setPrimary('sky');
});
</script>

<!-- ------------------------------------------------------------------ -->

<template>
  <div class="flex flex-col items-center justify-center gap-4 mt-52">
    <Toast position="top-center" />

    <Form
      v-slot="$form"
      :initialValues
      :resolver="resolver"
      class="max-w-xs flex flex-col gap-3 w-full"
      @submit="onFormSubmit"
    >
      <FloatLabel variant="on">
        <IconField>
          <InputIcon
            class="pi pi-envelope"
            :style="{
              color: $form.email?.invalid
                ? 'var(--p-inputtext-invalid-border-color)'
                : 'var(--p-inputtext-border-color)',
            }"
          />
          <InputText id="email" name="email" fluid size="large" />
        </IconField>
        <label for="email">Email</label>
      </FloatLabel>

      <FloatLabel variant="on">
        <IconField>
          <InputIcon
            class="pi pi-asterisk"
            :style="{
              color: $form.password?.invalid
                ? 'var(--p-inputtext-invalid-border-color)'
                : 'var(--p-inputtext-border-color)',
            }"
          />
          <Password
            id="password"
            name="password"
            size="large"
            :feedback="false"
            pt:maskIcon:class="cursor-pointer invalid:text-red-500"
            pt:unmaskIcon:class="cursor-pointer"
            toggleMask
            fluid
          >
            <template #footer v-if="$form.password?.invalid">
              <Divider />
              <ul class="pl-2 my-0 leading-normal text-sm">
                <li
                  v-for="error in $form.password?.errors"
                  :key="error.ValidationError"
                  class="flex gap-2 items-center"
                >
                  <span
                    class="pi pi-key"
                    style="color: var(--p-inputtext-invalid-border-color)"
                  ></span>
                  <span>{{ error.message }}</span>
                </li>
              </ul>
            </template>
          </Password>
        </IconField>
        <label for="password">Password</label>
      </FloatLabel>

      <Button fluid type="submit" class="mt-8" size="large">Login</Button>
    </Form>
    <Message severity="secondary" icon="pi pi-user-plus" variant="simple"
      >Don't have an account ?
      <RouterLink to="/signup" class="text-primary-500 cursor-pointer">Sign Up</RouterLink></Message
    >
  </div>
</template>
