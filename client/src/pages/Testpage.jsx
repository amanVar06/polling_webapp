import React from "react";
import Polls from "../components/Polls";
import Poll from "../components/Poll";
import ErrorMessage from "../components/ErrorMessage";
import { useSelector } from "react-redux";
import { selectError, selectCurrentPoll } from "../features/slices/rootSlice";
import Auth from "../components/Auth";
import CreatePoll from "../components/CreatePoll";

const Testpage = () => {
  const error = useSelector(selectError);
  const currentPoll = useSelector(selectCurrentPoll);
  return (
    <div>
      <h1>UI Test Page</h1>

      <h2>Testing Error Component: </h2>
      <ErrorMessage error={error} />
      <hr />

      <h2>Testing Auth Component: </h2>
      <Auth authType="login" />
      <hr />

      {/* <h2>Testing Auth Component: </h2>
      <Auth authType="register" />
      <hr /> */}

      <h2>Testing Create Poll Component: </h2>
      <CreatePoll />
      <hr />

      <h2>Testing Polls Component: </h2>
      <Polls />
      <hr />

      <h2>Testing Poll Component: </h2>
      <Poll pollId={currentPoll._id} />
      <hr />
    </div>
  );
};

export default Testpage;
