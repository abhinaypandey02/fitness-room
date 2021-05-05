import React from 'react';
import GymInterface from "../../interfaces/gym_interface";
import {useHistory} from 'react-router-dom';
import {Routes} from "../../configs/routes";
import {Carousel} from "react-bootstrap";
import {ADD_ENROLLED_GYM} from "../../graphqlQueries/gymQueries";
import {useClient, useUser} from "../../contexts/user_context";

const maxLength = 180;

function GymCard({gym}: { gym: GymInterface }) {
    const user=useUser();
    const client=useClient();
    const history = useHistory();
    let description = gym.description;
    if (gym.description.length > maxLength) {
        description = gym.description.substr(0, maxLength) + "...";
    }
    function onBook(){
        client.mutate({
            mutation:ADD_ENROLLED_GYM,
            variables:{
                username:user?.email,
                gymID:gym.id,
                moneyPaid:gym?.plans[0].price,
                type:"daily",
                expired:false
            }
        }).then(()=>{history.push('/user-profile')})
    }

    return (
        <div className="card mb-3 w-100">
            <div className="row g-0">
                <div className="col-lg-6 p-4 d-flex align-items-center">
                    <Carousel>
                        {gym.imageURL?.length === 0 &&
                            <Carousel.Item>
                                <img src="https://mdbootstrap.com/img/new/slides/041.jpg"
                                     className="d-block w-100" alt="..."/>
                            </Carousel.Item>
                        }
                        {gym.imageURL.map(url =>
                            <Carousel.Item>
                                <img src={url} className="d-block w-100" alt="gymImage"/>
                            </Carousel.Item>
                        )}
                    </Carousel>


                </div>
                <div className="col-lg-6 p-2">
                    <div className="card-body h-100 d-flex flex-column justify-content-between">
                        <div>
                            <h4 className="card-title ">{gym.name}</h4>
                            <h6 className="card-title ">{gym.location.city}</h6>
                            <span className="badge bg-success my-2">{gym.rating} <i className="fas fa-star"/></span>
                            <p className="card-text" style={{maxHeight: "ellipsis"}}>
                                {description}
                            </p>
                        </div>
                        <div>
                            <h3>₹{gym.plans[0].price}</h3>
                            <button type="button" className="btn btn-outline-dark mx-1"
                                    data-mdb-ripple-color="dark" onClick={() => {
                                history.push(Routes.gymInfo(gym.id))
                            }}>
                                View Details
                            </button>
                            <button onClick={onBook} type="button" className="btn btn-success mx-1">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GymCard;