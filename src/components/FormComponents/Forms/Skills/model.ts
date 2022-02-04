import * as Yup from "yup";
import { FormType } from "../types";
const formId = "51c96370-99fd-4883-9901-b452170755ec";
const model: Omit<FormType, "component"> = {
  formId,
  formTitle: "Skills",
  fields: {
    skills: {
      name: formId,
      label: "What skills do you bring to the Web3 community space?",
    },
  },
  validation: Yup.object().shape({
    skills: Yup.array()
      .of(Yup.string())
      .min(1, "You need to select at least one skill"), //TODO: tighten validation so that only a certain set of strings can pass
  }),
  initialValue: {
    [formId]: [],
  },
};
export default model;
