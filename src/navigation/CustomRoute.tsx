import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface CustomRouteProps {
  path: string;
  condition: boolean;
  Component: any;
  token: string;
}

const CustomRoute = ({
  path,
  Component,
  condition,
  token,
}: CustomRouteProps) => {
  return condition ? (
    <Route
      path={path}
      render={(routeProps) => (
        <Component navigationProps={routeProps} token={token} />
      )}
    />
  ) : (
    <Redirect to="/login" />
  );
};
export default CustomRoute;
