import React, {useEffect, useState} from 'react';
import GymInterface from "../../interfaces/gym_interface";
import {getGymList} from "../../backend/gym_provider";
import GymCard from "./gymCard";

function GymList() {
    const [gymList,setGymList]=useState<Array<GymInterface>>([]);
    useEffect(()=>{
        getGymList().then(gymList=>setGymList(gymList));
    },[])
    return (
        <div className="container-md py-3">
            {gymList.map(gym=>(<GymCard gym={gym}/>))}
        </div>
    );
}

export default GymList;