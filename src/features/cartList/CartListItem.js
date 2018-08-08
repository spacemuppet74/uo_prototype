import React, { Component } from "react";
import { Table, Image, Item, Dropdown, Icon } from "semantic-ui-react";
import { observer } from "mobx-react";

@observer
export default class CartListItem extends Component {
  handleSizeChange = (evt, { value }) => {
    console.log("change size ", value);
    this.props.item.changeSize(value);
  };

  handleQuantityChange = (evt, { value }) => {
    this.props.item.changeQuantity(value);
  };

  handleRemoveItem = evt => {
    this.props.item.remove();
    evt.preventDefault();
  };

  render() {
    const { item } = this.props;
    return (
      <Table.Row>
        <Table.Cell width={1}>
          <Image size="mini" src={item.image} centered />
        </Table.Cell>
        <Table.Cell width={5}>
          <Item>
            <Item.Content>
              <Item.Header>{item && item.name}</Item.Header>
            </Item.Content>
          </Item>
        </Table.Cell>
        <Table.Cell width={2}>{item && item.colour}</Table.Cell>
        <Table.Cell width={5}>
          <Dropdown
            selection
            options={item.sizeOptions}
            value={item.selectedSize}
            onChange={this.handleSizeChange}
          />
        </Table.Cell>
        <Table.Cell width={5}>
          <Dropdown
            selection
            options={item.availableQuantites}
            value={item.quantity}
            onChange={this.handleQuantityChange}
          />
        </Table.Cell>
        <Table.Cell width={1}>
          <Icon name="trash" color="red" onClick={this.handleRemoveItem} />
        </Table.Cell>
      </Table.Row>
    );
  }
}
