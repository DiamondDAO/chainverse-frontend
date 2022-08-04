export type FormType = {
  component: JSX.Element;
  formTitle: string;
  navTitle?: string;
  fields?: { name: string; label: string; subtitle?: string }[];
  validation?: any;
  initialValue?: { [key: string]: any };
};
