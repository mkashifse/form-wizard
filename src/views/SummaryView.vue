<script setup lang="ts">
import { computable } from "@/utility";
const props = defineProps({
  list: {
    type: [Object],
  },
  premium: {
    type: String,
  },
});
</script>

<template>
  <div class="m-auto">
    <div v-for="[key, value] in props.list" class="grid gap-8 grid-cols-3">
      <label class="col-span-1">{{ key }}:</label>
      <div class="col-span-2">
        {{ typeof value === "object" ? computable(value, "label") : value }}
      </div>
    </div>
    <div class="grid gap-8 grid-cols-3">
      <label class="col-span-1">Premium</label>
      <label class="col-span-2">{{ premium }} </label>
    </div>
  </div>
</template>
