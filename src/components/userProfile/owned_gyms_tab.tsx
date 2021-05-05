import React from 'react';
import UserInterface from "../../interfaces/user_interface";

const TAB_HEADING="Owned Gyms"

function OwnedGymsTab({user}:{user:UserInterface}) {
    console.log(user.enrolledGyms)
    return (
        <div className="flex-grow-1 bg-white normal-shadow round-corners m-2 p-2 px-4 h-100">
            <h2 className="m-2">{TAB_HEADING}</h2>
            {user.ownedGyms.map(gym=>{
                return <div>
                    {gym.name}
                </div>
            })}
        </div>
    );
}

export default OwnedGymsTab;