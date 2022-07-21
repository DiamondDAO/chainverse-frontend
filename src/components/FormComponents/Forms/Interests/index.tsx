import { FormType } from "../types";
import { Topics as TopicComponent } from "./component";
import model from "./model";
const Topics: FormType = {
  component: <TopicComponent />,
  ...model,
};

export default Topics;
