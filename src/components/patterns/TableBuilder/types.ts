import type { BadgeColor } from "../../ui"

export type TableBuilderColumns = {
  [columnName: string]: {
    text: string
  }
}
export type TableBuilderSettings = {
  ui?: {
    avatar?: {
      name: string
      image: string
    }
    badges?: {
      [columnName: string]: {
        color(value: string): BadgeColor
      }
    }
  }
}