import React, {useEffect, useState} from 'react';
import EnrolledGymsTab from "./enrolled_gyms_tab";
import {useClient, useUser} from "../../contexts/user_context";
import UserInterface from "../../interfaces/user_interface";
import UserInfoTab from "./user_info_tab";
import {useParams} from 'react-router-dom';
import {GET_USER_BY_USERNAME} from "../../graphqlQueries/userQueries";
import OwnedGymsTab from "./owned_gyms_tab";
function UserProfileMain() {
    const user:UserInterface | undefined | null=useUser();
    const {username}=useParams<{username:string}>()
    const client=useClient();
    const [userInfo,setUserInfo]=useState<undefined|UserInterface|null>(undefined);

    function MAIN(userT:UserInterface){
        return (
            <div className="m-2 d-flex flex-wrap justify-content-center ">
                <UserInfoTab user={userT}/>
                <EnrolledGymsTab user={userT}/>
                {userT.isGymOwner&&<OwnedGymsTab user={userT}/>}
            </div>
        );
    }

    useEffect(()=>{
        if(username) {
            client.query({
                query:GET_USER_BY_USERNAME,
                variables:{username}
            }).then((result:any)=>{
                if(!result.data.userFromUsername)setUserInfo(null);
                else setUserInfo(result.data.userFromUsername);
            })
        }
        else setUserInfo(undefined);
    },[username])
    if(userInfo===null)return(
        <div className="m-2 d-flex flex-wrap justify-content-center ">
            NOT FOUND
        </div>
    )
    if(userInfo===undefined){
        if(user){
            return (
                MAIN(user)
            );
        }
        else return null
    }
    return MAIN(userInfo)
}

export default UserProfileMain;