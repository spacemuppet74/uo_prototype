import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import {
  Segment,
  Item,
  Divider,
  Header,
  Dropdown,
  Button,
  Dimmer,
  Loader
} from "semantic-ui-react";

const classes = {
  marginTop: "8px"
};

@inject(rootstore => ({
  uniforms: rootstore.store.uniformStore,
  cart: rootstore.store.cartStore
}))
@observer
export default class UniformDetails extends Component {
  handleCanel = evt => {
    evt.preventDefault();
    this.props.history.goBack();
  };

  handleAddToCart = evt => {
    evt.preventDefault();
    const { uniformId, depart } = this.props.match.params;
    const { uniforms, cart } = this.props;
    const uniform = uniforms.uniforms.get(+uniformId);

    cart.addItemToCart(uniform);
    this.props.history.push({
      pathname: "/cart",
      state: { department: depart }
    });
  };

  componentWillUnmount() {
    const { uniformId } = this.props.match.params;
    const { uniforms } = this.props;
    const uniform = uniforms.uniforms.get(+uniformId);
    uniform.resetSizeAndQuantity();
  }

  render() {
    const { uniformId } = this.props.match.params;
    const { uniforms, cart } = this.props;
    const uniform = uniforms.uniforms.get(+uniformId);

    if (uniforms.loading) {
      return (
        <Dimmer inverted active>
          <Loader>Loading...</Loader>
        </Dimmer>
      );
    }

    return (
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image src={uniform.image} rounded />
            <Item.Content className="uniform-card-content">
              <Item.Header as="h1" content={uniform.name} />
              <Item.Meta> {uniform.description} </Item.Meta>
              <Divider />
              <Item.Description>
                <Segment basic>
                  <Header as="h3">Colour: {uniform.colour.Title}</Header>
                </Segment>
                <Segment basic className="clearFix">
                  <Header as="h3" floated="left" style={classes}>
                    Size:
                  </Header>
                  <Dropdown
                    selection
                    options={uniform.availableSizes}
                    placeholder="Select Size"
                    onChange={(evt, { value }) =>
                      uniform.setSelectedSize(value)
                    }
                  />
                </Segment>
                <Segment basic className="clearFix">
                  <Header
                    as="h3"
                    content="Quantity"
                    floated="left"
                    style={classes}
                  />
                  <Dropdown
                    selection
                    options={uniform.availableQuantites}
                    placeholder="Select Quantity"
                    onChange={(evt, { value }) =>
                      uniform.setSelectedQuantity(value)
                    }
                  />
                </Segment>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
        <Segment basic className="clearFix">
          <Button
            basic
            color="green"
            floated="left"
            disabled={uniform.allowSubmit}
            onClick={this.handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button basic color="red" floated="left" onClick={this.handleCanel}>
            Cancel
          </Button>
        </Segment>
      </Segment>
    );
  }
}
