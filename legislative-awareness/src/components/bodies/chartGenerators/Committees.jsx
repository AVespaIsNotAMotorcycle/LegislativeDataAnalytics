import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Typography from "@mui/material/Typography";
import Calendar from "./Calendar";

export default class Committees extends React.Component {
  API_URL = "http://206.81.7.63:5000/graph-apis/committee-bills";

  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      committees: [],
      votes: [],
      startDate: null,
      endDate: null,
    };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    const url = this.getApiUrl(this.state.startDate, this.state.endDate);
    try {
      const response = await axios.get(url);
      this.setState({ apiData: response.data });
      this.parseData();
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  parseData = () => {
    const committees = [];
    const votes = [];

    this.state.apiData.forEach((obj) => {
      committees.push(obj.matterbodyname);
      votes.push(obj.numofbills);
    });

    this.setState({ committees, votes });
  };

  getApiUrl = (start, end) => {
    let { startDate } = this.state;
    let { endDate } = this.state;
    if (!startDate) { startDate = '2021-01-01'; }
    if (!endDate) { endDate = new Date().toISOString().slice(0, 10); }
    if (!start && !end) {
      return this.API_URL;
    }
    return `${this.API_URL}?startDate=${start}&endDate=${end}`;
  };

  handleFromDate = (startDate) => {
    this.setState({ startDate });
    this.fetchData();
  };

  handleToDate = (endDate) => {
    this.setState({ endDate });
    this.fetchData();
  };

  render() {
    return (
      <div className="full">
        <div className="centered-display">
          <Typography variant="h6" component="div" gutterBottom>
            Select a range of dates to preview data
          </Typography>
          <Calendar from={this.handleFromDate} to={this.handleToDate} />
        </div>
        <Bar
          data={{ 
            labels: this.state.committees,
            datasets: [
              {
                label: "# of Bills Voted On",
                backgroundColor: "rgba(138, 182, 169, 0.9)",
                // linear-gradient( rgba(138, 182, 169, 0.5), rgba(255, 255, 255, 0) )
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: this.state.votes,
              },
            ],
          }}
          options={{
            indexAxis: "x",
            elements: {
              bar: {
                borderWidth: 2,
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: "right",
              },
              title: {
                display: true,
                text: "Committees and Number of Bills Voted On",
              },
            },
            events: ["click", "mousemove"],
          }}
        />
        <button className="smolButton" type="button" onClick={this.fetchData}>Reset</button>
      </div>
    );
  }
}
