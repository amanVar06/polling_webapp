import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectError,
  setCurrentPoll,
  removeError,
  addError,
  selectCurrentPoll,
} from "../features/slices/rootSlice";

import Poll from "../components/Poll";
import ErrorMessage from "../components/ErrorMessage";
import { useParams } from "react-router-dom";

const Pollpage = () => {
  const error = useSelector(selectError);
  //   const poll = useSelector(selectCurrentPoll);
  const { id } = useParams();
  //   console.log(id);

  return (
    <div>
      <ErrorMessage error={error} />
      <Poll pollId={id} />
    </div>
  );
};

export default Pollpage;
