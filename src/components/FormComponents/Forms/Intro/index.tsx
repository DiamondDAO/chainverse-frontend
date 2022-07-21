import { FormType } from "../types";
import { Intro } from "./component";
import model from "./model";
const FormInfo: FormType = {
  component: <Intro />,
  ...model,
};

export default FormInfo;
