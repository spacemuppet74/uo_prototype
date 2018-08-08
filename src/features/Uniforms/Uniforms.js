import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Message, Dimmer, Loader, Card } from "semantic-ui-react";

import UniformCard from "./UnfiormCard/UniformCard";

@withRouter
@inject(rootstore => ({ uniforms: rootstore.store.uniformStore }))
@observer
export default class Uniforms extends Component {
  componentDidMount() {
    const { params } = this.props.match;
    this.props.uniforms.setSelectedDepartment(params);
  }
  render() {
    const { uniforms } = this.props;
    return (
      <div>
        {uniforms.loading && (
          <Dimmer active inverted>
            <Loader>Loading....</Loader>
          </Dimmer>
        )}

        {uniforms.isEmpty ? (
          <Message
            info
            icon="warning circle"
            header="Nothing to Display"
            content="Try a different category"
          />
        ) : (
          <div>
            <Card.Group centered itemsPerRow={5}>
              {uniforms.getUniforms.map(uniform => {
                return <UniformCard uniform={uniform} key={uniform.id} />;
              })}
            </Card.Group>
          </div>
        )}
      </div>
    );
  }
}
