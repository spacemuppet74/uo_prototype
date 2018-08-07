import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Dimmer, Loader, Card, Image, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

@inject(rootstore => ({
  userStore: rootstore.store.userStore,
  departments: rootstore.store.departmentStore
}))
@observer
export default class Home extends Component {
  componentDidMount() {
    this.props.departments.loadDepartments();
  }

  render() {
    const { userStore, departments } = this.props;
    const { currentUser } = userStore;

    if (userStore.loading || departments.loading) {
      return (
        <Dimmer active={userStore.loading} inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
      );
    }

    return (
      <div>
        <Message
          warning
          icon="warning"
          hidden={currentUser.isStaff}
          header="You must be login, using your windows account to order uniforms"
          content="You can continue to browse the uniforms but you won't be able to order. To order please log off and back on using your windows account."
        />
        <Card.Group itemsPerRow={6} centered>
          {departments.getDepartments.map(department => (
            <Card
              as={Link}
              to={`/catalogue/${department.id}`}
              key={department.id}
            >
              <Image src={department.image} />
              <Card.Content>
                <Card.Header>{department.title}</Card.Header>
                <Card.Meta>{department.description}</Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}
