<script setup lang="ts">
import { DDialog, DButton, DInput, DLabel } from '../primitives'
import { MailIcon } from '@heroicons/vue/outline'
import { ref, UnwrapRef } from 'vue'
import { emailRegex } from '../../utils/regex'
import { useAddUserToWorkspaceMutation } from '../../services'
import { useWorkspace } from '../../composables'
import { errorHandler } from '../../utils/errorHandler'
import { useQueryClient } from 'vue-query'
import { createToast } from 'mosha-vue-toastify'

interface Props {
  show: boolean
}
type EmailItem = {
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

const addUserToWorkspaceMutation = useAddUserToWorkspaceMutation()

function formatEmailList(list: UnwrapRef<typeof emailList>) {
  return list.map((item) => ({ email: item.fieldValue }))
}

const onSubmit = async () => {
  const validationResponse = validateEmailList(emailList.value)
  if (!validationResponse.isListValid) return
  if (!workspaceOptions.workspace?.id)
    return errorHandler(new Error('Workspace ID must be provided'))

  await addUserToWorkspaceMutation.mutateAsync({
    workspaceId: workspaceOptions.workspace?.id,
    emailList: formatEmailList(emailList.value),
  })
  if (addUserToWorkspaceMutation.isSuccess.value) {
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
        <template v-for="(row, index) in emailList" :key="index">
          <div class="form__row">
            <DInput
              :disabled="addUserToWorkspaceMutation.isLoading.value"
              placeholder="john@example.com"
              :type="row.fieldType"
              v-model="row.fieldValue"
              :error="Boolean(row.error)"
              :hintText="row.error?.message"
            >
              <template #leading>
                <MailIcon class="w-5 h-5" />
              </template>
            </DInput>
          </div>
        </template>
      </div>
      <DButton :disabled="addUserToWorkspaceMutation.isLoading.value" variant="text" @click="emailList.push(getEmailItem())">
        + Add another
      </DButton>
    </template>
    <template #footer>
      <DButton :disabled="addUserToWorkspaceMutation.isLoading.value" variant="outlined" @click="$emit('close')">Cancel</DButton>
      <DButton :disabled="addUserToWorkspaceMutation.isLoading.value" variant="translucent" @click="onSubmit">
        Add to workspace
      </DButton>
    </template>
  </DDialog>
</template>

<style lang="scss" scoped>
.form {
  @apply flex flex-col gap-3;
}
</style>
