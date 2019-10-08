import React, { Component } from 'react';
import Data from "./Data";
import Cookies from "js-cookie";

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null // if cookie there, use that
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {

    const { authenticatedUser } = this.state;

    const value = { // all the stuff we want in context
      authenticatedUser,
      data: this.data,
      actions: { //It's common to pass the Provider's value prop an actions object to store any event handlers or actions you want to perform on data that's passed down through context. 
        signIn: this.signIn,
        signOut: this.signOut
      },
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password) => {
    let user = await this.data.getUser(emailAddress, password); // calls getUser function
    user.password = password;
    if (user !== null) {
      this.setState(() => {
        return {
        authenticatedUser: user, // Otherwise, the authenticatedUser state will remain null.
        password: password
        };
      });
      // Set cookie
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 }); // which name and value for cookie and in how many days the cookie expires
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null}); //This removes the name and username properties from state
    Cookies.remove('authenticatedUser'); // Removes cookie when signing out
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

