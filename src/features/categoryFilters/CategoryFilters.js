import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Menu } from "semantic-ui-react";

@inject(rootstore => ({ categories: rootstore.store.categoryStore }))
@observer
export default class CategoryFilters extends Component {
  componentWillUnmount = () => {
    this.props.categories.setActiveCategory(0);
  };

  render() {
    const { categories } = this.props;
    return (
      <Menu.Item>
        <Menu.Header>Category</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            key={0}
            name="All"
            active={categories.activeCategory === 0}
            onClick={() => categories.setActiveCategory(0)}
          />
          {categories.getCategories.map(category => (
            <Menu.Item
              key={category.id}
              name={category.title}
              active={categories.activeCategory === category.id}
              onClick={() => categories.setActiveCategory(category.id)}
            />
          ))}
        </Menu.Menu>
      </Menu.Item>
    );
  }
}
