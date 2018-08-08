import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import {
  Accordion,
  Button,
  Message,
  Dimmer,
  Loader,
  Segment
} from "semantic-ui-react";

import MyOrderListItem from "./MyOrderListItem";

@inject(rootstore => ({ myOrders: rootstore.store.myOrderStore }))
@observer
export default class MyOrdersList extends Component {
  handleFetchMore = evt => {
    evt.preventDefault();
    this.props.myOrders.loadMore();
  };

  render() {
    const { myOrders } = this.props;
    if (myOrders.isEmpty) {
      return (
        <Message
          info
          icon="question"
          header="No orders to display"
          content="Have you submitted any orders?"
        />
      );
    }

    return (
      <Fragment>
        <Accordion fluid styled>
          {myOrders.getMyOrders.map(order => (
            <MyOrderListItem
              key={order.id}
              order={order}
              activeIndex={myOrders.activeOrder}
              rootstore={this.props.store}
            />
          ))}
        </Accordion>
        {myOrders.hasNext && (
          <Segment textAlign="center" clearing>
            <Button
              basic
              color="blue"
              size="large"
              onClick={this.handleFetchMore}
            >
              Load Next {myOrders.numberOfItemPerPage} Orders
            </Button>
          </Segment>
        )}
      </Fragment>
    );
  }
}
