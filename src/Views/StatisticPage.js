import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { fetchTrainings } from "./../Services/API";
const initialActivities = {
  trainings: [],
};

const StatisticPage = () => {
  const [state, setstate] = useState(initialActivities);
  useEffect(() => {
    fetchAllTrainings();
  }, []);
  ///fetch all the traings
  const fetchAllTrainings = () => {
    fetchTrainings().then((response) => {
      let _trainings = response;
      _trainings = _trainings.map((training) => {
        training.customerName = `${training.customer.firstname} , ${training.customer.lastname}`;
        training.traniningId = training.id;
        training.id = training.customer.id + training.date;
        training.date = moment(training.date).format("LLL");
        return training;
      });
      if (_trainings.length > 0) {
        setstate((prevState) => ({
          ...prevState,
          trainings: _trainings,
        }));
      }
    });
  };
  const renderBarChart = (data) => {
    return (
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="activity" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="duration" fill="#8884d8" barSize={30} />
      </BarChart>
    );
  };
  function getStatData() {
    let _map = new Map();
    state.trainings.forEach((ele) => {
      if (_map.get(ele.activity)) {
        let duration = _map.get(ele.activity);
        duration = ele.duration + duration;
        _map.set(ele.activity, duration);
      } else {
        _map.set(ele.activity, ele.duration);
      }
    });
    const data = [];
    _map.forEach((values, key) => {
      data.push({ activity: key, duration: values });
    });
    console.log(data);
    return data;
  }

  return (
    <div>
      <h2>Statistic Page</h2>
      <div>{renderBarChart(getStatData())}</div>
    </div>
  );
};

export default StatisticPage;
