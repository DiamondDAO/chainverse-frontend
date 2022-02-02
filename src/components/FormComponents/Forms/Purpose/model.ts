import * as Yup from "yup";

const model = {
  formId: "purpose",
  formTitle: "Purpose of Joining DAO",
  fields: {
    purpose: {
      name: "purpose",
      label: "What are you interested in accomplishing in the DAO space?",
    },
  },
  validation: Yup.object().shape({
    purpose: Yup.array()
      .of(Yup.string())
      .min(1, "You need to select at least one purpose"), //TODO: tighten validation so that only a certain set of strings can pass
  }),
  initialValue: {
    purpose: [],
  },
};
export default model;
