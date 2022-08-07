import { useForm } from '@evilkiwi/form';

import { useWorkspaceService, WorkspaceCategory } from '../services';

type WorkspaceCategoryOption = {
  id: number;
  text: string;
  value: WorkspaceCategory
}

type CreateWorkspaceFormContext = {
  handlers?: {
    onCreateWorkspace?(): void
  }
}
export const useCreateWorkspaceForm = (context: CreateWorkspaceFormContext) => {
  const workspaceService = useWorkspaceService()

  const comboboxOptions: Array<WorkspaceCategoryOption> = [
    {
      id: 1,
      text: 'Psychologist',
      value: 'psychologist',
    },
  ]
  const formInstance = useForm<{
    name: string
    category: WorkspaceCategory
  }>({
    defaults: {
      category: 'psychologist',
    },
  })
  const name = formInstance.useField('name', {
    required: true,
  })
  const category = formInstance.useField('category', {
    required: true,
  })
  const onSubmit = formInstance.handle(async (formValues) => {
    await workspaceService.createWorkspace(formValues)
    context.handlers?.onCreateWorkspace?.()
  })

  return {
    comboboxOptions,
    formInstance,
    name,
    category,
    onSubmit
  }
}