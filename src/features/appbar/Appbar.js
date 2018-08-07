import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Image, Icon } from "semantic-ui-react";
import { inject, observer } from "mobx-react";

@inject(rootstore => ({ userStore: rootstore.store.userStore }))
@observer
export default class Appbar extends Component {
  render() {
    const { userStore } = this.props;
    const { currentUser } = userStore;
    return (
      <Menu>
        <Menu.Item name="home" as={Link} to="/">
          Home
        </Menu.Item>

        <Menu.Item name="your-orders" as={Link} to="/my-orders">
          My Orders
        </Menu.Item>
        {currentUser.isApprover ? (
          <Menu.Item name="approvals" as={Link} to="/approvals">
            Approvals
          </Menu.Item>
        ) : null}
        <Menu.Menu position="right">
          <Menu.Item name="cart" as={Link} to="/cart">
            <Icon name="cart" />
          </Menu.Item>
          {currentUser.isAdmin ? (
            <Menu.Item as={Link} to="/admin">
              <Icon name="setting" />
            </Menu.Item>
          ) : (
            <Image src={currentUser.avatar} avatar />
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}
