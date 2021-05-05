import RegisterForm from "./register_form";
import { registerFormTitle } from "./register_text";
import {Link} from "react-router-dom";
import {Routes} from "../../../configs/routes";



const RegisterMain = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="bg-white col-9 col-lg-5 container d-flex flex-column align-items-center round-corners normal-shadow p-4">
        <span className="display-4 my-4 lobster-font">{registerFormTitle}</span>
        <RegisterForm />
          <div>Already Registered?<Link to={Routes.signIn}>Sign In</Link></div>

      </div>
    </div>
  );
};

export default RegisterMain;
