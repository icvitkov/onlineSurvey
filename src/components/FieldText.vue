<script setup lang="ts">
import type { ComponentModellessBinds, GenericObject } from 'vee-validate'
import InputText from 'primevue/inputtext'

defineProps<{
  id: string
  label: string
  bindingValue: ComponentModellessBinds & { 'onUpdate:modelValue': (value: any) => void } & {
    modelValue: any
  } & GenericObject
  error?: string | undefined
}>()
</script>

<template>
  <label :for="id">{{ label }}</label>
  <InputText :id="id" v-bind="bindingValue" :class="{ 'p-invalid': error }" />
  <small id="film-help" class="p-error">
    {{ error }}
  </small>
</template>

<style lang="scss" scoped></style>
