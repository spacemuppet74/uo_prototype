import React from "react";
import { Header } from "semantic-ui-react";

const DisplayStatus = ({ status }) => {
  let labelColour;

  if (status === "approved") {
    labelColour = "green";
  } else if (status === "pending") {
    labelColour = "orange";
  } else if (status === "declined") {
    labelColour = "red";
  } else if (status === "ordered") {
    labelColour = "blue";
  } else {
    labelColour = "black";
  }

  return (
    <Header as="h4" color={labelColour}>
      {status}
    </Header>
  );
};

export default DisplayStatus;
