<script setup lang="ts">
import { DDialog, DButton, DInput, DLabel } from '../primitives'
import { MailIcon } from '@heroicons/vue/outline'
import { ref, UnwrapRef } from 'vue'
import { emailRegex } from '../../utils/regex'

interface Props {
  show: boolean
}
type EmailItem = {
      fieldType: string,
    fieldValue: string,
    error: { message: string} | null,
}

defineProps<Props>()
defineEmits<{
  close: (close: boolean) => void
}>()

function getEmailItem(): EmailItem {
  return {
    fieldType: 'email',
    fieldValue: '',
    error: null,
  }
}
const emailList = ref<EmailItem[]>([getEmailItem()])

function validateEmailList(list: UnwrapRef<typeof emailList>) {
  const invalidIndexes: number[] = [];
  list.forEach((item, index) => {
    if (!emailRegex.test(item.fieldValue)) {
      invalidIndexes.push(index)
      emailList.value[index].error = { message: "Email is not valid" }
    } else {
      emailList.value[index].error = null;
    }
  })

  return {
    invalidIndexes,
    isListValid: Boolean(invalidIndexes.length === 0),
  }
}

const onSubmit = async () => {
  const validationResponse = validateEmailList(emailList.value)
  if (!validationResponse.isListValid) return;

  console.log('SENDING DATA 🚀')
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
      <DButton variant="text" @click="emailList.push(getEmailItem())">
        + Add another
      </DButton>
    </template>
    <template #footer>
      <DButton variant="outlined" @click="$emit('close')">Cancel</DButton>
      <DButton variant="translucent" @click="onSubmit">Add to workspace</DButton>
    </template>
  </DDialog>
</template>

<style lang="scss" scoped>
.form {
  @apply flex flex-col gap-3;
}
</style>
