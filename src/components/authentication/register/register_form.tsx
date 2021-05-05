import {
    confirmPasswordText,
    emailText,
    firstNameText,
    lastNameText,
    passwordText,
    usernameText
} from "../authentication_text";
import {registerFormButtonText} from "./register_text";
import {FormEvent, useRef, useState} from "react";
import {ApolloConsumer, useMutation} from "@apollo/client";
import {ADD_USER, GET_USER_BY_EMAIL} from "../../../graphqlQueries/userQueries";
import {useSetUser} from "../../../contexts/user_context";
import UserInterface from "../../../interfaces/user_interface";

const RegisterForm = () => {
    const formRef = useRef<any>(null);
    const clientRef = useRef<any>(null);
    const setUser=useSetUser();
    const [firstNameError, setFirstNameError] = useState<(string | null)>(null);
    const [lastNameError, setLastNameError] = useState<(string | null)>(null);
    const [usernameError, setUsernameError] = useState<(string | null)>(null);
    const [emailError, setEmailError] = useState<(string | null)>(null);
    const [passwordError, setPasswordError] = useState<(string | null)>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<(string | null)>(null);
    const [submittedOnce, setSubmittedOnce] = useState(false);

    function FormControl(error: (string | null), id: string, text: string) {
        return <div className="mt-3 col-sm-12 col-lg-9">
            <div className="form-group">
                <input placeholder={text} type={id==="password"||id==="confirmPassword"?"password":id==="email"?"email":"text"}
                       className={"form-control m-0 " + (submittedOnce && (error ? "is-invalid active" : "is-valid active"))}
                       id={id}/>

            </div>
            {error && <small className="text-danger align-items-start d-flex col-sm-12 col-lg-9">{error}</small>}
        </div>

    }

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

    function validatePasswords(text1: string, text2: string): (string | null) {
        if (text1 === '' || text2 === '' || text1 !== text2) return "Passwords don't match";
        return null;
    }

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmittedOnce(true);
        const {firstName, lastName, email, password, confirmPassword, checkBox,username} = formRef.current;
        const firstNameErrorText = validateText(firstName.value);
        setFirstNameError(firstNameErrorText);
        const lastnameErrorText = validateText(lastName.value);
        setLastNameError(lastnameErrorText);
        const usernameErrorText = validateText(username.value);
        setUsernameError(usernameErrorText);
        const emailErrorText = validateText(email.value) || validateEmail(email.value);
        setEmailError(emailErrorText);
        const passwordErrorText = validateText(password.value);
        setPasswordError(passwordErrorText);
        const confirmPasswordText = validateText(confirmPassword.value) || validatePasswords(password.value, confirmPassword.value);
        setConfirmPasswordError(confirmPasswordText);
        if (firstNameErrorText || lastnameErrorText || emailErrorText || passwordErrorText || confirmPasswordText) return
        clientRef.current.mutate({
            mutation: ADD_USER,
            variables: {email: email.value,firstName:firstName.value,lastName:lastName.value,password:password.value,isGymOwner:checkBox.checked,username:username.value}
        }).then((result: any) => {
            if (result.data.addUser==="pass") {
                const user:UserInterface={
                    email: "",
                    enrolledGyms: [],
                    isGymOwner: checkBox.checked,
                    ownedGyms: [],
                    profilePicture: "",
                    firstName:firstName.value,
                    lastName:lastName.value,
                    username:username.value
                }
                setUser(user)
            } else {
                if(result.data.addUser==="username") setUsernameError("Username taken.")
                else setEmailError("Email already in use.")
            }
        }).catch(() => setConfirmPasswordError("Unable to access the internet."))
    }

    return (
        <form ref={formRef} className="text-center d-flex flex-column align-items-center w-100" onSubmit={onSubmit}
              noValidate={true}>
            <ApolloConsumer>
                {client => {
                    clientRef.current = client;
                    return null;
                }}
            </ApolloConsumer>
            {FormControl(firstNameError, "firstName", firstNameText)}
            {FormControl(lastNameError, "lastName", lastNameText)}
            {FormControl(usernameError, "username", usernameText)}
            {FormControl(emailError, "email", emailText)}
            {FormControl(passwordError, "password", passwordText)}
            {FormControl(confirmPasswordError, "confirmPassword", confirmPasswordText)}
            <div className="form-check mt-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkBox"
                />
                <label className="form-check-label" htmlFor="checkBox">
                    Gym Owner
                </label>
            </div>
            <button className="btn btn-primary my-3">{registerFormButtonText}</button>
        </form>
    );
}

export default RegisterForm;