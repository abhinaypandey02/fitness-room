import React, {FormEvent, useRef, useState} from 'react';
import {registerFormButtonText} from "../authentication/register/register_text";
import {useClient, useUser} from "../../contexts/user_context";
import {ADD_GYM} from "../../graphqlQueries/gymQueries";
import UserInterface from "../../interfaces/user_interface";
import {useHistory} from "react-router-dom";

function AddGymPage() {
    const history=useHistory();
    const user: UserInterface | undefined | null = useUser();
    const [submittedOnce, setSubmittedOnce] = useState(false);
    const formRef = useRef<any>(null);
    const [nameError, setNameError] = useState<(string | null)>(null);
    const [descriptionError, setDescriptionError] = useState<(string | null)>(null);
    const [imageURLError, setImageURLError] = useState<(string | null)>(null);
    const [locationCityError, setLocationCityError] = useState<(string | null)>(null);
    const [priceError, setPriceError] = useState<(string | null)>(null);
    const client = useClient();

    function validateText(text: string): (string | null) {
        if (text === '') return "Required Field";
        return null;
    }

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmittedOnce(true);
        const {name, description, imageURL, locationCity, price} = formRef.current;
        const firstNameErrorText = validateText(name.value);
        const descriptionErrorText = validateText(description.value);
        const locationCityErrorText = validateText(locationCity.value);
        const priceErrorText = validateText(price.value);
        setNameError(firstNameErrorText);
        setDescriptionError(descriptionErrorText);
        setLocationCityError(locationCityErrorText);
        setPriceError(priceErrorText);
        if (firstNameErrorText || descriptionErrorText || locationCityErrorText||priceErrorText) return;
        let x={
            name: name.value,
            description: description.value,
            imageURL: imageURL.value,
            gymOwner: user?.email,
            locationCity: locationCity.value,
            price:parseInt(price.value)
        }
        console.log(x)
        client.mutate({
            mutation: ADD_GYM,
            variables: {
                name: name.value,
                description: description.value,
                imageURL: imageURL.value,
                gymOwner: user?.email,
                locationCity: locationCity.value,
                price:parseInt(price.value)
            }
        }).then(()=>{history.push('user-profile')}).catch((err: any)=>{console.log(err)})

    }

    function FormControl(error: (string | null), id: string, text: string) {
        return <div className="mt-3 col-sm-12 col-lg-9">
            <div className="form-group m-0">
                <input placeholder={text}
                       type={id === "password" || id === "confirmPassword" ? "password" : id === "email" ? "email" : id=="price"?"number":"text"}
                       className={"form-control m-0 " + (submittedOnce && (error ? "is-invalid active" : "is-valid active"))}
                       id={id}/>

            </div>
            {error && <small className="text-danger align-items-start d-flex col-sm-12 col-lg-9">{error}</small>}
        </div>

    }

    return (
        <div className="min-vh-100 d-flex align-items-center">
            <div
                className="bg-white col-9 col-lg-5 container d-flex flex-column align-items-center round-corners normal-shadow p-4">
                <span className="display-4 my-4 lobster-font">Add Gym</span>
                <form ref={formRef} className="text-center d-flex flex-column align-items-center w-100"
                      onSubmit={onSubmit}
                      noValidate={true}>
                    {FormControl(nameError, "name", "Name")}
                    {FormControl(descriptionError, "description", "Description")}
                    {FormControl(imageURLError, "imageURL", "Image URL")}
                    {FormControl(locationCityError, "locationCity", "City")}
                    {FormControl(priceError, "price", "Price")}
                    <button className="btn btn-primary my-3">Add Gym</button>
                </form>
            </div>
        </div>
    );
}

export default AddGymPage;