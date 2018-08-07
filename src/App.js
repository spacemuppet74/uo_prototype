import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import TestPage from "./features/testpage/TestPage";
import HomePage from "./views/home/Home";
import CataloguePage from "./views/catalogue/Catalogue";

const AppRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <AppLayout>
            <Component {...props} />
          </AppLayout>
        );
      }}
    />
  );
};

class App extends Component {
  state = {};
  render() {
    return (
      <Switch>
        <AppRoute path="/test" component={TestPage} />
        <AppRoute path="/catalogue/:depart" component={CataloguePage} />
        <AppRoute path="/" component={HomePage} exact />
      </Switch>
    );
  }
}

export default App;
