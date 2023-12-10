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
  <div class="field">
    <label :for="id" class="label">{{ label }}</label>
    <InputText :id="id" v-bind="bindingValue" :class="['input', { 'p-invalid': error }]" />
    <small id="film-help" class="p-error error">
      {{ error }}
    </small>
  </div>
</template>

<style lang="scss" scoped>
.label,
.input {
  display: block;
}

.label {
  padding-block-end: 0.5rem;
}

.input {
  margin-block-end: 17px;
}

.field {
  position: relative;
  padding-block-end: 2rem;
}

.error {
  position: absolute;
  margin-block-start: -15px;
}
</style>
