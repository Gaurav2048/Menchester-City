import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import { firebasePromotions } from '../../../Firebase';


export default class Enroll extends Component {
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
            }
        }
    }
    resetFormSuccess(type) {
        const newFormdata = { ...this.state.formdata };
        for (let key in newFormdata) {
            newFormdata[key].value = '';
            newFormdata[key].valid = false
            newFormdata[key].validationMessage = ''
        }

        this.setState({
            formError: false,
            formdata: newFormdata,
            formSuccess:type ?  'Congratulation' : 'Already on the database '
        })
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
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once("value")
                .then((snapshot) => {

                    if (snapshot.val() === null) {
                        firebasePromotions.push(dataToSubmit);
                        this.resetFormSuccess(true)
                    } else {
                        this.resetFormSuccess(false)
                    }

                })

        } else {

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

        this.successMessage();
    }
    successMessage() {
        // setTimeout(()=>{
        //     this.setState({
        //         formSuccess:''
        //     }, 2000)
        // })
    }

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form submit={(event) => this.submitForm(event)}>
                        <div className="enroll_title">
                            Enter Your Email
                            </div>
                        <div className="enroll_input">
                            <FormField id={'email'} formdata={this.state.formdata.email}
                                change={(element) => this.updateForm(element)}
                            />
                            {this.state.formError ?
                                <div className="error_label">
                                    Some thing is wrong
                                </div> : null}
                            <div className="success_label"> {this.state.formSuccess}</div>
                            <button onClick={(event) => this.submitForm(event)}>Enroll</button>
                        <div className="enroll_discl"> scrambled it to make a type spe typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset</div>
                        </div>
                    </form>
                </div>
            </Fade>
        )
    }
}
