import { computed } from "@vue/reactivity";
import { ref, readonly } from "vue";
import _ from "lodash";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { FormControl, FormStep } from "@/types";

export function useStepForm() {
  const _wizard = ref<{ steps: FormStep[] }>({ steps: [] });

  const setForm = (formStep: FormStep[]) => {
    formStep.forEach((_step: FormStep) => {
      const step: FormStep = {
        ..._step,
        controls: _step.controls!.map((item: FormControl) => ({
          ...item,
          slug: item.slug ? item.slug : item.label ? item.label : "__",
        })) as FormControl[],
      };
      _wizard.value.steps.push(step);
    });
  };

  const formValues = computed(() => {
    const steps = _wizard.value.steps;
    const obj = steps
      .map((conts) => {
        return conts
          .controls!.filter((item) => item.type !== "onlyText")
          .reduce(
            (pre, { slug, model }: any) => ({
              ...pre,
              [slug]: model,
            }),
            {}
          );
      })
      .reduce((pre, cur) => ({ ...pre, ...cur }), {});
    return obj as any;
  });

  const wizardSlugMap = computed(() => {
    const steps = _wizard.value.steps;
    const obj = steps.map((conts) => {
      return conts.controls!.reduce(
        (pre, con: any) => ({
          ...pre,
          [con.slug]: con,
        }),
        {}
      );
    });
    return obj.reduce((pre, cur) => ({ ...pre, ...cur }), {});
  });

  return {
    wizard: _wizard,
    formValues,
    wizardSlugMap,
    setForm,
  };
}
