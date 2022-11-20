// Aesthetics:
import React from "react";
import Sidebar from "react-sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";

// Dependencies:
import Activeness from "./chartGenerators/Activeness";
import Bills from "./chartGenerators/Bills";
import Committees from "./chartGenerators/Committees";
import Proximity from "./chartGenerators/Proximity";
import Navigation from "./DataNavbar";
import "./layout.css";

export default class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: "default",
      sidebarOpen: false,
      label: "",
      value: 0,
      member: {},
    };
    this.showActiveness = () => { this.setState({ chart: "activeness" }); };
    this.showBills = () => { this.setState({ chart: "bills" }); };
    this.showCommittees = () => { this.setState({ chart: "committees" }); };
    this.showProximity = () => { this.setState({ chart: "proximity" }); };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleSidebarData = this.handleSidebarData.bind(this);
  }

  onSetSidebarOpen = (open) => this.setState({ sidebarOpen: open });

  handleSidebarData = async (query, value = "") => {
    if (this.state.chart === "bills") {
      const url = "http://206.81.7.63:5000/info-apis/council-member-info?name=".concat(query);

      try {
        const response = await axios.get(url);
        this.setState({
          member: response.data,
          label: query,
          sidebarOpen: true,
        });
      } catch (error) {
      }
    } else if (this.state.chart === "committees") {
      this.setState({
        label: query,
        value,
        sidebarOpen: true,
      });
    }
  };

  render() {
    const sidebarContent = (
      this.state.chart === "bills" ? (
        <div>
          <br />
          <br />
          <h2 className="rep-title">Representative Information</h2>
          {this.state.member === "" ? (
            <p>
              No results for 
              {this.state.label}
            </p>
          ) : (
            <div className="rep-info">
              <h4 className="rep-name">{this.state.member.name}</h4>
              <small className="rep-details">
                <p>
                  {this.state.member.politicalparty}
                </p>
                <p>
                  District
                  {this.state.member.district}
                </p>
                <p>
                  {this.state.member.borough}
                </p>
              </small>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="rep-title">Committee Information</h2>
          <div className="rep-info">
            <h4 className="rep-name">{this.state.label}</h4>
            <small className="rep-details">
              <p>
                {this.state.value}
                bills passed.
              </p>
            </small>
          </div>
        </div>
      ));

    return (
      <>
        <Navigation className="full" />
        <Sidebar
          sidebar={sidebarContent}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          pullRight
          styles={{ sidebar: { background: "white", padding: "1rem" } }}
          className="centered-display"
        >
          <Link to="/data" className="return">
            <div className="clear">City</div>
            <div className="clear">Menu</div>
            <AiFillCaretDown />
          </Link>

          <div id="top" className="four-cell-layout">
            <div className="corner">
              <a
                className="option reps"
                onClick={this.showBills}
                href="#chartLocation"
              >
                <h1 className="white">Bills/Represenative</h1>
                <h4 id="front-text">
                  See how many bills your representatives have put
                  <br></br>
                  on the floor over time and compare.
                </h4>
              </a>
            </div>

            <div className="corner">
              <a
                className="option coms"
                onClick={this.showCommittees}
                href="#chartLocation"
              >
                <h1 className="white">Bills/Committee</h1>
                <h4 id="front-text">
                  See how many bills each committee in City Council
                  <br></br>
                  has put forward over time and compare.
                </h4>
              </a>
            </div>

            <div className="corner">
              <a
                className="option prox"
                onClick={this.showProximity}
                href="#chartLocation"
              >
                <h1 className="white">
                  Voting Proximity Between Representatives
                </h1>
                <h4 id="front-text">
                  Compare the similarity of your representatives using voting
                  data.
                </h4>
              </a>
            </div>

            <div className="corner">
              <a
                className="option comp"
                onClick={this.showActiveness}
                href="#chartLocation"
              >
                <h1 className="white">Compare Representative Perfomance</h1>
                <h4 id="front-text">
                  Compare your representatives activity against others to see
                  how active they&aposve been.
                </h4>
              </a>
            </div>
          </div>

          <div className="full">
            {this.state.chart === "default" ? (
              <div />
            ) : (
              <a className="return" href="#top">
                <div className="">Top</div>
                <AiFillCaretDown />
              </a>
            )}
            <br />
            <h5 id="capital">
              {this.state.chart}
              :
            </h5>
            <br></br>
            {this.state.chart === "default" ? (
              <div></div>
            ) : (
              <div className="divider" />
            )}
            <br></br>
            <div id="chartLocation">
              {this.state.chart === "bills" ? (
                <Bills clickedLabel={this.handleSidebarData} />
              ) : (
                <div />
              )}
              {this.state.chart === "committees" ? (
                <Committees clickedLabel={this.handleSidebarData} />
              ) : (
                <div />
              )}
              {this.state.chart === "activeness" ? <Activeness /> : <div />}
              {this.state.chart === "proximity" ? <Proximity /> : <div />}
            </div>
          </div>
        </Sidebar>
      </>
    );
  }
}
