<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

export type ComboboxItem = {
  id: string | number, text: string
}
interface Props {
  options: Array<ComboboxItem>
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => []
})

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
</script>

<template>
  <Combobox v-model="selected">
    <div class="combobox">
      <div class="combobox__container">
        <ComboboxInput
          :placeholder="props.placeholder"
          class="combobox__container__input"
          :displayValue="(option: ComboboxItem) => option?.text"
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
              :class="['combobox__options__item', {'combobox__options__item--active': active }]"
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
                :class="{ 'text-white': active, 'text-blue-600': !active }"
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
    @apply py-2 px-3 border border-slate-300;
    @apply transition-all shadow-sm;
    @apply focus-within:border focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100;
    &__input {
      @apply w-full border-none text-base text-slate-900;
      @apply outline-none bg-transparent;
      &::placeholder {
        @apply text-slate-500;
      }
    }
    &__button {
      @apply absolute inset-y-0 right-0 flex items-center pr-2;
      &__icon {
        @apply h-5 w-5 text-gray-400;
      }
    }
  }
  &__options {
    @apply absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm;
    @apply bg-opacity-90 backdrop-blur-lg;
    &__no-results {
      @apply relative cursor-default select-none py-2 px-4 text-gray-700;
    }
    &__item {
      @apply relative cursor-default select-none py-2 pl-10 pr-4;
      @apply text-gray-900;
      &--active {
        @apply bg-blue-600 text-white;
      }
      &__selected-icon {
        @apply absolute inset-y-0 left-0 flex items-center pl-3;
      }
    }
  }
}
</style>
