<script setup lang="ts">
import lodash from "lodash";

import { useFormWizard } from "@/composables/useFormWizard";
import { computableLabel } from "@/utility";
import SummaryView from "./SummaryView.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { formValues, selectedStep, standardCalculation, stepIndex } =
  useFormWizard();

const summaryList = () => {
  return lodash.entries(formValues.value);
};

const premium = () => {
  return (
    standardCalculation.value.calculatePackage +
    " " +
    standardCalculation.value.currency
  );
};

const isSummaryPage = () => {
  return +lodash.get(route, "query.index") === 2;
};
</script>

<template>
  <h1 class="text-3xl font-black text-center text-slate-600 font-libre">
    {{ selectedStep.title }}
  </h1>
  <SummaryView
    v-if="isSummaryPage()"
    :list="summaryList()"
    :premium="premium()"
  ></SummaryView>
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
      <div v-for="op in control.options" class="flex items-center space-x-2">
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
</template>

<style></style>
