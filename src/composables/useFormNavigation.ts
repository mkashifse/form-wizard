import type { FormStep } from "@/types";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useFormNavigation(_wizard: any) {
  const route = useRoute();
  const router = useRouter();
  const stepIndex = ref(0);

  const errorStep = ref<FormStep>({
    title: "Error",
  });

  const setErrorStep = (step: FormStep) => {
    errorStep.value = step;
  };

  const isError = () => {
    return stepIndex.value === -1;
  };

  const selectedStep = computed(() => {
    return isError() ? errorStep.value : _wizard.value.steps[stepIndex.value];
  });

  watch(
    () => route.query.index,
    (to) => {
      stepIndex.value = to ? +to : 0;
    },
    { flush: "pre", immediate: true, deep: true }
  );

  const next = () => {
    let to = route.query.index;
    let nextIndex = to ? +to + 1 : 0;
    nextIndex = nextIndex % _wizard.value.steps.length;
    router.push({
      query: {
        index: nextIndex,
      },
    });
  };

  const back = () => {
    let to = route.query.index;

    let nextIndex = to ? +to - 1 : 0;
    nextIndex = nextIndex < 0 ? 0 : nextIndex;
    if (to && +to === -1) {
      nextIndex = 1;
    }
    router.push({
      query: {
        index: nextIndex,
      },
    });
  };

  const goToError = () => {
    router.push({
      query: {
        index: -1,
      },
    });
  };

  return {
    next,
    back,
    goToError,
    isError,
    stepIndex,
    selectedStep,
    setErrorStep,
  };
}
