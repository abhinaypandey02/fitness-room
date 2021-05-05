import GymInterface from "./gym_interface";
import EnrolledGymInterface from "./enrolled_gym_interface";

export default interface UserInterface{
    firstName:string,
    lastName:string,
    username:string,
    email:string,
    isGymOwner:boolean,
    ownedGyms:Array<GymInterface>,
    enrolledGyms:Array<EnrolledGymInterface>,
    profilePicture:string|null,
}