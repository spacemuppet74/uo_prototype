import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Dimmer, Loader } from "semantic-ui-react";

import MyOrdersList from "../../features/MyOrdersList/MyOrdersList";

@inject(rootstore => ({
  myOrders: rootstore.store.myOrderStore
}))
@observer
export default class MyOrders extends Component {
  render() {
    const { myOrders } = this.props;
    if (myOrders.loading) {
      return (
        <Dimmer active inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
      );
    }
    return <MyOrdersList />;
  }
}
