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
  Message,
} from 'primevue';
import { reactive, onMounted } from 'vue';
import { yupResolver } from '@primevue/forms/resolvers/yup';
import { useLayoutStore } from '@/stores/layout';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const toast = useToast();

const router = useRouter();

const layoutStore = useLayoutStore();
const userStore = useUserStore();

const initialValues = reactive({
  name: '',
  email: '',
  password: '',
});
const resolver = yupResolver(
  yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Please Provide a Valid Email'),
    password: yup
      .string()
      .required('Password is Required')
      .min(8, 'Minimum 8 characters.')
      .max(20, 'Maximum 20 characters.')
      .test('lowercase', 'At least one lowercase.', (value) => /[a-z]/.test(value))
      .test('uppercase', 'At least one uppercase.', (value) => /[A-Z]/.test(value))
      .test('number', 'At least one number.', (value) => /[0-9]/.test(value)),
  }),
);

const onFormSubmit = (state) => {
  if (state.valid) {
    const values = state.values;

    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    userStore.signupUser(user).then((signupResponse) => {
      if (signupResponse.valid) {
        toast.add({
          severity: 'success',
          summary: 'Account',
          detail: signupResponse.message,
          life: 3000,
        });
        toast.add({
          severity: 'info',
          summary: 'Account',
          detail: 'In order to use dashboard, please log in with your newly created account.',
          life: 8000,
        });
        router.push('/');
      } else {
        toast.add({
          severity: 'error',
          summary: 'Account',
          detail: signupResponse.message,
          life: 3000,
        });
      }
    });
  }
};

onMounted(() => {
  layoutStore.setPrimary('lime');
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 mt-52">
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
            class="pi pi-info-circle"
            :style="{
              color: $form.name?.invalid
                ? 'var(--p-inputtext-invalid-border-color)'
                : 'var(--p-inputtext-border-color)',
            }"
          />
          <InputText id="name" name="name" fluid size="large" />
        </IconField>
        <label for="name">Name</label>
      </FloatLabel>

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

      <Button fluid type="submit" class="mt-8" size="large">Sign Up</Button>
    </Form>
    <Message severity="secondary" icon="pi pi-user" variant="simple"
      >Have an account already ?
      <RouterLink to="/" class="text-primary-500 cursor-pointer">Login</RouterLink></Message
    >
  </div>
</template>
