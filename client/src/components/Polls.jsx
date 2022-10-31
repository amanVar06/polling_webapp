import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPolls,
  removeError,
  selectPolls,
  addError,
  setCurrentPoll,
  selectAuth,
} from "../features/slices/rootSlice";
import { call } from "../services/api";
import { useNavigate } from "react-router-dom";

const Polls = () => {
  const dispatch = useDispatch();
  const polls = useSelector(selectPolls);
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  // console.log(polls);

  useEffect(() => {
    async function getPolls() {
      try {
        const polls = await call("get", `polls`);
        dispatch(setPolls(polls));
        dispatch(removeError());
      } catch (err) {
        const error = err.response.data;
        dispatch(addError(error.message));
      }
    }

    getPolls();
  }, []);

  async function getPolls() {
    try {
      const polls = await call("get", `polls`);
      dispatch(setPolls(polls));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  }

  async function getUserPolls() {
    try {
      const polls = await call("get", "polls/user");
      dispatch(setPolls(polls));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  }

  // async function getCurrentPoll(pollId) {
  //   try {
  //     const poll = await call("get", `polls/${pollId}`);
  //     dispatch(setCurrentPoll(poll));
  //     dispatch(removeError());
  //   } catch (err) {
  //     const error = err.response.data;
  //     dispatch(addError(error.message));
  //   }
  // }

  const handleClick = (id) => {
    navigate(`/polls/${id}`);
  };

  // const handleClick = (id) => {
  //   getCurrentPoll(id);
  // };

  const allPolls = polls?.map((poll) => (
    <li onClick={() => handleClick(poll._id)} key={poll._id}>
      {poll?.question}
    </li>
  ));

  //   useEffect(() => {
  //     async function getUserPolls() {
  //       try {
  //         const polls = await call("get", `polls/user`);
  //         dispatch(setPolls(polls));
  //         dispatch(removeError());
  //       } catch (err) {
  //         const error = err.response.data;
  //         dispatch(addError(error.message));
  //       }
  //     }

  //     getUserPolls();
  //   }, []);

  return (
    <div>
      {auth.isAuthenticated && (
        <div className="button_center">
          <button className="button" onClick={getPolls}>
            All Polls
          </button>
          <button className="button" onClick={getUserPolls}>
            My Polls
          </button>
        </div>
      )}
      <ul className="polls">{allPolls}</ul>
    </div>
  );
};

export default Polls;
