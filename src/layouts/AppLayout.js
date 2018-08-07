import React from "react";

import AppBar from "../features/appbar/Appbar";

export default ({ children, ...rest }) => {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  );
};
