import { MantineThemeOverride } from '@mantine/core';

export const defaultMantineTheme: MantineThemeOverride = {
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
    },
  },
}
