import React, {Component} from 'react';
import Form from './Form';
import {Link} from 'react-router-dom';


export default class UserSignIn extends Component {
	state = {
    emailAddress: "",
    password: '',
    errors: [],
  }

	render() {

		const {
      emailAddress,
      password,
      errors,
    } = this.state;

		return(
			<div className="bounds">
			  <div className="grid-33 centered signin">
			    <h1>Sign In</h1>
			    <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address"
                  required />
                <input 
                  id="password" 
                  name="password" 
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password"
                  required />
              </React.Fragment>
            )} />
			    <p>&nbsp;</p>
			    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
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
    const { from } = this.props.location.state || { from: { pathname: '/' } }; 
    const { emailAddress, password } = this.state;
    context.actions.signIn(emailAddress, password) 
      .then( user => { 
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful"]};
          });
        } else {
          this.props.history.push(from); //The from variable passed to history.push(from) contains information about the pathname an unauthenticated user redirected "from" (via this.props.location.state). For example, if a user redirects to the sign up page from /settings, from will be equal to pathname: "/settings".
          console.log(`SUCCESS! ${emailAddress} is now signed in!`); // Same as in UserSignUp
        }
      }).catch( err => {
        console.log(err);
        this.props.history.push("/error");
      })
  }

  cancel = () => {
    this.props.history.push("/");
  }
}

