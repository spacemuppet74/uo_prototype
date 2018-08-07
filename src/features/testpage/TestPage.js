import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Header, Dimmer, Loader } from "semantic-ui-react";

@inject(rootstore => ({ userstore: rootstore.store.userStore }))
@observer
export default class TestPage extends Component {
  render() {
    console.log("user store");
    const { userstore } = this.props;
    return (
      <div>
        <Dimmer active={userstore.loading} inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
        <Header as="h2" content="Test Page" />
        <pre>{JSON.stringify(userstore, null, 3)}</pre>
      </div>
    );
  }
}
