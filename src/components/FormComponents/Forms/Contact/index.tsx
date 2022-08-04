import { FormType } from "../types";
import { Contact as ContactComponent } from "./component";
import model from "./model";
const Contact: FormType = {
  component: <ContactComponent />,
  ...model,
};

export default Contact;
