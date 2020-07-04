import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserService from "../../../sevices/User.service";

class UpdateInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                email: "",
                firstName: "",
                password: "",
            },
            formValidationErr: ""

        }
    }

    componentDidMount() {
        UserService.loadInfo(this.props.pageOwnerId).then(pageOwnerInfo => {
            pageOwnerInfo.password = "";
            this.setState({userInfo: pageOwnerInfo})
        })
    }

    validateEmail = email => {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(email).toLowerCase());
    }

    validateFormInputs = () => {
        if (!this.validateEmail(this.state.userInfo.email)) {
            this.setState({formValidationErr: "Wrong email format!"});
            return false;
        } else {
            this.setState({formValidationErr: null});
            return true;
        }
    };

    sendForm = () => {
        if (!this.validateFormInputs()) {
            return
        }

        UserService.update(this.props.pageOwnerId, this.state.userInfo).then(res => {
            this.props.closeForm();
        }).catch(errFromServer => {
            this.setState({
                formValidationErr: errFromServer
            });
        });
    }
    handleFormChange = (e) => {
        const prevFormState = this.state.userInfo;
        this.setState({
            userInfo: {
                ...prevFormState,
                [e.target.name]: e.target.value
            },
            formValidationErr: null
        });

    }

    render() {
        console.log(this.state.userInfo);
        return (
            <>
                <Form>
                    <Form.Group controlId="registerFormEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email"
                                      defaultValue={this.state.userInfo.email}
                                      onChange={this.handleFormChange}/>
                    </Form.Group>


                    <Form.Group controlId="registerFormFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" name="firstName"
                                      defaultValue={this.state.userInfo.firstName}
                                      onChange={this.handleFormChange}/>
                    </Form.Group>


                    <Form.Group controlId="registerFormPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" defaultValue={this.state.userInfo.password}
                                      placeholder="Leave empty and password will remain unchanged"
                                      onChange={this.handleFormChange}/>
                    </Form.Group>

                </Form>
                {
                    this.state.formValidationErr ?
                        <div className="alert alert-danger" role="alert">
                            {this.state.formValidationErr}
                        </div> : ""
                }
                {this.state.formValidationErr ?
                    <Button variant="primary" className={"disabled"}>
                        Save Changes
                    </Button>
                    :
                    <Button variant="primary" onClick={this.sendForm}>
                        Save Changes
                    </Button>}
            </>
        );
    }
}

export default UpdateInfoForm;