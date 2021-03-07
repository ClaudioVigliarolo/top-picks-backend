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

import MainPage from "./screens/InsertPage";

// Import styles
import "./styles/styles.css";
import StartPage from "./screens/StartPage";

// Find div container
const rootElement = document.getElementById("root");

render(
  <HashRouter>
    <Switch>
      <Route exact path="/">
        <StartPage />
      </Route>
      <Route exact path="/insert">
        <MainPage />
      </Route>
      <Route path="/insert/categories/:lang">
        <InsertCategoriesPage />
      </Route>
      <Route path="/insert/topics/:lang">
        <InsertTopicsPage />
      </Route>
      <Route path="/insert/questions/:lang">
        <InsertQuestionsPage />
      </Route>
      <Route path="/view">
        <ViewPage />
      </Route>
      <Route path="/reports">
        <ReportsPage />
      </Route>
    </Switch>
  </HashRouter>,

  rootElement
);
