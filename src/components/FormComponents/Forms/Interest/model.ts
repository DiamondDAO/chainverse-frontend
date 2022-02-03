import * as Yup from "yup";

const model = {
  formId: "interests",
  formTitle: "Community Attributes",
  fields: {
    interests: {
      name: "interests",
      label: "Please select all DAO categories you're interested in",
    },
  },
  validation: Yup.object().shape({
    interests: Yup.array()
      .of(Yup.string())
      .min(1, "You need to select at least one interested category"), //TODO: tighten validation so that only a certain set of strings can pass
  }),
  initialValue: {
    interests: [],
  },
};
export default model;
