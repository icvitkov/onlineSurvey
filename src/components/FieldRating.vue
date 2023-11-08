<script lang="ts" setup>
import RadioButton from 'primevue/radiobutton'
import type { ComponentModellessBinds, GenericObject } from 'vee-validate'

defineProps<{
  bindingValue: ComponentModellessBinds & { 'onUpdate:modelValue': (value: any) => void } & {
    modelValue: any
  } & GenericObject
  label: string
  error?: string
  min: number
  max: number
}>()
</script>

<template>
  <div class="card flex justify-content-center">
    <div>{{ label }}</div>
    <div class="flex flex-wrap gap-3">
      <div v-for="rate in max - min + 1" :key="rate" class="flex align-items-center">
        <RadioButton :inputId="'rate' + rate" name="rate" :value="rate" v-bind="bindingValue" />
        <label :for="'rate' + rate">{{ rate }}</label>
      </div>
    </div>

    <small id="text-error" class="p-error">{{ error }}</small>
  </div>
</template>
