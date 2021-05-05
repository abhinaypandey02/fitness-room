import React from 'react';
import GymInterface from "../../interfaces/gym_interface";
import GymCard from "./gym_card";
import {useQuery} from "@apollo/client";
import {GYM_LIST_ALL} from "../../graphqlQueries/gymQueries";

function GymListMain() {
    const {loading,error,data}=useQuery(GYM_LIST_ALL);
    if(loading){
        return <div>loading Gyms...</div>
    }
    if(error){
        return <div>Error fetching gyms</div>
    }
    return (
        <div className="container-md py-3">
            {data.gyms.map((gym:GymInterface)=>(<GymCard key={gym.id} gym={gym}/>))}
        </div>
    );
}

export default GymListMain;