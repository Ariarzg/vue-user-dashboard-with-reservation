<script setup>
import { Form } from 'vee-validate';
import {
  FloatLabel,
  InputText,
  InputIcon,
  IconField,
  Password,
  Button,
  Divider,
  Message,
} from 'primevue';
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <Form class="max-w-xs flex flex-col gap-2 w-full" @submit.prevent="">
      <FloatLabel variant="on">
        <IconField>
          <InputIcon class="pi pi-envelope" />
          <InputText id="email" fluid size="large" />
        </IconField>
        <label for="email">Email</label>
      </FloatLabel>

      <FloatLabel variant="on">
        <IconField>
          <InputIcon class="pi pi-asterisk" />
          <Password
            id="password"
            size="large"
            pt:maskIcon:class="cursor-pointer"
            pt:unmaskIcon:class="cursor-pointer"
            toggleMask
            fluid
          >
            <template #footer>
              <Divider />
              <ul class="pl-2 my-0 leading-normal text-sm">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
              </ul>
            </template>
          </Password>
        </IconField>
        <label for="password">Password</label>
      </FloatLabel>

      <Button fluid type="submit" class="mt-8" size="large">Login</Button>
    </Form>
  </div>
</template>
