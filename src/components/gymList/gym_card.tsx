import React from 'react';
import GymInterface from "../../interfaces/gym_interface";

const maxLength = 180;

function GymCard({gym}: { gym: GymInterface }) {
    let description = gym.description;
    if (gym.description.length > maxLength) {
        description = gym.description.substr(0, maxLength) + "...";
    }

    return (
        <div className="card mb-3 w-100">
            <div className="row g-0">
                <div className="col-lg-6 p-4 d-flex align-items-center">
                    <div id="gymImages" className="carousel slide" data-mdb-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                {gym.imageURL?.length === 0 ? <img src="https://mdbootstrap.com/img/new/slides/041.jpg"
                                                                   className="d-block w-100" alt="..."/> :
                                    (<div>
                                        {gym.imageURL.map((url, index) =>
                                            (<img src={url} className="d-block w-100" alt={"gymImage" + index}/>)
                                        )}
                                        <a className="carousel-control-prev" href="#gymImages" role="button"
                                           data-mdb-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                            <span className="visually-hidden">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#gymImages" role="button"
                                           data-mdb-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"/>
                                            <span className="visually-hidden">Next</span>
                                        </a>
                                    </div>)
                                }

                            </div>
                        </div>

                    </div>
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
                                    data-mdb-ripple-color="dark">
                                View Details
                            </button>
                            <button type="button" className="btn btn-success mx-1">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GymCard;