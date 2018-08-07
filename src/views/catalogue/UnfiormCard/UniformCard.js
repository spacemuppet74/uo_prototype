import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

const UniformCard = ({ uniform, match }) => {
  return (
    <Card>
      <Image src={uniform.image} fluid />
      <Card.Content>
        <Card.Header>{uniform.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          color="blue"
          fluid
          as={Link}
          to={`${match.url}/${uniform.uniformId}`}
        >
          View
        </Button>
      </Card.Content>
    </Card>
  );
};

export default withRouter(UniformCard);
