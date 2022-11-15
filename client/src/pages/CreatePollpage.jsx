import { useSelector } from "react-redux";
import { selectError, selectAuth } from "../features/slices/rootSlice";
import ErrorMessage from "../components/ErrorMessage";
import { Navigate } from "react-router-dom";
import CreatePoll from "../components/CreatePoll";

const CreatePollpage = () => {
  const error = useSelector(selectError);
  const auth = useSelector(selectAuth);

  console.log(auth);
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div>
      <ErrorMessage error={error} />
      <CreatePoll />
    </div>
  );
};

export default CreatePollpage;
