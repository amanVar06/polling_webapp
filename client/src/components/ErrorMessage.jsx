import React from "react";
import { connect } from "react-redux";

const ErrorMessage = ({ error }) => {
  return <div>{error && <div className="error">{error.message}</div>}</div>;
};

export default ErrorMessage;
