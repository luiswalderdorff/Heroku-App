import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from "./Form";

export default class UserSignUp extends Component {
	state = {
	    firstName: '',
	    lastName: '',
	    emailAddress: "",
	    password: '',
	    errors: [],
	  }

	render() {

		const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

		return(
			<div className="bounds">
			  <div className="grid-33 centered signin">
			    <h1>Sign Up</h1>
			    <div>
			    <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress"
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                  <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
                  <input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password"
                  onChange={this.change} 
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
  		    </div>
			    <p>&nbsp;</p>
			    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
			  </div>
			</div>
		)
	}

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

	submit = () => {
    const { context } = this.props;

    const {
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state;

    // New user payload
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    // Password Confirmation

    if (document.getElementById('password').value !==
      document.getElementById('confirmPassword').value) {
      return alert("Password confirmation failed");
    } 

    context.data.createUser(user) 
      .then( errors => {
        if (errors.length > 0) { // Changed from errors.length to errors
          this.setState({ errors });
          console.log(errors);
        } else {
        	console.log(`${emailAddress} is successfully signed up and authenticated!`);
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push("/");
            })
        }
      }).catch( err => {
        console.log(err);
        this.props.history.push("/error"); //changes the current url //Need to create error component!!
      })
  }
  cancel = () => {
		this.props.history.push("/");
	}
}
