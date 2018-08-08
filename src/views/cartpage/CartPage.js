import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import { Message, Header, Segment, Button } from "semantic-ui-react";

import CartList from "../../features/cartList/CartList";

@inject(rootstore => ({ cart: rootstore.store.cartStore }))
@observer
export default class CartPage extends Component {
  handleContinueShopping = evt => {
    evt.preventDefault();
    const { state } = this.props.location;
    console.log(this.props.location);

    if (!state) {
      this.props.history.goBack();
    }

    if (state) {
      this.props.history.push(`/catalogue/${state.department}`);
    }
  };

  submitOrder = evt => {
    evt.preventDefault();
    this.props.cart.submit();
  };

  componentWillUnmount() {
    console.log("order completed ", this.props.cart.orderCompleted);
    const { cart } = this.props;
    if (cart.orderCompleted) {
      cart.resetOrderCompleted();
    }
  }

  render() {
    const { cart } = this.props;

    if (cart.orderCompleted && !cart.loading) {
      return <Redirect to="/my-orders" />;
    }

    if (cart.cartIsEmpty) {
      return (
        <Message
          header="No items in your cart"
          content="Please browse the catalogue and add items to your cart"
          info
          icon="info"
        />
      );
    }
    return (
      <Segment.Group>
        <Segment>
          <Header size="huge" content="Cart" />
          <CartList />
        </Segment>
        <Segment clearing>
          <Button
            floated="right"
            color="green"
            className="uniform-submit-button"
            disabled={cart.cartIsEmpty}
            onClick={this.submitOrder}
            loading={cart.loading}
          >
            Submit Order
          </Button>
          <Button
            floated="right"
            basic
            secondary
            onClick={this.handleContinueShopping}
          >
            Continue Shopping
          </Button>
        </Segment>
      </Segment.Group>
    );
  }
}
