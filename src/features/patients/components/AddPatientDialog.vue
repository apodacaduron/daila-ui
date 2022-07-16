<script setup lang="ts">
import {
  DDialog,
  DButton,
  DInput,
  DLabel,
} from '../../../components/primitives'
import { useForm } from '@evilkiwi/form'

interface Props {
  show: boolean
}
defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const formInstance = useForm<{
  email: string
}>({
  defaults: {},
})
const email = formInstance.useField('email', {
  type: 'email',
  required: true,
})

const onSubmit = formInstance.handle(async (data) => {
  emit('close')
})
</script>

<template>
  <DDialog :show="show">
    <template #header>Add patient</template>
    <template #default>
      <form @submit.prevent="onSubmit" class="sign-up__box__form">
        <div class="sign-up__box__form__row">
          <DLabel htmlFor="email">Email*</DLabel>
          <DInput
            id="email"
            placeholder="Enter your email"
            type="email"
            v-model="email.value"
            :error="Boolean(email.error)"
            :hintText="email.error?.message"
          />
        </div>
      </form>
    </template>
    <template #footer>
      <DButton
        :disabled="formInstance.loading.value"
        variant="outlined"
        @click="$emit('close')"
      >
        Cancel
      </DButton>
      <DButton
        :disabled="formInstance.loading.value"
        variant="translucent"
        @click="onSubmit"
      >
        Add to workspace
      </DButton>
    </template>
  </DDialog>
</template>

<style lang="scss" scoped>
.form {
  @apply flex flex-col gap-3;
  &__row {
    @apply flex;
  }
}
</style>
