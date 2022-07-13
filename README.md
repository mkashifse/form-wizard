# Multistep Formwizard App

Kindly visit the following link to see the live demo. [Live Demo](https://form-wizard-rho.vercel.app/)



#### Application Screen shots

![alt text](https://form-wizard-rho.vercel.app/page1.png)
![alt text](https://form-wizard-rho.vercel.app/page2.png)
![alt text](https://form-wizard-rho.vercel.app/page3.png)



# Tech Stack I used

1.  Vue3
2.  Composition api
3.  Tailwindcss

## Composition Api & Seperation of buisiness logic

I used Composition api because it allows me to write buisiness logic sperately from comoponent in form of composables funcions.

## Tailwindcss for Design

I used Tailwindcss because of its utility nature. Tailwindcss classes give lots of flexiblity and infinite variation of design I can work with.

## State Managment with Pinia

I did not used global state Managment although I added to the project but for this task Composition Api was enough to manage state and share accross comoponents. Although I believe global state management is very important for large application to store data in one place and have a proper data flow accross the application.

## Typescript

I work with interfaces and types thats why I used Typescript. An application is incomplete if there are no proper Structure of Interfaces and Types of the data model are not written.

# Project Structure

I created project with the help of vue cli. I added typescscript.

### Folder Structure

```
src
    /comoponents

    /assets
        form.json

    /composables
        / useStepForm.ts
        / useFormWizard.ts
        / useFormNavigation.ts

    /views
        / FormStepView.vue
        / SummaryVue.vue



    /types.d.ts
    /utility.ts
```

# Composables

## useStepForm

I created a generic StepForm composable which contains the following features.

```
    wizard,
    formValues,
    wizardSlugMap,
    setForm,
```

### .wizard : {steps:[]}

swizard is a reactive object which the whole data structure of all the pages of the wizard.

### .formValues :{key:value ..}

It is a dynamic computed key value map of the whole form. It basically convert the array of form controls into single object holding the "Slug" of the formControl and its model value.

```
example: {name:"john doe",age:"23",country:"usa"}
```

### .wizardSlugMap :{ key:formControl ..}

This object is similar to formValues but it contains the whole formControl as value and Slug as key. It gives access for getting dynamic value of other attribute in formControl.

### .setForm: (value: StepForm[])=>

It is a function it takes StepForm array and set the value into wizard. the data is loaded directly from `form.json` file and set it.

## useFormNavigation

I seprated the navigation part of the step for wizard and created seprate composable function.

```
    next,
    back,
    goToError,
    isError,
    stepIndex,
    selectedStep,
    setErrorStep,
```

The above function are bieng used to navigate accros multiple steps of the the form. I also tied each step to the `route` like `/formstep/1`. so it has watch method which wacth the route and display respective form page. it also have `goToError` function when error occur like `age>=100` it redirect to the error page. `selectedStep` give access to the active step data which is holding in `wizard` object.

## useFormWizard

It is higher level composable function which is the tied to the `FormStepView` component. All the data initialization of the form and event attachment is done in this composition.

```
    selectedStep,
    formValues,
    stepIndex,
    standardCalculation,
```

### .standardCalculation

The standardCalculation computed method is new to this above composable. All other functions are passed by the useStepForm composable. standardCalculation funcion dynamicly compute the required calculation based on `rate`, `age` and `country rates` accorindly.

# Views

```
FormStepView
SummaryView
```

these are the above view which handling the design and skeleting of the layout based on the data provided of composables.

# Utility & Types

I added Utility and types files which contains interfaces and helper functions.

##### `utility.ts`

```
export const PACKAGE = {
  STANDARD: 0,
  SAFE: 1,
  SUPER_SAFE: 2,
};

findPercent = (value: number) =>
computable = (obj: any, key: string) =>
computableLabel = (obj: any) =>

```

##### `types.d.ts`

```
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
```

the above are the types which are being used in the application.

#### `form.json`

```
"steps": [
    {
      "title": "Hello There!",
      "controls": [
        {
          "type": "onlyText",
          "label": "Lets buy some insurance. its going to take some while",
          "slug": "intro"
        }
      ],
      "actions": [
        {
          "type": "button",
          "label": "Start",
          "cls": "btn-primary",
          "events": {}
        }
      ]
    },
    {
      "title": "Tell us about yourself",
      "controls": [
        {
          "type": "text",
          "label": "Name",
          "placeholder": "Add text",
          "slug": "Name"
        },
        {
          "type": "number",
          "label": "Age",
          "placeholder": "Add number",
          "slug": "Age"
        },
        {
          "type": "select",
          "label": "where do you live",
          "slug": "country",
          "placeholder": "Add text",
          "model": {
            "label": "Hong Kong",
            "meta": { "currency": "HKD", "rate": 1 }
          },
          "options": [
            { "label": "Hong Kong", "meta": { "currency": "HKD", "rate": 1 } },
            { "label": "USA", "meta": { "currency": "USD", "rate": 2 } },
            { "label": "Australia", "meta": { "currency": "AUD", "rate": 3 } }
          ]
        },
        {
          "type": "radio",
          "label": "package",
          "model": { "label": "Standard", "meta": { "rate": 0 } },
          "options": [
            { "label": "Standard", "meta": { "rate": 0 } },
            { "meta": { "rate": 50 } },
            { "meta": { "rate": 75 } }
          ],
          "slug": "package"
        }
      ],
      "actions": [
        {
          "type": "button",
          "label": "Back",
          "cls": "btn-default",
          "events": {}
        },
        {
          "type": "button",
          "label": "Next",
          "cls": "btn-primary",
          "events": {}
        }
      ]
    },
    {
      "id": "summarypage",
      "title": "Summary",
      "controls": [],
      "actions": [
        {
          "type": "button",
          "label": "Back",
          "cls": "btn-default",
          "events": {}
        },
        { "type": "button", "label": "Buy", "cls": "btn-primary", "events": {} }
      ]
    }
  ],
  "errorStep": {
    "title": "Ooops",
    "controls": [
      {
        "type": "onlyText",
        "label": "Your age over our accepted limit. We are sorry but we cannot insure you now"
      }
    ],
    "actions": [
      {
        "type": "button",
        "label": "Ok :(",
        "cls": "btn-primary",
        "events": {}
      }
    ]
  }
```

The above json depicts the structure of the wizard. The events of the button `Back` & `Next` are attached dynamicly when json file is loaded.



