import { onBeforeMount } from "vue";
import { computed } from "@vue/reactivity";
import lodash from "lodash";
import { computableLabel, findPercent, PACKAGE } from "@/utility";
import { useStepForm } from "./useStepForm";
import { useFormNavigation } from "./useFormNavigation";
import type { FormControl, FormStep } from "@/types";
import formData from "@/assets/form.json";

export const useFormWizard = () => {
  // ===== UTITLITY

  const { setForm, formValues, wizardSlugMap, wizard } = useStepForm();
  const { next, back, goToError, setErrorStep, stepIndex, selectedStep } =
    useFormNavigation(wizard);

  const standardCalculation = computed(() => {
    const packageRate = +lodash.get(formValues.value, "package.meta.rate", 0);
    const { rate: countryRate, currency } = lodash.get(
      formValues.value,
      "country.meta",
      {
        rate: 1,
        currency: "HKD",
      }
    );
    const age = +lodash.get(formValues.value, "Age", 0);
    const standardPackage = countryRate * age * 10;
    const calculatedMore = (standardPackage * packageRate) / 100;
    let calculatePackage = calculatedMore + standardPackage;

    return {
      standardPackage,
      packageRate,
      calculatePackage,
      currency,
    };
  });

  const safePackage = computed(() => {
    const { standardPackage } = standardCalculation.value;
    const safePackageRate = lodash.get(
      wizardSlugMap,
      `value.package.options[${PACKAGE.SAFE}].meta.rate`
    );
    return findPercent(safePackageRate) * standardPackage;
  });

  const superSafePackage = computed(() => {
    const { standardPackage } = standardCalculation.value;
    const superSafePackageRate = lodash.get(
      wizardSlugMap,
      `value.package.options[${PACKAGE.SUPER_SAFE}].meta.rate`
    );
    return findPercent(superSafePackageRate) * standardPackage;
  });

  const onNext = () => {
    if (stepIndex.value === 1 && +formValues.value.Age >= 100) {
      goToError();
    } else {
      next();
    }
  };

  const initForm = () => {
    formData.steps.forEach((item) => {
      // bind events
      item.actions.forEach((item) => {
        if (item.label.toLowerCase() === "back") {
          item.events = {
            onclick: back,
          };
        } else if (item.label.toLowerCase() === "next") {
          item.events = {
            onclick: onNext,
          };
        } else if (
          item.label.toLowerCase() === "buy" ||
          item.label.toLowerCase() === "start"
        ) {
          item.events = {
            onclick: next,
          };
        }
      });

      // bind computable labels for packages
      item.controls.forEach((item: any) => {
        if (item.slug === "package") {
          item.options[PACKAGE.SAFE] = {
            ...item.options[PACKAGE.SAFE],
            label: () =>
              `Safe (+${safePackage.value} ${standardCalculation.value.currency}, 50%)`,
          };
          item.options[PACKAGE.SUPER_SAFE] = {
            ...item.options[PACKAGE.SUPER_SAFE],
            label: () =>
              `Super safe (+${superSafePackage.value} ${standardCalculation.value.currency}, 75%)`,
          };
        }
      });
    });
    setForm(formData.steps as FormStep[]);
    setErrorStep(formData.errorStep as FormStep);
  };

  onBeforeMount(() => {
    initForm();
  });

  return {
    selectedStep,
    formValues,
    stepIndex,
    standardCalculation,
  };
};
