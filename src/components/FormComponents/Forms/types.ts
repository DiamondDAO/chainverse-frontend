export type FormType = {
  component: JSX.Element;
  formId: string;
  formTitle: string;
  navTitle?: string;
  fields?: { name: string; label: string }[];
  validation?: any;
  initialValue?: { [key: string]: any };
};
