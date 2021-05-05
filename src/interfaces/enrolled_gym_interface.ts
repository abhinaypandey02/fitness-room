import UserInterface from "./user_interface";
import GymInterface from "./gym_interface";

export default interface EnrolledGymInterface{
    gymOwner:UserInterface,
    enrolledUser:UserInterface,
    gym:GymInterface,
    subscriptionType: "daily"|"weekly"|"fortnite"|"monthly"|"quarterly"|"yearly"|"custom",
    subscriptionMoneyPaid:number,
    subscriptionExpired:boolean
}