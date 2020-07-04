import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import MainPageComponent from "./components/mainPage/MainPage.component";
import NavbarComponent from "./components/partials/navbar/Navbar.component";
import FooterComponent from "./components/partials/Footer/Footer.component";
import PostsPageComponent from "./components/postsPage/PostsPage.component";

function App() {
    return (
        <>
            <NavbarComponent/>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/home" />}
                />
                <Route exact path="/home" component={MainPageComponent}/>
                <Route exact path="/posts" component={PostsPageComponent}/>


                {/*<Route path='*' exact component={NotFoundComponent} />*/}
            </Switch>
            <FooterComponent/>
        </>
    );
}

export default App;
