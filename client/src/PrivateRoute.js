import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? ( /*If the user is authenticated, the component specified in <PrivateRoute>'s component prop gets rendered.*/
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: "/signin",
              state: { from: props.location } //The state property holds information about the user's current location (i.e., the current browser URL). That way, if authentication is successful, the router can redirect the user back to the original location (from: props.location).
            }} /> /*If the user not authenticated, redirect to /signin:*/
          )
        }
        />
      )}
    </Consumer>
  );
};