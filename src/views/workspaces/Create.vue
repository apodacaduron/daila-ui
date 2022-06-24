<script setup lang="ts">
import { DLabel, DCombobox, DButton, DInput } from '../../components/primitives'
import { useForm } from '@evilkiwi/form'
import { ref, reactive } from 'vue'
import { ComboboxItem } from '../../components/primitives/Input/Combobox.vue'
import { isWorkspaceCategory } from '../../composables/useWorkspace';
import { errorHandler } from '../../utils/errorHandler';
import { useCreateWorkspaceMutation, useGetWorkspacesByUserIdQuery } from '../../services/useWorkspaceService';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/useUserStore';
import Navbar from '../../components/Navbar.vue';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';

const comboboxOptions = ref<ComboboxItem[]>([
  {
    id: 1,
    text: 'Psychologist',
    value: 'psychologist'
  },
])

const workspaceId = ref<string | null>(null)
const isGetWorkspacesByUserIdQueryEnabled = ref(false)
const router = useRouter()
const userStore = useUserStore()
const workspaceStore = useWorkspaceStore()
const createWorkspaceMutation = useCreateWorkspaceMutation()
useGetWorkspacesByUserIdQuery({
  options: reactive({
    userId: computed(() => userStore.user?.id ?? null),
    enabled: isGetWorkspacesByUserIdQueryEnabled
  }),
  handlers: {
    onSuccess(workspaces) {
      if (workspaces) {
        router.push(`/w/${workspaceId.value || workspaces[0].id}/${category.value}`)
        workspaceStore.setWorkspaces(workspaces)
        workspaceStore.setCurrentWorkspaceId(workspaceId.value)
      }
    }
  }
})
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
  if (!isWorkspaceCategory(category)) {
    return errorHandler(new Error('The workspace category is not valid'))
  }
  const response = await createWorkspaceMutation.mutateAsync({ title, category })
  workspaceId.value = (response.data as any).id as string ?? null
  isGetWorkspacesByUserIdQueryEnabled.value = true
})
</script>

<template>
  <Navbar />
  <div class="create-workspace">
    <div class="create-workspace__box">
      <div class="create-workspace__box__title">
        <h1>Create a workspace</h1>
        <span>Choose the area that suits you.</span>
      </div>
      <form @submit.prevent="onSubmit" class="create-workspace__box__form">
        <div class="create-workspace__box__form__row">
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
        <div class="create-workspace__box__form__row">
          <DLabel htmlFor="category">Category</DLabel>
          <DCombobox
            id="category"
            placeholder="Select a category"
            :options="comboboxOptions"
            v-model="category.value"
          />
        </div>
        <div class="create-workspace__box__form__button">
          <DButton type="submit" fullWidth :disabled="loading">Create</DButton>
        </div>
        <div class="create-workspace__box__form__link">
          <router-link to="/">Go back home</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-workspace {
  @apply flex justify-center items-center min-h-screen;
  &__box {
    @apply max-w-[360px] w-[360px] mb-20;
    &__title {
      @apply flex flex-col gap-3 mb-8 text-center;
      h1 {
        @apply text-3xl font-semibold;
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
      &__button {
        @apply mt-4;
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
