import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PostService from "../../../sevices/Post.service";

class UpdateInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "",
                description: "",
            },
            formValidationErr: null,
        }
    }

    validateFormInputs = () => {
        if (Object.values(this.state.form).some(x => x === '')) {
            this.setState({formValidationErr: "Fields can't be empty!"});
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

        PostService.create(this.state.form).then(res => {
            this.props.closeForm();
        }).catch(errFromServer => {
            this.setState({
                formValidationErr: errFromServer
            });
        });
    }

    handleFormChange = (e) => {
        const prevFormState = this.state.form;
        this.setState({
            form: {
                ...prevFormState,
                [e.target.name]: e.target.value
            },
            formValidationErr: null,
        });

    }

    render() {
        return (
            <>
                <Form>
                    <Form.Group controlId="createPostFormName">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="name" placeholder="Enter post header"

                                      onChange={this.handleFormChange}/>
                    </Form.Group>


                    <Form.Group controlId="createPostFormDescription">
                        <Form.Label>Post Description:</Form.Label>
                        <Form.Control as="textarea" rows="4" placeholder="Create short description" onChange={this.handleFormChange}
                                      name={"description"}/>
                    </Form.Group>

                </Form>
                {this.state.formValidationErr ?
                    <div className="alert alert-danger" role="alert">
                        {this.state.formValidationErr}
                    </div> : ""}

                {this.state.formValidationErr ?
                    <Button variant="primary" className={"disabled"}>
                        Create post
                    </Button>
                    :
                    <Button variant="primary" onClick={this.sendForm}>
                        Create post
                    </Button>}
            </>
        );
    }
}

export default UpdateInfoForm;