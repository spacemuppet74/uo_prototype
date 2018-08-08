import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Grid } from "semantic-ui-react";

import Status from "../../features/StatusFilters/StatusFilters";

@inject(allStores => ({ approvals: allStores.store.approvalsStore }))
@observer
export default class Approvals extends Component {
  componentDidMount() {}
  render() {
    return (
      <Switch>
        <Route path="/approvals/:approvalId" render={() => <div>Bob 2</div>} />
        <Route
          exact
          path="/approvals"
          render={() => (
            <Grid>
              <Grid.Column width={3}>
                <Status title="Filter By" />
              </Grid.Column>
              <Grid.Column width={13}>Bob</Grid.Column>
            </Grid>
          )}
        />
      </Switch>
    );
  }
}
