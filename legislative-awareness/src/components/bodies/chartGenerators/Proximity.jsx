import React from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Select from 'react-select';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar, Scatter } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  events: ["click", "mousemove"],
};

/* eslint no-bitwise: 1 */
export default class Proximity extends React.Component {
  static stringToColour = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xFF;
      colour += ('00'.concat(value.toString(16)).substr(-2));
    }
    colour += '90';
    return colour;
  };

  API_URL = "http://206.81.7.63:5000/graph-apis/proximity-calculation";

  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      datasets: [],
      refs: [],
      targets: [],
    };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    const url = this.getApiUrl(this.state.refs, this.state.targets);
    try {
      const response = await axios.get(url);
      this.setState({ apiData: response.data }, () => { this.parseData(); });
    } catch (error) {
      console.log(error);
    }
  };

  nameToColor = (name) => this.stringToColour(name);

  parseData = () => {
    const datasets = [];
    const labels = [];

    this.state.refs.forEach((obj) => {
      labels.push(obj.label);
    });
    const scatter = (this.state.refs.length === 2);

    this.state.apiData.forEach((obj) => {
      if (scatter) {
        datasets.push({
          label: obj.repName,
          data: [{ x: obj.coordinates[0], y: obj.coordinates[1] }],
          backgroundColor: this.nameToColor(obj.repName),
        });
      } else {
        const ncords = obj.coordinates;
        for (let i = 0; i < ncords.length; i += 1) {
          if (ncords[i] !== 0) {
            ncords[i] = 1 / ncords[i];
          } else {
            ncords[i] = 1;
          }
        }
        datasets.push({
          label: obj.repName,
          data: ncords,
          backgroundColor: this.nameToColor(obj.repName),
        });
      }
    });
    this.setState({ datasets }, () => {});
  };

  getApiUrl = (refs, targets) => {
    if (!refs && !targets) {
      return this.API_URL;
    }
    let r = "refs[]=";
    for (let i = 0; i < refs.length; i += 1) {
      r += refs[i].value.split(' ').join('_');
      if (i !== refs.length - 1) { r += ','; }
    }
    let t = "targets[]=";
    for (let i = 0; i < targets.length; i += 1) {
      t += targets[i].value.split(' ').join('_');
      if (i !== targets.length - 1) { t += ','; }
    }
    return `${this.API_URL}?${r}&${t}`;
  };

  handleRefChange = (refs) => {
    this.setState({ refs }, () => {
      this.fetchData();
    });
  };

  handleTargetChange = (targets) => {
    this.setState({ targets }, () => {
      this.fetchData();
    });
  };

  render() {

    const vn = [
      {votepersonname: "Una Clarke"},
      {votepersonname: "Daniel Dromm "},
      {votepersonname: "Diana Reyna"},
      {votepersonname: "Guillermo Linares"},
      {votepersonname: "Victor L. Robles"},
      {votepersonname: "David Yassky"},
      {votepersonname: "Jose M. Serrano"},
      {votepersonname: "Kenneth K. Fisher"},
      {votepersonname: "Alphonse Stabile"},
      {votepersonname: "Mark S. Weprin"},
      {votepersonname: "David G. Greenfield"},
      {votepersonname: "Eric A. Ulrich"},
      {votepersonname: "G. Oliver Koppell"},
      {votepersonname: "Michael E. McMahon"},
      {votepersonname: "Sheldon S. Leffler"},
      {votepersonname: "Fernando Cabrera "},
      {votepersonname: "Betsy Gotbaum"},
      {votepersonname: "Domenic M. Recchia, Jr."},
      {votepersonname: "Stephen J. Fiala"},
      {votepersonname: "Deborah L. Rose"},
      {votepersonname: "Daniel R. Garodnick"},
      {votepersonname: "Annabel Palma"},
      {votepersonname: "Bill Perkins"},
      {votepersonname: "Margaret S. Chin"},
      {votepersonname: "Rosie Mendez"},
      {votepersonname: "Daniel J. Halloran III"},
      {votepersonname: "Robert Jackson"},
      {votepersonname: "Karen Koslowitz"},
      {votepersonname: "Mark Green"},
      {votepersonname: "Lloyd Henry"},
      {votepersonname: "Adolfo Carrion"},
      {votepersonname: "Madeline T. Provenzano"},
      {votepersonname: "Lewis A. Fidler"},
      {votepersonname: "Thomas V. Ognibene"},
      {votepersonname: "Pedro G. Espada"},
      {votepersonname: "Simcha Felder"},
      {votepersonname: "Yvette D. Clarke"},
      {votepersonname: "Helen D. Foster"},
      {votepersonname: "Michael C. Nelson"},
      {votepersonname: "Leroy G. Comrie, Jr."},
      {votepersonname: "Hiram Monserrate"},
      {votepersonname: "Lucy Cruz"},
      {votepersonname: "Jumaane D. Williams"},
      {votepersonname: "Walter L. McCaffrey"},
      {votepersonname: "Eva S. Moskowitz"},
      {votepersonname: "Annette M. Robinson"},
      {votepersonname: "Angel Rodriguez"},
      {votepersonname: "Inez E. Dickens"},
      {votepersonname: "John C. Liu"},
      {votepersonname: "Letitia James"},
      {votepersonname: "Miguel Martinez"},
      {votepersonname: "Tony Avella"},
      {votepersonname: "James E. Davis"},
      {votepersonname: "Melissa Mark-Viverito"},
      {votepersonname: "Martin J. Golden"},
      {votepersonname: "Maria Del Carmen Arroyo"},
      {votepersonname: "Joseph P. Addabbo, Jr."},
      {votepersonname: "Margarita Lopez"},
      {votepersonname: "Joel Rivera"},
      {votepersonname: "June M. Eisland"},
      {votepersonname: "Andrew J. Lanza"},
      {votepersonname: "Peter A. Koo"},
      {votepersonname: "Alan J. Gerson"},
      {votepersonname: "Maria Baez"},
      {votepersonname: "Herbert E. Berman"},
      {votepersonname: "Jose Rivera"},
      {votepersonname: "Bill De Blasio"},
      {votepersonname: "Stanley E. Michels"},
      {votepersonname: "Sara M. Gonzalez"},
      {votepersonname: "Archie W. Spigner"},
      {votepersonname: "Howard L.  Lasher"},
      {votepersonname: "Noach Dear"},
      {votepersonname: "Kenneth C. Mitchell"},
      {votepersonname: "James F. Gennaro"},
      {votepersonname: "Gale A. Brewer"},
      {votepersonname: "Helen M. Marshall"},
      {votepersonname: "David I. Weprin"},
      {votepersonname: "Charles Barron"},
      {votepersonname: "James S. Oddo"},
      {votepersonname: "Helen Sears"},
      {votepersonname: "Ydanis A. Rodriguez"},
      {votepersonname: "Allan W. Jennings, Jr."},
      {votepersonname: "Juanita E. Watkins"},
      {votepersonname: "Mary Pinkett"},
      {votepersonname: "John D. Sabini"},
      {votepersonname: "Julia Harrison"},
      {votepersonname: "Julissa Ferreras-Copeland"},
      {votepersonname: "Vincent Ignizio"},
      {votepersonname: "Larry B. Seabrook"},
      {votepersonname: "Thomas White, Jr."},
      {votepersonname: "Christine C. Quinn"},
      {votepersonname: "Stephen DiBrienza"},
      {votepersonname: "Thomas White"},
      {votepersonname: "Elizabeth S. Crowley"},
      {votepersonname: "Stephen T. Levin"},
      {votepersonname: "Kendall Stewart"},
      {votepersonname: "Pedro Espada, Jr."},
      {votepersonname: "Martin Malave-Dilan"},
      {votepersonname: "Kathryn E. Freed"},
      {votepersonname: "Philip Reed"},
      {votepersonname: "Jerome X. O'Donovan"},
      {votepersonname: "James Vacca"},
      {votepersonname: "Peter F. Vallone, Jr."},
      {votepersonname: "Michael J. Abel"},
      {votepersonname: "Anthony Como"},
      {votepersonname: "Gifford Miller"},
      {votepersonname: "Darlene Mealy"},
      {votepersonname: "Dennis P. Gallagher"},
      {votepersonname: "Wendell Foster"},
      {votepersonname: "Mathieu Eugene"},
      {votepersonname: "Brad S. Lander"},
      {votepersonname: "Lawrence A. Warden"},
      {votepersonname: "Peter F. Vallone"},
      {votepersonname: "Melinda R. Katz"},
      {votepersonname: "Ronnie M. Eldridge"},
      {votepersonname: "Vincent J. Gentile"},
      {votepersonname: "Eric N. Gioia"},
      {votepersonname: "Erik Martin Dilan"},
      {votepersonname: "Jessica S. Lappin"},
      {votepersonname: "Priscilla A. Wooten"},
      {votepersonname: "Albert Vann"},
      {votepersonname: "James Sanders, Jr."},
      {votepersonname: "Tracy L. Boyland"},
      {votepersonname: "James G. Van Bramer"},
      {votepersonname: "Morton Povman"},
    ];

    const selectRefsOptions = [];

    for (let i = 0; i < vn.length; i += 1) {
      selectRefsOptions.push({value: vn[i].votepersonname, label: vn[i].votepersonname});
    }

    const selectTargetsOptions = selectRefsOptions;

    let graph;
    if (this.state.refs.length <= 2) {
      graph = <Scatter data={this.state} options={options} />;
    } else if (this.state.datasets.length !== 0) {
      if (this.state.datasets[0].data.length > 2) { graph = <Radar data={this.state} />; }  
    }

    return (
      <div>
        <Typography variant="h6" component="div" gutterBottom>
          Select at least two representatives to preview data
        </Typography>
        <div>
          <div className="proximity-dropdown-div">
            <h4>Reference representatives</h4>
            <Select isMulti options={selectRefsOptions} onChange={(e) => this.handleRefChange(e)} />
          </div>
          <div className="proximity-dropdown-div">
            <h4>Representatives to be compared</h4>
            <Select
              isMulti
              options={selectTargetsOptions}
              onChange={(e) => this.handleTargetChange(e)}
            />
          </div>
        </div>
        <div>
          {graph}
        </div>
      </div>
    );
  }
}
