import {emailText, passwordText} from "../authentication_text";
import {loginFormButtonTitle} from "./login_text";
import {FormEvent, useRef, useState} from "react";
import {useSetUser} from "../../../contexts/user_context";
import {ApolloConsumer} from "@apollo/client";
import {VERIFY_USER} from "../../../graphqlQueries/userQueries";
import UserInterface from "../../../interfaces/user_interface";

const LoginForm = () => {
    const formRef = useRef<any>(null);
    const clientRef = useRef<any>(null);
    const setUser = useSetUser();
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [submittedOnce, setSubmittedOnce] = useState(false);

    function validateText(text: string): (string | null) {
        if (text === '') return "Required Field";
        return null;
    }

    function validateEmail(text: string): (string | null) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(text).toLowerCase())) {
            return "Not a valid e-mail";
        }
        return null;
    }

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmittedOnce(true);
        const {email, password} = formRef.current;
        const emailErrorText = validateText(email.value) || validateEmail(email.value);
        setEmailError(emailErrorText);
        const passwordErrorText = validateText(password.value);
        setPasswordError(passwordErrorText);
        if (emailErrorText || passwordErrorText) return;
        clientRef.current.query({
            query: VERIFY_USER,
            variables: {email: email.value, password: password.value}
        }).then((result: any) => {
            if (result.data.userVerification === null) {
                setPasswordError("Email or password incorrect.")
            } else {
                const {firstName, lastName, username, email, enrolledGyms, isGymOwner, profilePicture, ownedGyms} = result.data.userVerification;
                const tempUser: UserInterface = {
                    firstName, lastName, username, email, enrolledGyms, isGymOwner, profilePicture, ownedGyms
                }
                setUser(tempUser);
            }
        }).catch(()=>{setPasswordError("Cannot connect to network")})

    }

    function FormControl(error: (string | null), id: string, text: string) {
        return <div className="mt-3 col-sm-12 col-lg-9">
            <div className="form-group">
                <input placeholder={text} type={id === "password" ? "password" : "email"}
                       className={"form-control m-0 " + (submittedOnce && (error ? "is-invalid active" : "is-valid active"))}
                       id={id}/>

            </div>
            {error && <small className="text-danger align-items-start d-flex col-sm-12 col-lg-9">{error}</small>}
        </div>

    }

    return (
        <form ref={formRef} onSubmit={onSubmit} className="text-center d-flex flex-column align-items-center w-100">
            <ApolloConsumer>
                {client => {
                    clientRef.current = client;
                    return null;
                }}
            </ApolloConsumer>
            {FormControl(emailError, 'email', emailText)}
            {FormControl(passwordError, 'password', passwordText)}
            <button className="btn btn-primary my-3">{loginFormButtonTitle}</button>
        </form>
    );
};

export default LoginForm;
