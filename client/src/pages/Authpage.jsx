import { Navigate } from "react-router-dom";
import Auth from "../components/Auth";
import ErrorMessage from "../components/ErrorMessage";
import { useSelector } from "react-redux";
import { selectError, selectAuth } from "../features/slices/rootSlice";

const Authpage = ({ authType }) => {
  const error = useSelector(selectError);
  const auth = useSelector(selectAuth);
  if (auth.isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div>
      <Auth authType={authType} />
      <ErrorMessage error={error} />
    </div>
  );
};

export default Authpage;
