import React, { Component } from 'react';
import './App.css';

import InfoBox from './components/InfoBox';
import MegaTest from './components/MegaTest';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      allResults: [],
      allWinNumbersAry : []
    };
  }

  componentWillMount() {
    fetch("https://data.ny.gov/resource/h6w8-42p9.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            allResults: result.slice(0,80),
            // allResults: result,
            allWinNumbersAry: result.map(data => data.winning_numbers.split(' '))
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, allResults } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Mega Testing</h1>
            </header>
            <div className="container">
              <InfoBox state = {this.state}/>
              <MegaTest state = {this.state}/>
            </div>
          </div>
        </div>        
      );
    }

    // return (
    //   <div className="container">
    //     <div className="App">
    //       <header className="App-header">
    //         <h1 className="App-title">Mega Testing</h1>
    //       </header>
    //       <div className="container">
    //         <InfoBox state = {this.state}/>
    //         <MegaTest state = {this.state}/>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

export default App;
