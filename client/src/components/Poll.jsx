import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentPoll,
  setCurrentPoll,
  addError,
  removeError,
} from "../features/slices/rootSlice";
import { call } from "../services/api";
// import { Pie } from "react-chartjs-2";
// import Polls from "./Polls";
import Chart from "react-apexcharts";

// const color = () => {
//   return "#" + Math.random().toString(16).slice(2, 8);
// };

const Poll = ({ pollId }) => {
  const currentPoll = useSelector(selectCurrentPoll);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCurrentPoll(pollId) {
      try {
        const poll = await call("get", `polls/${pollId}`);
        dispatch(setCurrentPoll(poll));
        dispatch(removeError());
      } catch (err) {
        const error = err.response.data;
        dispatch(addError(error.message));
      }
    }

    getCurrentPoll(pollId);
  }, []);

  async function vote(pollId, data) {
    try {
      const poll = await call("post", `polls/${pollId}`, data);
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  }

  const answers =
    currentPoll.options &&
    currentPoll.options.map((option) => (
      <button
        className="button"
        onClick={() => vote(currentPoll._id, { answer: option.option })}
        key={option._id}
      >
        {option.option}
      </button>
    ));

  // console.log(answers);

  const chartData = {
    series: currentPoll.options.map((option) => option.votes),
    options: {
      labels: currentPoll.options.map((option) => option.option),
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      title: {
        text: currentPoll.question,
      },
    },
  };

  // const chartData = {
  //   labels: currentPoll.options.map((option) => option.option),
  //   datasets: [
  //     {
  //       label: currentPoll.question,
  //       backgroundColor: currentPoll.options.map((option) => color()),
  //       borderColor: "#323643",
  //       data: currentPoll.options.map((option) => option.votes),
  //     },
  //   ],
  // };

  return (
    <div>
      <h3 className="poll-title">{currentPoll?.question}</h3>
      <div className="button_center">{answers}</div>
      <div className="button_center">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={600}
        />
      </div>
    </div>
  );
};

export default Poll;
