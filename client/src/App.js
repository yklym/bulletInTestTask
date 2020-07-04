import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import MainPageComponent from "./components/mainPage/MainPage.component";
import NavbarComponent from "./components/partials/navbar/Navbar.component";
import FooterComponent from "./components/partials/Footer/Footer.component";
import PostsPageComponent from "./components/postsPage/PostsPage.component";
import UserProfile from "./components/userPage/UserProfile.component";

function App() {
    return (
        <>
            <NavbarComponent/>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/home" />}
                />
                <Route exact path="/home" component={MainPageComponent}/>
                <Route exact path="/posts" component={PostsPageComponent}/>
                <Route exact path="/users/:id" component={UserProfile}/>


                {/*<Route path='*' exact component={NotFoundComponent} />*/}
            </Switch>
            <FooterComponent/>
        </>
    );
}

export default App;
