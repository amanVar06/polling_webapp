import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div>{error.message && <div className="error">{error.message}</div>}</div>
  );
};

export default ErrorMessage;
