import * as Yup from "yup";
import { FormType } from "../types";
const questions = [
  {
    question: "What do you like to be called?",
    initVal: "",
  },
  {
    question: "How did you get involved in Web3/DAOs?",
    initVal: "",
  },
  {
    question: "How many Web3 communities do you participate in?",
    initVal: "",
  },
];
const model: Omit<FormType, "component"> = {
  formTitle: "Intro",
  validation: Yup.object().shape({
    [questions[0].question]: Yup.string().required("A name is required"), //TODO: tighten validation so that only a certain set of strings can pass,
    [questions[1].question]: Yup.string().required("An answer is required"), //TODO: tighten validation so that only a certain set of strings can pass,
    [questions[2].question]: Yup.string().required("An answer is required"), //TODO: tighten validation so that only a certain set of strings can pass,
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
