import React from "react";
import format from "date-fns/format";

const DisplayDate = ({ date }) => {
  return <span>{format(date, "DD/MM/YYYY")}</span>;
};

export default DisplayDate;
