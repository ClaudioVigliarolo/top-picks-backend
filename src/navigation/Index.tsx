import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ReportsPage from "../routes/ReportsPage";
import CategoriesPage from "../routes/CategoriesPage";
import TopicsPage from "../routes/TopicsPage";
import QuestionsPage from "../routes/QuestionsPage";
import LoginPage from "../routes/LoginPage";
import Registration from "../routes/RegistrationPage";
import CustomRoute from "./CustomRoute";
import Menu from "./Menu";

export const getCondition = (
  userType: string,
  path: string,
  isAuthenticated: boolean
) => {
  switch (path) {
    case "/login":
      return true;
    case "/registration":
      return isAuthenticated && userType == "root";
    case "/registration":
      return isAuthenticated && userType == "root";
    case "/insert/categories/:lang":
      return isAuthenticated;
    case "/insert/topics/:lang":
      return isAuthenticated;
    case "/insert/questions/:lang":
      return isAuthenticated;
    case "/insert/reports/:lang":
      return isAuthenticated;

    default:
      return false;
  }
};

export const Navigation = () => {
  const { isAuthenticated, userType, userToken, username } = React.useContext(
    AuthContext
  );
  return (
    <Menu
      userType={userType}
      isAuthenticated={isAuthenticated}
      token={userToken}
      username={username}
      children={
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <CustomRoute
            path="/login"
            condition={getCondition(userType, "/login", isAuthenticated)}
            Component={LoginPage}
            token={userToken}
          />

          <CustomRoute
            condition={getCondition(userType, "/registration", isAuthenticated)}
            path="/registration"
            Component={Registration}
            token={userToken}
          />

          <CustomRoute
            condition={getCondition(userType, "/registration", isAuthenticated)}
            path="/insert/categories/:lang"
            Component={CategoriesPage}
            token={userToken}
          />

          <CustomRoute
            condition={getCondition(userType, "/registration", isAuthenticated)}
            path="/insert/topics/:lang"
            Component={TopicsPage}
            token={userToken}
          />

          <CustomRoute
            condition={getCondition(userType, "/registration", isAuthenticated)}
            path="/insert/questions/:lang"
            Component={QuestionsPage}
            token={userToken}
          />

          <CustomRoute
            condition={getCondition(userType, "/registration", isAuthenticated)}
            path="/reports/:lang"
            Component={ReportsPage}
            token={userToken}
          />
        </Switch>
      }
    />
  );
};
