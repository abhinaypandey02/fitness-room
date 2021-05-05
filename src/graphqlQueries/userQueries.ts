import {gql} from "@apollo/client";

export const ADD_USER = gql`mutation ADD_USER($firstName:String!,$username:String!,$lastName:String!,$email:String!,$password:String!,$isGymOwner:Boolean!){
    addUser(firstName:$firstName,lastName:$lastName,username:$username,email:$email,password:$password,isGymOwner:$isGymOwner)
}`

export const GET_USER_BY_USERNAME = gql`query GET_USER_BY_USERNAME($username:String!){
    userFromUsername(username:$username){
        firstName
        lastName
        email
        isGymOwner
        profilePicture
        enrolledGyms {
          gym{
            name
          }
          subscriptionType
          subscriptionMoneyPaid
          subscriptionExpired
        }
        ownedGyms{
            name
        }
    }
}`

export const GET_USER_BY_EMAIL = gql`query GET_USER_BY_EMAIL($email:String!){
    user(email:$email){
        firstName
        lastName
        email
        isGymOwner
        profilePicture
        enrolledGyms {
          gym{
            name
          }
          subscriptionType
          subscriptionMoneyPaid
          subscriptionExpired
        }
        ownedGyms{
            name
        }
    }
}`

export const VERIFY_USER = gql`query VERIFY_USER($email:String!,$password:String!){
    userVerification(email:$email,password:$password){
        firstName
        lastName
        username
        email
        isGymOwner
        profilePicture
        enrolledGyms {
          subscriptionType
          subscriptionMoneyPaid
          subscriptionExpired
        }
        ownedGyms{
            name
        }
    }
}`