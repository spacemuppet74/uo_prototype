import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import TestPage from "./features/testpage/TestPage";
import HomePage from "./views/home/Home";
import CataloguePage from "./views/catalogue/Catalogue";
import CartPage from "./views/cartpage/CartPage";
import MyOrders from "./views/myorders/MyOrders";
import ApprovalsPage from "./views/approvals/ApprovalsPage";

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
        <AppRoute path="/approvals" component={ApprovalsPage} />
        <AppRoute path="/my-orders" component={MyOrders} />
        <AppRoute path="/test" component={TestPage} />
        <AppRoute path="/cart" component={CartPage} />
        <AppRoute path="/catalogue" component={CataloguePage} />
        <AppRoute path="/" component={HomePage} exact />
      </Switch>
    );
  }
}

export default App;
