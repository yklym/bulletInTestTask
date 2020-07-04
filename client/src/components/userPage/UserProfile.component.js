import React from "react";
import "./UserProfile.scss";
import Nav from "react-bootstrap/Nav";

import UserInfo from "./userInfo/UserInfo.component";
import UpdateInfoForm from "./forms/UpdateInfoForm.component";
import CreatePostForm from "./forms/CreatePost.component";

import UserService from "./../../sevices/User.service";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        let queryStrArr = this.props.location.pathname.split("/");
        let pageOwnerId = queryStrArr[queryStrArr.length - 1];

        let userHaveAccessMessage = ""
        if (!UserService.user || !UserService.isOwner(pageOwnerId)) {
            userHaveAccessMessage = "You can't access pages of other users"
        }
        this.state = {
            showMode: "userInfo",
            pageOwnerId: pageOwnerId,
            accessErrorMessage: userHaveAccessMessage,
        }
    }

    setShowMode = (value) => {
        this.setState({
            showMode: value
        })

    }


    showContent = () => {
        const {showMode, pageOwnerId} = this.state;

        switch (showMode) {
            case "userInfo":
                return <UserInfo pageOwnerId={pageOwnerId}/>;
            case "updateInfoForm" :
                return <UpdateInfoForm pageOwnerId={pageOwnerId} closeForm={()=>this.setShowMode("userInfo")}/>
            case "createPost":
                return <CreatePostForm closeForm={()=>this.setShowMode("userInfo")}/>;
            default:
                return "choose an options";
        }
    }

    render() {
        if (this.state.accessErrorMessage) {
            return (
                <main className={"user-profile-main border-secondary"}>
                    <div className="alert alert-danger" role="alert">
                        {this.state.accessErrorMessage}
                    </div>
                </main>
            )
        }

        return (
            <main className={"user-profile-main border-secondary"}>
                <Nav fill variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <p className={"nav-link"} onClick={() => this.setShowMode("userInfo")}>View My info</p>
                    </Nav.Item>
                    <Nav.Item>
                        <p className={"nav-link"} onClick={() => this.setShowMode("updateInfoForm")}>Edit my profile</p>

                    </Nav.Item>
                    <Nav.Item>
                        <p className={"nav-link"} onClick={() => this.setShowMode("createPost")}>Create Post</p>
                    </Nav.Item>
                </Nav>

                <section className={"content-wrapper"}>
                    {this.showContent()}
                </section>


            </main>
        )
    }
}

export default UserProfile;