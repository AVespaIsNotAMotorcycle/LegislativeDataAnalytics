// Aesthetics: 
import React from "react";
import Sidebar from "react-sidebar";
import axios from "axios";
import { Link } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';

// Dependencies:
import Bills from "./chartGenerators/senate_bills";
import Committees from "./chartGenerators/senate_committees";
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
    this.showBills = () => { this.setState({ chart: "bills" }); };
    this.showCommittees = () => { this.setState({ chart: "committees" }); };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  onSetSidebarOpen = (open) => this.setState({ sidebarOpen: open });

  handleData = async (query, value = "") => {
    if (this.state.chart === "bills") {
      const url = "http://206.81.7.63:5000/info-apis/senate-info?name=".concat(query);

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
          <h2 className="rep-title">Representative Information</h2>
          {this.state.member === "" ? (
            <p>
              No results for
              {this.state.label}
            </p>
          ) : (
            <div className="rep-info">
              <h4 className="rep-name">{this.state.member.fullname}</h4>
              <small className="rep-details">
                <p>
                  District
                  {this.state.member.districtcode}
                </p>
              </small>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="rep-title">
            Committee Information
          </h2>
          <div className="rep-info">
            <h4 className="rep-name">
              {this.state.label}
            </h4>
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
        >
          <Link to="/data" className="return">
            <div className="clear">Senate</div>
            <div className="clear">Menu</div>
            <AiFillCaretDown />
          </Link>

          <div id="top" className="four-cell-layout">
            <div className="half">
              <a className="middle-option reps" onClick={this.showBills} href="#chartLocation">
                  <h1 className="white">
                    Bills/Represenative
                  </h1>
                  <h4 id="front-text">
                    See how many bills your representatives have put
                    <br />
                    on the floor over time and compare.
                  </h4>
              </a>
            </div>
  
            <div className="half">
              <a className="middle-option coms" onClick={this.showCommittees} href="#chartLocation">
                <h1 className="white">
                  Bills/Committee
                </h1>
                <h4 id="front-text">
                  See how many bills each committee in City Council
                  <br />
                  has put forward over time and compare.
                </h4>
              </a>
            </div>
          </div>

          <div className="full">
          {
              this.state.chart === "default" ? <div /> : (
                <a className="return" href="#top">
                  <div className="">Top</div>
                  <AiFillCaretDown />
                </a>
              )
            }
            <br />
            <h5 id="capital">
              {this.state.chart}
              :
            </h5>
            <br />
            {
              this.state.chart === "default" ? (
                <div></div>
              ) : ( <div className="divider" /> )
            }
            <br></br>
            <div id="chartLocation">
              {this.state.chart === "bills" ? (
                <Bills clickedLabel={this.handleData} />
              ) : (
                <div />
              )}
              {this.state.chart === "committees" ? (
                <Committees clickedLabel={this.handleData} />
              ) : (
                <div />
              )}
              {this.state.chart === "proximity" ? <Proximity /> : <div />}
            </div>
          </div>
        </Sidebar>
      </>
    );
  }
}
