import React from "react";
import Polls from "../components/Polls";
import Poll from "../components/Poll";
import ErrorMessage from "../components/ErrorMessage";
import { useSelector } from "react-redux";
import { selectError } from "../features/slices/rootSlice";

const Testpage = () => {
  const error = useSelector(selectError);
  return (
    <div>
      <ErrorMessage error={error} />
      <Poll />
      {/* <Polls /> */}
    </div>
  );
};

export default Testpage;
