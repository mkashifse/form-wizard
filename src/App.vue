<script setup lang="ts">
import FormStepView from "./views/FormStepView.vue";
</script>

<template>
  <main class="grid h-screen w-full bg-slate-50">
    <div class="w-1/2 m-auto card">
      <div class="flex flex-col space-y-4 w-3/4 m-auto py-16">
        <FormStepView></FormStepView>
      </div>
    </div>
  </main>
</template>

<style>
@import "@/assets/base.css";
</style>
