import React from 'react';
import images from "../../images/images_main";
import UserInterface from "../../interfaces/user_interface";
import {Routes} from "../../configs/routes";
import {useHistory} from "react-router-dom";

const userImageSize=150;

function UserInfoTab({user}:{user:UserInterface}) {
    const history=useHistory();
    return (
        <div className="bg-white normal-shadow col-11 col-md-auto round-corners m-2 p-2 px-4 d-flex flex-column align-items-center">
            <img height={userImageSize} width={userImageSize} className="border border-info border-3 rounded-circle" src={images.default_pp} alt="profile picture"/>
            <div className="h3 m-2 mb-0">{user.firstName} {user.lastName}</div>
            <div className="m-2 mt-0">{user.email}</div>
            {user.isGymOwner&&<button onClick={()=>{history.push(Routes.addGym)}} className="btn btn-success">Add Gym</button>}
        </div>
    );
}

export default UserInfoTab;