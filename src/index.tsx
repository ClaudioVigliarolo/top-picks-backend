// Import deps
import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { HashRouter } from "react-router-dom";

// Import components
import ReportsPage from "./screens/ReportsPage";
import CategoriesPage from "./screens/CategoriesPage";
import TopicsPage from "./screens/TopicsPage";
import QuestionsPage from "./screens/QuestionsPage";
import LoginPage from "./screens/LoginPage";

// Import styles
import "./styles/styles.css";
import Menu from "./components/Menu";

// Find div container
const rootElement = document.getElementById("root");

render(
  <HashRouter>
    <Menu
      children={
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/insert/categories/:lang">
            <CategoriesPage />
          </Route>
          <Route path="/insert/topics/:lang">
            <TopicsPage />
          </Route>
          <Route path="/insert/questions/:lang">
            <QuestionsPage />
          </Route>
          <Route path="/reports/:lang">
            <ReportsPage />
          </Route>
        </Switch>
      }
    />
  </HashRouter>,

  rootElement
);
