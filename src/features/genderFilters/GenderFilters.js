import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Menu } from "semantic-ui-react";

@inject(rootstore => ({ genders: rootstore.store.genderStore }))
@observer
export default class GenderFilters extends Component {
  componentWillUnmount = () => {
    this.props.genders.setActiveGender(null);
  };
  render() {
    const { genders } = this.props;
    return (
      <Menu.Item>
        <Menu.Header>Genders</Menu.Header>
        <Menu.Menu>
          {genders.getGenders.map(gender => (
            <Menu.Item
              key={gender.id}
              name={gender.title}
              active={genders.activeGender === gender.id}
              onClick={() => genders.setActiveGender(gender.id)}
            />
          ))}
        </Menu.Menu>
      </Menu.Item>
    );
  }
}
