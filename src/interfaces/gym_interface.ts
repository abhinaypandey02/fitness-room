import LocationInterface from "./location_interface";
import PlanInterface from "./plans_interface";
import UserInterface from "./user_interface";

export default interface GymInterface{
    id:string,
    name:string,
    description:string,
    imageURL:Array<string>,
    rating:number,
    location:LocationInterface,
    plans:Array<PlanInterface>,
    gymOwner:UserInterface,
    enrolledUsers:Array<UserInterface>
}
