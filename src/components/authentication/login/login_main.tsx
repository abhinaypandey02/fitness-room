import LoginForm from "./login_form";
import { loginFormTitle } from "./login_text";
import {Routes} from "../../../configs/routes";
import {Link} from "react-router-dom";

const LoginMain = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="bg-white col-9 col-lg-5 container d-flex flex-column align-items-center round-corners normal-shadow p-4">
        <span className="display-4 my-4 lobster-font">{loginFormTitle}</span>
        <LoginForm/>
        <div>New User?<Link to={Routes.signUp}>Register</Link></div>
      </div>
    </div>
  );
};

export default LoginMain;
