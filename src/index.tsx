// Import deps
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HashRouter } from "react-router-dom";

// Import components
import ReportsPage from "./screens/ReportsPage";
import InsertCategoriesPage from "./screens/InsertCategoriesPage";
import InsertQuestionsPage from "./screens/InsertQuestionsPage";
import InsertTopicsPage from "./screens/InsertTopicsPage";
import ViewPage from "./screens/ViewPage";
import CategoriesPage from "./screens/CategoriesPage";
import TopicsPage from "./screens/TopicsPage";
import MainPage from "./screens/InsertPage";

// Import styles
import "./styles/styles.css";
import StartPage from "./screens/StartPage";
import Menu from "./components/Menu";

// Find div container
const rootElement = document.getElementById("root");

render(
  <HashRouter>
    <Menu
      children={
        <Switch>
          <Route exact path="/">
            <StartPage />
          </Route>
          <Route exact path="/insert">
            <MainPage />
          </Route>
          <Route path="/insert/categories/:lang">
            <CategoriesPage />
          </Route>
          <Route path="/insert/topics/:lang">
            <TopicsPage />
          </Route>
          <Route path="/insert/questions/:lang">
            <InsertQuestionsPage />
          </Route>
          <Route path="/view">
            <ViewPage />
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
