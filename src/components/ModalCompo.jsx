import Modal from "./Modal";
import { useSelector } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import Address from "./Address";
import ForgotPassword from "./ForgotPassword";
export default function ModalComponent() {
  const modalObj = useSelector((bag) => bag.modal);
  const { mode } = modalObj;

  let content;
  switch (mode) {
    case "LOG_IN":
      content = <Modal heading="Login">
        <Login/>
      </Modal>;
      break;
    case "REGISTER":
      content = <Modal heading="Register YourSelf">
        <Register/>
      </Modal>;
      break;
      case "ADDRESS":
        content = <Modal heading="Address Details">
          <Address/>
        </Modal>;
        break;
        case "FORGOT_PASSWORD":
        content = <Modal heading="Password Recovery Panel">
          <ForgotPassword/>
        </Modal>;
        break;
    default:
      content = <Modal heading="Practice" />;
  }

  return <>{content}</>;
}
