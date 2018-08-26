import React, { Component } from 'react';
import Utility from './Utility';

class MegaTest extends Component {
 
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    componentDidMount() {
    }


    render() {
      const { error, isLoaded, allResults, allWinNumbersAry } = this.props.state;
      // console.log("render22", error, isLoaded, allResults);
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <table className="resultBigTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Mega Ball</th>
                <th>Winning Number</th>
                {/* <th>Multipier</th> */}
              </tr>
            </thead>
            <tbody>
            {allResults.map((result,i) => (
              <tr key={i}>
                <td>{Utility.convertDate(result.draw_date)}</td>
                <td>{Utility.getDay(result.draw_date, 'short')}</td>
                <td><div className="ball powerBall">{result.mega_ball}</div></td>
                <td>
                  {allWinNumbersAry[i].map((number, j) => <span className="ball" key={j}>{number}</span>)}
                  {/* {result.winning_numbers} */}
                </td>
                {/* <td>{result.multiplier}</td> */}
              </tr>
            ))}
            </tbody>
          </table>
        );
      }
    }
  }

  export default MegaTest;