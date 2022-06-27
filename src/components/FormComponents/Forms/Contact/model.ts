import * as Yup from "yup";
import { FormType } from "../types";

const questions = [
  {
    question: "How should we reach out to you?",
    initVal: [],
  },
  {
    question: "What's your Twitter handle?",
    subtitle: `You don't need the "@"`,
    initVal: "",
  },
  {
    question: "What's your email?",
    initVal: "",
  },
  {
    question: "What's your Discord handle?",
    subtitle:
      'Please include the "#" and the numbers that follow, i.e. amphiboly#4329',
    initVal: "",
  },
  {
    question:
      "Would you like to stay access insights and narratives discovered by Diamond DAO contributors in our bi-weekly newsletter?",
    initVal: false,
  },
  {
    question:
      "Did anyone refer you? Please share their name and a way to reach out to them?",
    initVal: "",
  },
];

const model: Omit<FormType, "component"> = {
  navTitle: "Contact",
  formTitle: "Contact",

  validation: Yup.object().shape({
    [questions[0].question]: Yup.array().of(Yup.string()),
    [questions[1].question]: Yup.string(),
    [questions[2].question]: Yup.string(),
    [questions[3].question]: Yup.string(),
    [questions[4].question]: Yup.string(),
    [questions[5].question]: Yup.boolean(),
    [questions[5].question]: Yup.string(),
  }),

  //Do not need to edit
  initialValue: questions.reduce((accVal, curQuestion) => {
    return { ...accVal, ...{ [curQuestion.question]: curQuestion.initVal } };
  }, {}),
  fields: questions.map((question) => ({
    name: question.question,
    subtitle: question?.subtitle,
    label: question.question,
  })),
};

export default model;
