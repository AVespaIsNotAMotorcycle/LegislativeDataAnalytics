import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Typography from '@mui/material/Typography';
import Calendar from './Calendar';

/* eslint react/destructuring-assignment: 1 */
/*
const options = {
  indexAxis: 'x',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Committees and Number of Bills Voted On',
    },
  },
  events: ['click', 'mousemove'],
  onClick: (event, item) => {
    if (item.length === 0) return; // <--- If the item is canvas and not a bar, dip

    // const indexForClick = item[0].index;
    // let dataForClick = event.chart.config._config.data.datasets[0].data[indexForClick];
    // let labelForClick = event.chart.config._config.data.labels[indexForClick];
  },
};
*/

export default class Committees extends React.Component {
  API_URL = 'http://206.81.7.63:5000/graph-apis/state-committee-bills/senate';

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
    const { getApiUrl } = this;
    const { startDate, endDate } = this.state;
    const url = getApiUrl(startDate, endDate);
    try {
      const response = await axios.get(url);
      this.setState({ apiData: response.data });
      this.parseData();
    } catch (error) {
      if (error.response) {
        console.error(`Error: Not Found - ${error.response.data}`); // Not Found
        console.error(`Error: ${error.response.status}`); // 404
      }
    }
  };

  parseData = () => {
    const committees = [];
    const votes = [];
    const { apiData } = this.state;
    apiData.forEach((obj) => {
      committees.push(obj.committeename);
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
        <div className="centeredDisplay">
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
                label: '# of Bills Voted On',
                backgroundColor: 'rgba(138, 182, 169, 0.9)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: this.state.votes,
              },
            ],
          }}
          options={{
            indexAxis: 'x',
            elements: {
              bar: {
                borderWidth: 2,
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
              title: {
                display: true,
                text: 'Committees and Number of Bills Voted On',
              },
            },
            events: ['click', 'mousemove'],
            onClick: (event, item) => {
              if (item.length === 0) return; // <--- If the item is canvas and not a bar, dip

              const idx = item[0].index;
              const value = event.chart.config.config.data.datasets[0].data[idx];
              const label = event.chart.config.config.data.labels[idx];
              const { clickedLabel } = this.props;
              clickedLabel(label, value);
            },
          }}
        />
        <button className="smolButton" type="button" onClick={this.fetchData}>Reset</button>
      </div>
    );
  }
}

Committees.propTypes = {
  clickedLabel: PropTypes.func.isRequired,
};
