import { confirmPasswordText, emailText, passwordText } from "../authentication_text";
import { registerFormButtonText } from "./register_text";

const RegisterForm = () => {
    return ( 
            <form className="text-center d-flex flex-column align-items-center w-100">
                <div className="form-outline my-2 col-sm-12 col-lg-9">
                    <input type="email" className="form-control" id="phoneNumber"></input>
                    <label className="form-label" htmlFor="phoneNumber">{emailText}</label>
                </div>
                <div className="form-outline my-2 col-sm-12 col-lg-9">
                    <input type="password" className="form-control" id="password"></input>
                    <label className="form-label" htmlFor="password">{passwordText}</label>
                </div>
                <div className="form-outline my-2 col-sm-12 col-lg-9">
                    <input type="password" className="form-control" id="confirm-password"></input>
                    <label className="form-label" htmlFor="confirm-password">{confirmPasswordText}</label>
                </div>
                <button className="btn btn-primary my-3">{registerFormButtonText}</button>
            </form>
     );
}
 
export default RegisterForm;