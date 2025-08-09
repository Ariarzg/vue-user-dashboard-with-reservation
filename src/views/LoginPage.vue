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
} from 'primevue';
import { reactive } from 'vue';
import { yupResolver } from '@primevue/forms/resolvers/yup';

const toast = useToast();

const initialValues = reactive({
  email: '',
});
const resolver = yupResolver(
  yup.object().shape({
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
const onFormSubmit = ({ valid }) => {
  if (valid) {
    console.log('passed');

    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
  }
};
</script>

<!-- ------------------------------------------------------------------ -->

<template>
  <div class="flex items-center justify-center mt-52">
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

      <!-- <pre>{{ $form }}</pre> -->
    </Form>
  </div>
</template>
