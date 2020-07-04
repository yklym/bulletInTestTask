import React from "react";
import UserService from "../../../sevices/User.service";

class UserInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {}
        }
    }

    componentDidMount() {
        if (!this.props.pageOwnerId) {
            this.setState({userInfo: {}});
            return;
        }

        UserService.loadInfo(this.props.pageOwnerId).then(info => {
            this.setState({userInfo: info})
        })

    }

    render() {
        const userObj = this.state.userInfo;
        return (
            <table className="table table-hover user-info-table">
                <tbody>
                <tr>
                    <td>Email:</td>
                    <td>{userObj.email || "None"}</td>
                </tr>
                <tr>
                    <td>First Name:</td>
                    <td>{userObj.firstName || "None"}</td>
                </tr>
                <tr>
                    <td>Last Name:</td>
                    <td>{userObj.lastName || "None"}</td>
                </tr>
                <tr>
                    <td>Posts amount:</td>
                    <td>{userObj.posts ? userObj.posts.length : 0}</td>
                </tr>
                </tbody>
            </table>

        );
    }
}

export default UserInfo;