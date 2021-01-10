import React from "react";
import { Route, Redirect } from "react-router-dom";

// if user is logged in - redirect them to loggedInPath
// if user is not logged in - render children (sign in page or signup page)
export function IsUserLoggedIn({ user, loggedInPath, children, ...restProps }) {
    console.log(user);
  return (
    <Route
      {...restProps}
      render={() => {
        if (user) {
          return children;
        }

        if (!user) {
          return <Redirect to={{ pathname: loggedInPath }} />;
        }

        return null;
      }}
    />
  );
}

// Protected routes ( /browse )
export function ProtectedRoot({ user, children, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: "signin",
                state: { from: location }
              }}
            />
          );
        }
        return null;
      }}
    />
  );
}