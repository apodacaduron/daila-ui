import { useForm } from '@evilkiwi/form';

type InviteTeamMemberForm = {
  email: string
}
type InviteTeamMemberFormContext = {
  handlers?: {
    onSubmitInviteTeamMemberForm?(): void
  }
}
export const useInviteTeamMemberForm = (context: InviteTeamMemberFormContext) => {
  const formInstance = useForm<InviteTeamMemberForm>({
    defaults: {},
  })
  const email = formInstance.useField('email', {
    type: 'email',
    required: true,
  })

  const onSubmit = formInstance.handle(async (formValues) => {
    context.handlers?.onSubmitInviteTeamMemberForm?.()
  })

  return {
    formInstance,
    email,

    onSubmit,
  }
}