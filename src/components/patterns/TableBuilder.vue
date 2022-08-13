<script setup lang="ts">
import { DTable, DCard } from '../ui'
import { sentenceCase } from 'change-case'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

export type Props = {
  columns: string[]
  data: unknown[]
}
withDefaults(defineProps<Props>(), {
  columns: () => [],
  data: () => [],
})

dayjs.extend(localizedFormat)

function dataParser(val: any, column: string) {
  const value = val[column]
  if (!value) return '-'
  if (value instanceof Date) return dayjs(value).format('LL')

  return value
}
</script>

<template>
  <DCard>
    <DTable>
      <thead>
        <th v-for="(column, index) in columns" :key="index">
          {{ sentenceCase(column) }}
        </th>
      </thead>
      <tbody>
        <tr v-for="val in data">
          <td v-for="(column, index) in columns" :key="index">
            {{ dataParser(val, column) }}
          </td>
        </tr>
      </tbody>
    </DTable>
  </DCard>
</template>
