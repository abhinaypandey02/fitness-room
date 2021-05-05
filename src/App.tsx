import './App.css';
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import LoginMain from './components/authentication/login/login_main';
import NavigationBarMain from "./components/navBar/navigation_bar_main";
import {Routes} from "./configs/routes";
import {useSetUser, useUser} from "./contexts/user_context";
import RegisterMain from "./components/authentication/register/register_main";
import GymListMain from "./components/gymList/gym_list_main";
import UserProfileMain from "./components/userProfile/user_profile_main";
import GymPageMain from "./components/gymPage/gym_page_main";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import AddGymPage from "./components/userProfile/add_gym_page";

function App() {

    const user = useUser();
    const setUser = useSetUser();

    document.body.style.backgroundImage = `url("https://lh3.googleusercontent.com/3ka-PrFl9Ye5IfoA2wUPmKmuVd9H_Q7KEbFPttRnJguii7rw3X58byx5oeTqd-LGhnGB5ibJy68DxQlUXnPOnILCXVbuOKgI__aCccI=w0")`;
    document.body.style.backgroundSize = "cover";
    return (
        <Router>
            <NavigationBarMain/>
            {user !== null &&
            <Switch>
                <Route path={Routes.home} exact={true}>
                    {user ? <GymListMain/> : <Redirect to={Routes.signIn}/>}
                </Route>
                <Route path={Routes.signIn}>
                    {user ? <Redirect to={Routes.home}/> : <LoginMain/>}
                </Route>
                <Route path={Routes.signUp}>
                    {user ? <Redirect to={Routes.home}/> : <RegisterMain/>}

                </Route>
                <Route path={Routes.signOut}>
                    {user ? () => {
                        setUser(undefined);
                        return <Redirect to={Routes.signIn}/>
                    } : <Redirect to={Routes.signIn}/>}

                </Route>
                <Route path={Routes.addGym}>
                    {user?<AddGymPage/>:<Redirect to={Routes.signIn}/>}
                </Route>
                <Route path={Routes.userProfile}>
                    {user ? <UserProfileMain/> : <Redirect to={Routes.signIn}/>}
                </Route>
                <Route path={Routes.userInfo}>
                    <UserProfileMain/>
                </Route>
                <Route path={Routes.gymInfo(':id')}>
                    <GymPageMain/>
                </Route>
            </Switch>
            }
        </Router>
    );
}

export default App;
