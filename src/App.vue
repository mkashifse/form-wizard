<script setup lang="ts">
import lodash from "lodash";
import { computed } from "@vue/reactivity";

import { useFormWizard } from "./composables/useFormWizard";
import { computable, computableLabel } from "@/utility";

const { formValues, selectedStep, standardCalculation, stepIndex } =
  useFormWizard();

const summaryList = computed(() => {
  return lodash.entries(formValues.value);
});
</script>

<template>
  <main class="grid h-screen w-full bg-slate-50">
    <div class="w-1/2 m-auto card">
      <div class="flex flex-col space-y-4 w-3/4 m-auto py-16">
        <h1 class="text-3xl font-black text-center text-slate-600 font-libre">
          {{ selectedStep.title }}
        </h1>

        <div v-if="selectedStep.id == 'summarypage'" class="m-auto">
          <div
            v-for="[key, value] in summaryList"
            class="grid gap-8 grid-cols-3"
          >
            <label class="col-span-1">{{ key }}:</label>
            <div class="col-span-2">
              {{
                typeof value === "object" ? computable(value, "label") : value
              }}
            </div>
          </div>
          <div class="grid gap-8 grid-cols-3">
            <label class="col-span-1">Premium</label>
            <label class="col-span-2">
              {{ standardCalculation.calculatePackage }}
              {{ standardCalculation.currency }}</label
            >
          </div>
        </div>

        <div v-for="control in selectedStep.controls">
          <div v-if="control.type === 'onlyText'">
            <p class="text-center">{{ computableLabel(control) }}</p>
          </div>
          <div v-if="control.type === 'text' || control.type === 'number'">
            <label :for="computableLabel(control)">{{ control.label }}</label>
            <input
              :id="computableLabel(control)"
              :type="control.type"
              :placeholder="control.placeholder"
              v-model="control.model"
            />
          </div>
          <div v-if="control.type === 'select'">
            <label :for="computableLabel(control)">{{ control.label }}</label>
            <select
              :id="computableLabel(control)"
              v-model="control.model"
              :name="computableLabel(control)"
            >
              <option v-for="opt in control.options" :value="opt">
                {{ opt.label }}
              </option>
            </select>
          </div>
          <div v-if="control.type === 'radio'">
            <div
              v-for="op in control.options"
              class="flex items-center space-x-2"
            >
              <input
                type="radio"
                :id="computableLabel(op)"
                :name="computableLabel(control)"
                v-model="control.model"
                :value="op"
              />
              <label :for="computableLabel(op)"
                >{{ computableLabel(op) }} {{ op.display }}</label
              >
            </div>
          </div>
        </div>
        <div class="flex space-x-4 justify-center pt-8">
          <button
            v-for="action in selectedStep!.actions"
            @click="action.events!.onclick"
            :class="`px-4 p-2  ${action.cls}`"
          >
            {{ action.label }}
          </button>
        </div>
        <h1
          class="text-2xl font-semibold text-slate-600 p-4 text-center"
          v-if="stepIndex == 1"
        >
          Your Premium is: {{ standardCalculation.calculatePackage
          }}{{ standardCalculation.currency }}
        </h1>
      </div>
    </div>
  </main>
</template>

<style>
@import "@/assets/base.css";
</style>
