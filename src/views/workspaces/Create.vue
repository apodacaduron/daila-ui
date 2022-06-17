<script setup lang="ts">
import { DLabel, DInput, DButton } from '../../components/design-system'
import GoogleIcon from '../../assets/png/google-48.png'
import { useForm } from '@evilkiwi/form'
import { useLogin } from '../../composables'
import { useUserStore } from '../../stores/useUserStore';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const loginHook = useLogin()
const userStore = useUserStore()
const router = useRouter()
const { useField, handle, loading } = useForm<{
  email: string
  password: string
}>({
  defaults: {},
})
const email = useField('email', {
  type: 'email',
  required: true,
})
const password = useField('password', {
  required: true,
})

const onSubmit = handle(async ({ email, password }) => {
  await loginHook.signInWithCredentials(email, password)
})
const signInWithGoogle = async () => {
  await loginHook.signInWithGoogle()
}

watch(() => userStore.user?.hasWorkspace, () => {
  if (userStore.user?.hasWorkspace) {
    router.push('/w/123')
  } else {
    router.push('/w/create')
  }
})
</script>

<template>
  <div class="workspaces-create">
    <div class="workspaces-create__box">
      <div class="workspaces-create__box__title">
        <h1>Create a workspace</h1>
        <span>Choose the area that suits you.</span>
      </div>
      <form @submit.prevent="onSubmit" class="workspaces-create__box__form">
        <div class="workspaces-create__box__form__row">
          <DLabel htmlFor="email">Area</DLabel>
          <DInput
            id="email"
            placeholder="Enter your email"
            type="email"
            v-model="email.value"
            :error="Boolean(email.error)"
            :hintText="email.error?.message"
          />
        </div>
        <div class="workspaces-create__box__form__button">
          <DButton type="submit" fullWidth :disabled="loading">Create</DButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.workspaces-create {
  @apply flex justify-center items-center min-h-screen;
  &__box {
    @apply max-w-[360px];
    &__title {
      @apply flex flex-col gap-3 mb-8 text-center;
      h1 {
        @apply text-3xl text-slate-900 font-semibold;
      }
      span {
        @apply text-base text-slate-500 font-normal;
      }
    }

    &__form {
      @apply flex flex-col gap-5;
      &__row {
        @apply flex flex-col gap-1;
      }
    }
  }
}
</style>
