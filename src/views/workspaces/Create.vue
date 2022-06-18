<script setup lang="ts">
import { DLabel, DCombobox, DButton, DInput } from '../../components/design-system'
import { useForm } from '@evilkiwi/form'
import { ref } from 'vue'
import { ComboboxItem } from '../../components/design-system/Input/Combobox.vue'

const comboboxOptions = ref<ComboboxItem[]>([
  {
    id: 1,
    text: 'Psychologist',
    value: 'psychologist'
  },
])

const { useField, handle, loading } = useForm<{
  title: string
  category: string
}>({
  defaults: {
    category: comboboxOptions.value[0].value.toString()
  },
})
const title = useField('title', {
  required: true,
})
const category = useField('category', {
  required: true,
})
const onSubmit = handle(async ({ title, category }) => {
  console.log(title, category)
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
          <DLabel htmlFor="title">Workspace title</DLabel>
          <DInput
            id="title"
            placeholder="Enter the workspace name"
            :options="comboboxOptions"
            v-model="title.value"
            :error="Boolean(title.error)"
            :hintText="title.error?.message"
          />
        </div>
        <div class="workspaces-create__box__form__row">
          <DLabel htmlFor="category">Category</DLabel>
          <DCombobox
            id="category"
            placeholder="Select a category"
            :options="comboboxOptions"
            v-model="category.value"
          />
        </div>
        <div class="workspaces-create__box__form__button">
          <DButton type="submit" fullWidth :disabled="loading">Create</DButton>
        </div>
        <div class="workspaces-create__box__form__link">
          <router-link to="/">Go back home</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.workspaces-create {
  @apply flex justify-center items-center min-h-screen;
  &__box {
    @apply max-w-[360px] w-[360px];
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
      &__link {
        @apply text-center;
        a {
          @apply text-blue-600 font-medium text-sm;
        }
      }
    }
  }
}
</style>
