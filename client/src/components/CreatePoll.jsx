import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPoll,
  removeError,
  addError,
} from "../features/slices/rootSlice";
import { call } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  async function createPoll({ question, options }) {
    try {
      const poll = await call("post", "polls", { question, options });
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
      setQuestion("");
      setOptions([""]);
      navigate(`/polls/${poll._id}`);
    } catch (err) {
      const error = err?.response?.data;
      dispatch(addError(error?.message));
    }
  }

  function addAnswer() {
    setOptions((prevState) => [...prevState, ""]);
  }

  function handleAnswer(e, index) {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  }

  function handleSubmit(e) {
    e.preventDefault();
    createPoll({ question, options });
  }

  const displayOptions = options.map((option, i) => (
    <div key={i}>
      <label className="form-label">option</label>
      <input
        className="form-input"
        type="text"
        value={option}
        key={i}
        onChange={(e) => handleAnswer(e, i)}
      />
    </div>
  ));

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="question">
        Question
      </label>
      <input
        className="form-input"
        type="text"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div className="container">{displayOptions}</div>
      <div className="buttons_center">
        <button className="button" type="button" onClick={addAnswer}>
          Add options
        </button>
        <button className="button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreatePoll;
