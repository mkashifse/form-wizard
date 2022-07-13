export interface SelectOption {
  id?: string;
  value?: any;
  slug?: string;
  label: string | Function;
  display?: string;
  meta?: any;
}

export interface FormControl {
  label?: string | Function;
  slug?: string;
  value?: any;
  model?: any;
  meta?: any;
  cls?: string;
  type:
    | "text"
    | "number"
    | "select"
    | "checkbox"
    | "button"
    | "radio"
    | "onlyText"; // <p></p>
  placeholder?: string;
  options?: SelectOption[]; // radios, selectbox
  events?: Record<string, Function>;
}

export interface FormStep {
  id?: string;
  title: string;
  controls?: FormControl[];
  actions?: FormControl[];
}
