<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/outline'
import type { Option } from '../../../utils/types'

export type ComboboxItem = {
  id: string | number
  text: string
  value: string | number
}
interface Props {
  options: Array<ComboboxItem>
  placeholder: string
  modelValue: string | number
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
})
const emit = defineEmits<{
  (e: 'update:modelValue', selectValue: Option<ComboboxItem['value']>): void
}>()

const selected = ref(props.options[0])
const query = ref('')

const filteredOptions = computed(() =>
  query.value === ''
    ? props.options
    : props.options.filter((option) =>
        option.text
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, '')),
      ),
)

function updateValue(newSelectedValue: Option<ComboboxItem['value']>) {
  if (newSelectedValue !== props.modelValue) {
    selected.value =
      props.options.find((option) => option.value === props.modelValue) ??
      props.options[0]
    emit('update:modelValue', newSelectedValue)
  }
}

watch(selected, (newSelectedData) => updateValue(newSelectedData?.value))
</script>

<template>
  <Combobox v-model="selected">
    <div class="combobox">
      <div class="combobox__container">
        <ComboboxInput
          :placeholder="props.placeholder"
          class="combobox__container__input"
          :displayValue="(option) => (option as ComboboxItem)?.text"
          @change="query = $event.target.value"
        />
        <ComboboxButton class="combobox__container__button">
          <SelectorIcon
            class="combobox__container__button__icon"
            aria-hidden="true"
          />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions class="combobox__options">
          <div
            v-if="filteredOptions.length === 0 && query !== ''"
            class="combobox__options__no-results"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="option in filteredOptions"
            as="template"
            :key="option.id"
            :value="option"
            v-slot="{ selected, active }"
          >
            <li
              :class="[
                'combobox__options__item',
                { 'combobox__options__item--active': active },
              ]"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ option.text }}
              </span>
              <span
                v-if="selected"
                class="combobox__options__item__selected-icon"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<style lang="scss" scoped>
.combobox {
  @apply relative mt-1;
  &__container {
    @apply cursor-default rounded-lg text-left;
    @apply py-2 px-3 border dark:border-slate-500 dark:bg-slate-800;
    @apply transition-all shadow-sm;
    @apply focus-within:border focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100;
    @apply dark:focus-within:ring-blue-400 dark:focus-within:ring-opacity-30;
    &__input {
      @apply w-full border-none text-base text-slate-900 dark:text-slate-200;
      @apply outline-none bg-transparent;
      &::placeholder {
        @apply text-slate-500;
      }
    }
    &__button {
      @apply absolute inset-y-0 right-0 flex items-center pr-2;
      &__icon {
        @apply h-5 w-5 text-slate-400;
      }
    }
  }
  &__options {
    @apply absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm;
    @apply bg-white dark:bg-slate-800;
    &__no-results {
      @apply relative cursor-default select-none py-2 px-4 text-slate-700;
    }
    &__item {
      @apply relative cursor-default select-none py-2 pl-4;
      @apply text-slate-900 dark:text-slate-200;
      &--active {
        @apply bg-slate-50 dark:bg-slate-700;
      }
      &__selected-icon {
        @apply absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600;
      }
    }
  }
}
</style>
