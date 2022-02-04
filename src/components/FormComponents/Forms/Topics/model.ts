import * as Yup from "yup";
import { FormType } from "../types";

const formId = "f5039f3d-94ad-43ba-b86b-2d74a46cda94";

const model: Omit<FormType, "component"> = {
  formId,
  navTitle: "Topics",
  formTitle: "Interested Topics",
  fields: {
    topics: {
      name: formId,
      label: "What topics are you interested in?",
    },
  },
  validation: Yup.object().shape({
    topics: Yup.array()
      .of(Yup.string())
      .min(1, "You need to select at least one interested topic"), //TODO: tighten validation so that only a certain set of strings can pass
  }),
  initialValue: {
    [formId]: [],
  },
};
export default model;
