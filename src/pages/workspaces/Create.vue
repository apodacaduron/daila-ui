<script setup lang="ts">
import { DLabel, DCombobox, DButton, DInput } from '../../components/ui'
import {
  useCreateWorkspaceForm,
  useInitializeWorkspace,
  useWorkspaceStore,
} from '../../features/workspaces'

const workspaceStore = useWorkspaceStore()
const initializeWorkspace = useInitializeWorkspace()
const createWorkspaceForm = useCreateWorkspaceForm({
  handlers: {
    async onCreateWorkspace() {
      initializeWorkspace.execute({ redirect: true })
    },
  },
})
</script>

<template>
  <div class="create-workspace">
    <div class="create-workspace__box">
      <div class="create-workspace__box__title">
        <h1>Create a workspace</h1>
        <span>Choose the area that suits you.</span>
      </div>
      <form
        @submit.prevent="createWorkspaceForm.onSubmit"
        class="create-workspace__box__form"
      >
        <div class="create-workspace__box__form__row">
          <DLabel htmlFor="name">Workspace name</DLabel>
          <DInput
            id="name"
            placeholder="Enter the workspace name"
            :options="createWorkspaceForm.comboboxOptions"
            v-model="createWorkspaceForm.name.value"
            :error="Boolean(createWorkspaceForm.name.error)"
            :hintText="createWorkspaceForm.name.error?.message"
          />
        </div>
        <div class="create-workspace__box__form__row">
          <DLabel htmlFor="category">Category</DLabel>
          <DCombobox
            id="category"
            placeholder="Select a category"
            :options="createWorkspaceForm.comboboxOptions"
            v-model="createWorkspaceForm.category.value"
          />
        </div>
        <div class="create-workspace__box__form__button">
          <DButton
            type="submit"
            fullWidth
            :disabled="createWorkspaceForm.formInstance.loading.value"
          >
            Create
          </DButton>
        </div>
        <div class="create-workspace__box__form__link">
          <router-link
            :to="`/w/${workspaceStore.workspace?.id}/${workspaceStore.workspace?.category}`"
          >
            Go back
          </router-link>
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
