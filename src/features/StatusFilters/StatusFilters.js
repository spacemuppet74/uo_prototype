import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Menu } from "semantic-ui-react";

@inject(rootstore => ({ status: rootstore.store.statusStore }))
@observer
export default class StatusFilters extends Component {
  render() {
    const { status } = this.props;
    return (
      <Menu vertical>
        <Menu.Item>
          <Menu.Header>Status</Menu.Header>
          <Menu.Menu>
            {status.getStatus.map(stat => (
              <Menu.Item
                key={stat.id}
                name={stat.title}
                active={status.activeStatus === stat.id}
                onClick={() => status.setActiveStatus(stat.id)}
              />
            ))}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}
