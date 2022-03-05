import * as Yup from "yup";
import { FormType } from "../types";

const formId = "f5039f3d-94ad-43ba-b86b-2d74a46cda94";
const questions = [
  {
    question: "What topics are you interested in?",
    initVal: [],
  },
];

const model: Omit<FormType, "component"> = {
  formId,
  navTitle: "Topics",
  formTitle: "Interested Topics",

  validation: Yup.object().shape({
    [questions[0].question]: Yup.array()
      .of(Yup.string())
      .min(1, "You need to select at least one interested topic"), //TODO: tighten validation so that only a certain set of strings can pass
  }),

  //Do not need to edit
  initialValue: questions.reduce((accVal, curQuestion) => {
    return { ...accVal, ...{ [curQuestion.question]: curQuestion.initVal } };
  }, {}),
  fields: questions.map((question) => ({
    name: question.question,
    label: question.question,
  })),
};

export default model;
