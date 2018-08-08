import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Table } from "semantic-ui-react";

import CartListItem from "./CartListItem";

@inject(rootstore => ({ cart: rootstore.store.cartStore }))
@observer
export default class CartItems extends Component {
  render() {
    const { cart } = this.props;
    return (
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Colour</Table.HeaderCell>
            <Table.HeaderCell>Size</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cart.items.map(item => <CartListItem key={item.id} item={item} />)}
        </Table.Body>
      </Table>
    );
  }
}
