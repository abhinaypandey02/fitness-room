export const Routes={
    signIn:'/sign-in',
    signUp:'/sign-up',
    home:'/',
    userProfile:'/user-profile',
    signOut:'/sign-out',
    userInfo:'/user/:username',
    addGym:'/add-gym',
    gymInfo:(id:string)=>'/gym/'+id
}