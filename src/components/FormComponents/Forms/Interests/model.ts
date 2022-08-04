import * as Yup from "yup";
import { FormType } from "../types";

const questions = [
  {
    question: "What topics are you interested in?",
    initVal: [],
  },
  {
    question: "Which DAO themes interest you?",
    initVal: [],
  },
];

const model: Omit<FormType, "component"> = {
  navTitle: "Interests",
  formTitle: "Interested Topics",

  validation: Yup.object().shape({
    [questions[0].question]: Yup.array()
      .of(Yup.string())
      .min(1, "You need to select at least one interested topic"), //TODO: tighten validation so that only a certain set of strings can pass
    [questions[1].question]: Yup.array()
      .of(Yup.string())
      .min(1, "You need to select at least one one"), //TODO: tighten validation so that only a certain set of strings can pass
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
