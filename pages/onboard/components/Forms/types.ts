export type FormType = {
  component: JSX.Element;
  formId: string;
  formTitle: string;
  fields?: { [key: string]: { name: string; label: string } };
  validation?: any;
  initialValue?: { [key: string]: any };
};
