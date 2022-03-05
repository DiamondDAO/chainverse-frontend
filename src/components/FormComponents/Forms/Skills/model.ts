import * as Yup from "yup";
import { FormType } from "../types";
const formId = "51c96370-99fd-4883-9901-b452170755ec";
const questions = [
  {
    question: "What skills do you bring to the Web3 community space?",
    initVal: [],
  },
];
const model: Omit<FormType, "component"> = {
  formId,
  formTitle: "Skills",
  validation: Yup.object().shape({
    [questions[0].question]: Yup.array()
      .of(Yup.string())
      .min(1, "You need to select at least one skill"), //TODO: tighten validation so that only a certain set of strings can pass
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
