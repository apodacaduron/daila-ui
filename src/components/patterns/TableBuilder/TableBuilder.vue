<script setup lang="ts">
import { DTable, DCard, DBadge } from '../../ui'
import { NamedAvatar } from '../NamedAvatar'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import type { TableBuilderColumns, TableBuilderSettings } from './types'

export type Props = {
  columns: TableBuilderColumns
  data: unknown[]
  settings?: TableBuilderSettings
}
const props = withDefaults(defineProps<Props>(), {
  columns: () => ({}),
  data: () => [],
})

dayjs.extend(localizedFormat)

function dataParser(val: any, column: string) {
  const columnValue = val[column]
  // If no value return dash
  if (!columnValue) return { wrapper: 'div', slot: '-' }

  // If value is a date parse date
  if (columnValue instanceof Date)
    return { wrapper: 'div', slot: dayjs(columnValue).format('LL') }

  // If column matches table setting badges set component
  if (
    Object.keys(props.settings?.ui?.badges ?? {}).some(
      (badgeKey) => badgeKey === column,
    )
  )
    return {
      wrapper: DBadge,
      slot: columnValue,
      props: {
        color: props.settings?.ui?.badges?.[column]?.color(columnValue),
      },
    }

  // If column matches table setting badges set component
  if (props.settings?.ui?.avatar?.name === column)
    return {
      wrapper: NamedAvatar,
      slot: columnValue,
      props: { text: columnValue },
    }

  return { wrapper: 'div', slot: columnValue }
}
</script>

<template>
  <DCard>
    <DTable>
      <thead>
        <th v-for="(column, index) in Object.keys(columns)" :key="index">
          {{ columns[column]?.text }}
        </th>
        <th v-if="$slots.actions"><slot name="actionsText" /></th>
      </thead>
      <tbody>
        <tr v-for="val in data">
          <td v-for="(column, index) in Object.keys(columns)" :key="index">
            <component
              :is="dataParser(val, column).wrapper"
              v-bind="dataParser(val, column).props"
            >
              {{ dataParser(val, column).slot }}
            </component>
          </td>
          <td v-if="$slots.actions" style="padding: 0 1.5rem 0 0;">
            <slot name="actions" :data="val" />
          </td>
        </tr>
      </tbody>
    </DTable>
  </DCard>
</template>
