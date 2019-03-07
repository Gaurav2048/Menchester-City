import React, { Component } from 'react'
import FormField from '../ui/formFields';
import {validate} from '../ui/misc';
import {firebase} from '../../Firebase';


export default class SingIn extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    submitForm(event) {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            console.log(dataToSubmit);
            formIsValid = this.state.formdata[key].valid && formIsValid;

        }


        if (formIsValid) {
           
            firebase.auth()
            .signInWithEmailAndPassword(
                dataToSubmit.email,
                dataToSubmit.password
            ).then(()=> {
                    console.log('user in auth');
                    this.props.history.push('/dashboard');   
            }).catch((e)=>{
                this.setState({
                    formError: true
                })
            })

        } else {
            this.setState({
                formError:true
            })
        }

    }

    updateForm(element) {

        const newFormdata = { ...this.state.formdata };
        const newElement = { ...newFormdata[element.id] };

        newElement.value = element.event.target.value;

        let validData = validate(newElement);


        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];


        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata,
            formSuccess: 'congratulation'
        });

       // this.successMessage();
    }


    render() {
        return (
            <div className="container">
                <div className="signin_wrapper" style={{ margin: '100px' }}>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <h2>
                            Please Login In
                            </h2>
                            <FormField id={'email'} formdata={this.state.formdata.email}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField id={'password'} formdata={this.state.formdata.password}
                                change={(element) => this.updateForm(element)}
                            />

                        {this.state.formError ? <div className="error_label"> Something went wrong!</div>: ""}

                            <button onClick={(event) => this.submitForm(event)}>Login</button>

                        
                    </form>
                </div>
            </div>
        )
    }
}
