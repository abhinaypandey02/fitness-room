import {gql} from "@apollo/client";

export const GYM_LIST_ALL=gql`{
    gyms{
        name,
        id,
        description,
        imageURL,
        rating,
        plans {
          price
        },
        location {
          city
        },
        gymOwner{
          firstName,
          lastName
        },
        enrolledUsers {
          firstName
          lastName
        }
        
            
    }
}`

export const GET_GYM_BY_ID=gql`query GET_GYM_BY_ID($id:String!){
    gym(id:$id){
        name,
        id,
        description,
        imageURL,
        rating,
        plans {
          price
        },
        location {
          city
        },
        gymOwner{
          firstName,
          lastName
        },
        enrolledUsers {
          firstName
          lastName
        }
        
            
    }
}`

export const ADD_ENROLLED_GYM=gql`mutation ADD_ENROLLED_GYM($username:String!,$gymID:String!,$type:String,$moneyPaid:Float!,$expired:Boolean!){
    addEnrolledGym(enrolledUser:$username,gym:$gymID,subscriptionType:$type,subscriptionMoneyPaid:$moneyPaid,subscriptionExpired:$expired){
        subscriptionType
    }
}
`

export const ADD_GYM=gql`mutation ADD_GYM($price:Float!,$name:String!,$description:String!,$imageURL:String!,$gymOwner:String!,$locationCity:String!){
    addGym(price:$price, name:$name,description:$description,imageURL:$imageURL,gymOwner:$gymOwner,locationCity:$locationCity){
        name
    }
}

`