<script setup lang="ts">
import { DDialog, DButton, DLabel, DInput } from '../../../components/ui'
import { UserAddIcon, XIcon } from '@heroicons/vue/outline'
import { useInviteTeamMemberForm } from '../composables'

const locale = {
  INVITE_TEAM_MEMBER: 'Invite team member',
  INVITE_TEAM_MEMBER_DESCRIPTION:
    'Invite team member to collaborate on this workspace',
  CANCEL: 'Cancel',
  ADD_NOW: 'Add now',
}

interface Props {
  show: boolean
}
defineProps<Props>()
defineEmits<{
  close: (close: boolean) => void
}>()

const inviteTeamMemberForm = useInviteTeamMemberForm({
  handlers: {
    onSubmitInviteTeamMemberForm() {
      console.log('Invite team member submitted')
    },
  },
})
</script>

<template>
  <DDialog @close="$emit('close', $event)" :show="show" class="add-team-member">
    <template #header>
      <div class="add-team-member__header">
        <div class="add-team-member__header__user-icon">
          <UserAddIcon />
        </div>
        <DButton variant="text" @click="$emit('close', $event)">
          <XIcon class="add-team-member__header__close-icon" />
        </DButton>
      </div>
    </template>

    <template #default>
      <div class="add-team-member__body">
        <h3>{{ locale.INVITE_TEAM_MEMBER }}</h3>
        <p>{{ locale.INVITE_TEAM_MEMBER_DESCRIPTION }}</p>

        <div class="add-team-member__body__row">
          <DLabel htmlFor="email">Email</DLabel>
          <DInput
            id="email"
            placeholder="Enter your email"
            type="email"
            v-model="inviteTeamMemberForm.email.value"
            :error="Boolean(inviteTeamMemberForm.email.error)"
            :hintText="inviteTeamMemberForm.email.error?.message"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="add-team-member__footer">
        <DButton variant="outlined" @click="$emit('close', $event)">
          Cancel
        </DButton>
        <DButton type="submit" @click="inviteTeamMemberForm.onSubmit()">
          Add now
        </DButton>
      </div>
    </template>
  </DDialog>
</template>

<style lang="scss" scoped>
.add-team-member {
  &__header {
    @apply flex justify-between;
    &__user-icon {
      @apply relative flex justify-center items-center ml-4;
      svg {
        @apply w-6 h-6 text-blue-500;
      }
      &:after {
        content: '';
        @apply bg-blue-500 bg-opacity-5 w-10 h-10;
        @apply -z-[-1] absolute rounded-full;
      }
      &:before {
        content: '';
        @apply bg-blue-500 bg-opacity-5 w-14 h-14;
        @apply -z-[-1] absolute rounded-full;
      }
    }
    &__close-icon {
      @apply w-4 h-4;
    }
  }

  &__body {
    @apply mt-5;
    h3 {
      @apply text-lg font-medium leading-6 text-gray-900;
    }
    p {
      @apply text-sm text-gray-500;
    }

    &__row {
      @apply mt-5;
    }
  }

  &__footer {
    @apply flex gap-3 mt-8;
  }
}
</style>
