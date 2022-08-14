export type DropdownSettings = {
  actions: {
    [action: string]: {
      text: string,
      fn(value: any): void
    }
  }
}