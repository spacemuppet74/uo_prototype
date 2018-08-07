import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {
  Card,
  Grid,
  Message,
  Segment,
  Dimmer,
  Loader
} from "semantic-ui-react";

import UniformCard from "./UnfiormCard/UniformCard";

@inject(rootstore => ({ uniformStore: rootstore.store.uniformStore }))
@observer
export default class Catalogue extends Component {
  componentDidMount() {
    this.props.uniformStore.setSelectedDepartment(this.props.match.params);
    this.props.uniformStore.fetchUniforms();
  }
  render() {
    const { uniformStore } = this.props;
    console.log(uniformStore.getUniforms);
    return (
      <Grid>
        <Grid.Column width={3}>
          <Segment>Filters</Segment>
        </Grid.Column>
        <Grid.Column width={13}>
          {uniformStore.loading && (
            <Dimmer active inverted>
              <Loader>Loading....</Loader>
            </Dimmer>
          )}

          {uniformStore.isEmpty ? (
            <Message
              info
              icon="warning circle"
              header="Nothing to Display"
              content="Try a different category"
            />
          ) : (
            <Card.Group centered itemsPerRow={5}>
              {uniformStore.getUniforms.map(uniform => {
                return <UniformCard uniform={uniform} key={uniform.id} />;
              })}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
