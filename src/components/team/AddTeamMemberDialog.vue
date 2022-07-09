<script setup lang="ts">
import { DDialog, DButton, DInput, DLabel } from '../primitives'
import { MailIcon, TrashIcon } from '@heroicons/vue/outline'
import { ref, UnwrapRef } from 'vue'
import { emailRegex } from '../../utils/regex'
import { useInviteUserToWorkspaceMutation } from '../../services'
import { useWorkspace } from '../../composables'
import { errorHandler } from '../../utils/errorHandler'
import { useQueryClient } from 'vue-query'
import { createToast } from 'mosha-vue-toastify'

interface Props {
  show: boolean
}
type EmailItem = {
  id: number
  fieldType: string
  fieldValue: string
  error: { message: string } | null
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const queryClient = useQueryClient()
const [workspaceOptions] = useWorkspace()
function getEmailItem(): EmailItem {
  return {
    fieldType: 'email',
    fieldValue: '',
    error: null,
    id: Date.now(),
  }
}
const emailList = ref<EmailItem[]>([getEmailItem()])

function validateEmailList(list: UnwrapRef<typeof emailList>) {
  const invalidIndexes: number[] = []
  list.forEach((item, index) => {
    if (!emailRegex.test(item.fieldValue)) {
      invalidIndexes.push(index)
      emailList.value[index].error = { message: 'Email is not valid' }
    } else {
      emailList.value[index].error = null
    }
  })

  return {
    invalidIndexes,
    isListValid: Boolean(invalidIndexes.length === 0),
  }
}

const inviteUserToWorkspaceMutation = useInviteUserToWorkspaceMutation()

function formatEmailList(list: UnwrapRef<typeof emailList>) {
  return list.map((item) => ({ email: item.fieldValue }))
}

const onSubmit = async () => {
  const validationResponse = validateEmailList(emailList.value)
  if (!validationResponse.isListValid) return
  if (!workspaceOptions.workspace?.id)
    return errorHandler(new Error('Workspace ID must be provided'))

  await inviteUserToWorkspaceMutation.mutateAsync({
    workspaceId: workspaceOptions.workspace?.id,
    emailList: formatEmailList(emailList.value),
  })
  if (inviteUserToWorkspaceMutation.isSuccess.value) {
    createToast('User has been invited to join the workspace', {
      position: 'top-center',
      showIcon: true,
      hideProgressBar: true,
      type: 'success',
      transition: 'slide',
    })
    // TODO: Fix invalidate query by keys not working
    queryClient.invalidateQueries()
  }
  emit('close')
}
</script>

<template>
  <DDialog :show="show">
    <template #header>Add member</template>
    <template #default>
      <div class="form">
        <DLabel>Email address</DLabel>
        <template v-for="(emailItem, index) in emailList" :key="emailItem.id">
          <div class="form__row">
            <DInput
              :disabled="inviteUserToWorkspaceMutation.isLoading.value"
              placeholder="john@example.com"
              :type="emailItem.fieldType"
              v-model="emailItem.fieldValue"
              :error="Boolean(emailItem.error)"
              :hintText="emailItem.error?.message"
              class="w-full"
            >
              <template #leading>
                <MailIcon class="w-5 h-5" />
              </template>
            </DInput>
            <DButton
              variant="text"
              @click="emailList.splice(index, 1)"
              class="max-h-[42px]"
            >
              <TrashIcon class="w-5 h-5" />
            </DButton>
          </div>
        </template>
      </div>
      <DButton
        :disabled="inviteUserToWorkspaceMutation.isLoading.value"
        variant="text"
        @click="emailList.push(getEmailItem())"
      >
        + Add another
      </DButton>
    </template>
    <template #footer>
      <DButton
        :disabled="inviteUserToWorkspaceMutation.isLoading.value"
        variant="outlined"
        @click="$emit('close')"
      >
        Cancel
      </DButton>
      <DButton
        :disabled="inviteUserToWorkspaceMutation.isLoading.value"
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
