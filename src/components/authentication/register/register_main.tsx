import RegisterForm from "./register_form";
import { registerFormTitle } from "./register_text";



const RegisterMain = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="bg-white col-9 col-lg-5 container d-flex flex-column align-items-center round-corners normal-shadow p-4">
        <span className="display-6 my-4 lobster-font">{registerFormTitle}</span>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterMain;
