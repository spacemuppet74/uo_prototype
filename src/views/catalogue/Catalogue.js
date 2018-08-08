import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Route, Switch } from "react-router-dom";
import { Grid, Menu, Container } from "semantic-ui-react";

import Uniforms from "../../features/Uniforms/Uniforms";
import UniformDetails from "../../features/Uniforms/UniformDetails/UniformDetails";
import GenderFilters from "../../features/genderFilters/GenderFilters";
import CategoryFilters from "../../features/categoryFilters/CategoryFilters";

@inject(rootstore => ({ uniforms: rootstore.store.uniformStore }))
@observer
export default class Catalogue extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/catalogue/:depart/:uniformId"
          component={UniformDetails}
        />
        <Route
          exact
          path="/catalogue/:depart"
          render={props => (
            <Grid>
              <Grid.Column computer={3} tablet={2}>
                <Menu vertical>
                  <GenderFilters />
                  <CategoryFilters />
                </Menu>
              </Grid.Column>
              <Grid.Column computer={13} tablet={14}>
                <Uniforms />
              </Grid.Column>
            </Grid>
          )}
        />
      </Switch>
    );
  }
}
