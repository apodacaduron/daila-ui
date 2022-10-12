import { Group, Stack } from '@mantine/core'
import React from 'react'

function SideMenu() {
  return (
    <Stack justify="center" sx={{ height: '100%' }}>
      <Group position="apart">
        <div>nav</div>
        <Group>
          <div>Bellicon</div>
          <div>help</div>
        </Group>
      </Group>
    </Stack>
  )
}

export default SideMenu
