import React, {useEffect, useState} from 'react';
import {Redirect, useHistory, useParams} from 'react-router-dom';
import {useClient, useUser} from "../../contexts/user_context";
import {ADD_ENROLLED_GYM, GET_GYM_BY_ID} from "../../graphqlQueries/gymQueries";
import GymInterface from "../../interfaces/gym_interface";
import {Carousel} from "react-bootstrap";
import UserInterface from "../../interfaces/user_interface";

function GymPageMain() {
    const history=useHistory();
    const {id} = useParams<{ id: string }>();
    const user:UserInterface | undefined | null=useUser();

    const client = useClient();
    const [gym, setGym] = useState<GymInterface | null | undefined>(undefined);

    function onBook(){
        client.mutate({
            mutation:ADD_ENROLLED_GYM,
            variables:{
                username:user?.email,
                gymID:id,
                moneyPaid:gym?.plans[0].price,
                type:"daily",
                expired:false
            }
        }).then(()=>{history.push('/user-profile')})
    }
    useEffect(() => {
        if (id)
            client.query({query: GET_GYM_BY_ID, variables: {id}}).then((result: any) => {
                if (result.data.gym) {
                    setGym(result.data.gym);
                } else setGym(null);
            }).catch(() => {
                setGym(null)
            })
    }, [id])
    if (!id) return <div>NOT FOUND</div>
    if (gym === undefined) return <div>LOADING</div>
    if (gym === null) return <div>NOT FOUND</div>
    return (
        <div className="bg-white ">
            <div className="container-fluid p-0">
                <Carousel indicators={true}>
                    {gym.imageURL.map(url =>
                        <Carousel.Item className="text-center">
                            <img src={url} alt="gym image" className=""/>
                        </Carousel.Item>
                    )}

                </Carousel>
            </div>
            <div className="container my-3">
                <div className="row">
                    <div className="col-lg-8 my-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-fluid w-100">
                                    <div className="d-flex justify-content-between">
                                        <h1>{gym.name}</h1>
                                        <span className="badge bg-success pt-3">
                                            <h5> {gym.rating}
                                            <i className="fas fa-star"/>
                                            </h5>
                                        </span>
                                    </div>
                                    <br/>
                                    <h3>Description</h3>
                                    <p>{gym.description}</p>
                                    <br/>
                                    <h3>Choose your plan</h3>
                                    <br/>
                                    {gym.plans.map((plan) =>
                                        <div className="card mb-3">
                                            <div className="card-header">Selected Category</div>
                                            <div className="row g-0">
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Plan 1</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-2 d-flex justify-content-between">
                                                <h3 className="my-2">Rs.{plan.price}</h3>
                                                <button className="btn btn-primary">Selected</button>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 my-3">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="card">
                                        <div className="card-header">Booking</div>
                                        <div className="container ">
                                            <h4 className="mt-3">Rs.{gym.plans[0].price}</h4>
                                            <br/>
                                            <div className="d-flex justify-content-between mt-3">Total
                                                Price <strong>Rs.{gym.plans[0].price}</strong></div>
                                            <button onClick={onBook} className="btn w-100 btn-success my-3">Book</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GymPageMain;