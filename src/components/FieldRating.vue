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
  <div class="field">
    <div class="label">{{ label }}</div>
    <div class="input">
      <div class="rating">
        <div v-for="rate in max - min + 1" :key="rate">
          <RadioButton :inputId="'rate' + rate" name="rate" :value="rate" v-bind="bindingValue" />
          <label class="rate" :for="'rate' + rate">{{ rate }}</label>
        </div>
      </div>
    </div>

    <small id="text-error" class="p-error error">{{ error }}</small>
  </div>
</template>

<style lang="scss" scoped>
.input {
  display: block;
  margin-block-end: 17px;
}

.label {
  padding-block-end: 0.5rem;
}

.field {
  position: relative;
  padding-block-end: 2rem;
}

.rate {
  padding-inline-start: 0.25rem;
}

.rating {
  display: flex;
  gap: 1.5rem;
}

.error {
  position: absolute;
  margin-block-start: -15px;
}
</style>
