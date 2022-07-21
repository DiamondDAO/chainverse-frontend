import * as Yup from "yup";
import { FormType } from "../types";
const questions = [
  {
    question: "What skills do you bring to the Web3 community space?",
    initVal: [],
  },
  {
    question: "Which aspects of DAO governance or operations interest you?",
    initVal: "",
  },
];
const model: Omit<FormType, "component"> = {
  formTitle: "Skills",
  validation: Yup.object().shape({
    [questions[0].question]: Yup.array()
      .of(Yup.string())
      .min(1, "You need to select at least one skill"), //TODO: tighten validation so that only a certain set of strings can pass
    [questions[1].question]: Yup.string().required("An answer is required"), //TODO: tighten validation so that only a certain set of strings can pass,
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
