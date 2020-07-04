import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import UserService from "../../sevices/User.service";

class registerModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            form: {
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                passwordRepeat: "",
            },
            formValidationErr: "",

        }
    }

    validateFormInputs = () => {
        if(!this.validateEmail(this.state.form.email)){
            this.setState({formValidationErr: "Wrong email format!"});
        } else if (this.state.form.password !== this.state.form.passwordRepeat) {
            this.setState({formValidationErr: "Passwords must match!"});
        } else if (Object.values(this.state.form).some(x => x === '')) {
            this.setState({formValidationErr: "all fields are required"});
        } else {
            this.setState({formValidationErr: null});
            return true;
        }
        return false;
    };

    handleFormChange = (e) => {
        const prevFormState = this.state.form;
        this.setState({
            form: {
                ...prevFormState,
                [e.target.name]: e.target.value
            },
            formValidationErr: null

        });

    }

    sendForm = () => {

        if (!this.validateFormInputs()) {
            return
        }

        UserService.register(this.state.form).then(res => {
            this.setHidden();
            this.props.onUserLogIn();
        }).catch(errFromServer => {
            this.setState({
                formValidationErr: errFromServer
            });
        });
    }
    setVisible = isVisible => {
        this.setState({isOpen: true});
    }

    setHidden = isVisible => {
        this.setState({isOpen: false});
    }

    validateEmail = email => {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        return (
            <>
                <span className={"auth-link"} onClick={this.setVisible}>Sign up</span>
                {/*centered, size="lg"*/}
                <Modal show={this.state.isOpen} size="md" onHide={this.setHidden}
                       keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign up to the app!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Form.Group controlId="registerFormEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email"
                                              onChange={this.handleFormChange}/>
                            </Form.Group>


                            <Form.Group controlId="registerFormFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name" name="firstName"
                                              onChange={this.handleFormChange}/>
                            </Form.Group>

                            <Form.Group controlId="registerFormSecondName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name" name="lastName"
                                              onChange={this.handleFormChange}/>
                            </Form.Group>

                            <Form.Group controlId="registerFormPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Create password" name="password"
                                              onChange={this.handleFormChange}/>
                            </Form.Group>

                            <Form.Group controlId="registerFormPasswordRepeat">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm password" name="passwordRepeat"
                                              onChange={this.handleFormChange}/>
                            </Form.Group>

                        </Form>
                        {this.state.formValidationErr ?
                            <div className="alert alert-danger" role="alert">
                                {this.state.formValidationErr}
                            </div> : ""}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.setHidden}>
                            Close
                        </Button>

                        {this.state.formValidationErr ?
                            <Button variant="primary" className={"disabled"}>
                                Save Changes
                            </Button>
                            :
                            <Button variant="primary" onClick={this.sendForm}>
                                Save Changes
                            </Button>}
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default registerModal;
