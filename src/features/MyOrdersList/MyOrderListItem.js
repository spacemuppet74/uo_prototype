import React, { Fragment } from "react";
import { observer } from "mobx-react";
import {
  Accordion,
  Icon,
  Header,
  Table,
  Message,
  Segment
} from "semantic-ui-react";

import DisplayDate from "../DisplayDate/DisplayDate";

function formatStatus(status) {
  switch (status) {
    case "approved":
      return "green";
    case "pending":
      return "orange";
    case "declined":
      return "red";
    case "ordered":
      return "blue";
    default:
      return "black";
  }
}

const MyOrderListItem = ({ order, activeIndex, rootstore }) => {
  return (
    <Fragment>
      <Accordion.Title
        active={activeIndex === order.id}
        index={order.id}
        onClick={() => order.makeActive()}
      >
        <Icon name="dropdown" />
        Order Date: <DisplayDate date={order.createdDate} />
        <Header
          as="h3"
          floated="right"
          color={formatStatus(order.status)}
          content={order.status}
        />
        <Header sub color="grey">
          Approver:
          <span> {order.approverName}</span>
        </Header>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === order.id}>
        <Segment basic loading={order.loading === "loading"}>
          {order.itemsIsEmpty ? (
            <Message
              icon="warning"
              error
              header="No Items to display"
              content="There seems to be a problem with this order"
            />
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Item</Table.HeaderCell>
                  <Table.HeaderCell>Colour</Table.HeaderCell>
                  <Table.HeaderCell>Size</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {order.items.map(item => (
                  <Table.Row key={item.Id}>
                    <Table.Cell>{item.order_item_name.Title}</Table.Cell>
                    <Table.Cell>{item.order_item_colour.Title}</Table.Cell>
                    <Table.Cell>{item.order_item_size.Title}</Table.Cell>
                    <Table.Cell>{item.Title}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Segment>
      </Accordion.Content>
    </Fragment>
  );
};

export default observer(MyOrderListItem);
