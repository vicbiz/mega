import React, { Component } from 'react';

class InfoBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            allResults: props.state.allResults, // Passed from App.js
            megaBallNumbers: [],
            allMegaballWithCountSortedByKey: [],
            allMegaballWithCounntSortedByCount: [],
            winNumbers: [],
            allNumbersWithCountSortedByKey: [],
            allNumberCountsSortedByCount: [],
            pickPickCount: 5,
            pickedTop10: [],
            pickedBtm10: [],
            // pickedTop10: [{powerball:'', pickedNumbers:[]}],
            // pickedBtm10: [{powerball:'', pickedNumbers:[]}],
        }
    }

    updateSort = sortBy => {
        switch(sortBy){
            case 'pn' : this.setState({megaBallNumbers: this.state.allMegaballWithCountSortedByKey}); break ;
            case 'pc' : this.setState({megaBallNumbers: this.state.allMegaballWithCounntSortedByCount}); break ;
            case 'nn' : this.setState({winNumbers: this.state.allNumbersWithCountSortedByKey}); break ;
            case 'nc' : this.setState({winNumbers: this.state.allNumberCountsSortedByCount}); break ;
            default   : break;
        }
    }    

    quickPick = pickBy => {
        let megaNumbers = [];
        let winNumbers  = [];
        const pickPickCount = this.state.pickPickCount;

        switch(pickBy){
            case 'top10' : 
                megaNumbers = this.state.allMegaballWithCounntSortedByCount.slice(0,10);
                winNumbers  = this.state.allNumberCountsSortedByCount.slice(0,10);
                this.setState({ pickedTop10 : pickNumbers(pickBy) });
                break;
            case 'btm10' : 
                megaNumbers = this.state.allMegaballWithCounntSortedByCount.slice(megaNumbers.length-10);
                winNumbers  = this.state.allNumberCountsSortedByCount.slice(winNumbers.length-10);
                this.setState({ pickedBtm10 : pickNumbers(pickBy) });
                break;
            case 'topReset' : 
                this.setState({ pickedTop10 : [] });
                break;
            case 'btmReset' : 
                this.setState({ pickedBtm10 : [] });
                break;
            default   : break;
        }
        // console.log("megaNumbers",megaNumbers,"winNumbers",winNumbers);

        function pickNumbers(pickBy){
            let allPickedArray = [];
            for(let i=0; i<pickPickCount; i++){
                let pickedObj = {};
                for(let j=0; j<5; j++){
                    let tempMega = Math.floor(Math.random() * Math.floor(10));
                    let pickedResult = [];
                    for(let k=0; k<5; k++){
                        let tempNumber = Math.floor(Math.random() * Math.floor(10));
                        pickedResult.push(winNumbers[tempNumber].number);
                    }
                    Object.assign(pickedObj, {"megaBall" : megaNumbers[tempMega].powerball, "pickedNumbers" : pickedResult});
                }
                // console.log("pickedObj",pickedObj);
                allPickedArray.push(pickedObj);
            }
            console.log("allPickedArray",allPickedArray);
            return allPickedArray;
        }
    }    



    componentDidMount(){

        const allResults = this.state.allResults;
        // console.log("allResults", allResults);

        const allWinPowerBallsArray = allResults.map(result => result.mega_ball);
        const allWinNumbersArray = allResults.map(data => data.winning_numbers.split(' '))
        // console.log("allWinPowerBallsArray",allWinPowerBallsArray.length,allWinPowerBallsArray);

        /*
        // Eliminate Duplicates... using Set
        const allWinPowerBallsArraySet = Array.from(new Set(allWinPowerBallsArray));
        console.log("allWinPowerBallsArraySet",allWinPowerBallsArraySet.length,allWinPowerBallsArraySet);
        */

        const getCount = arrayNumbers => arrayNumbers.reduce( (a, b) => Object.assign( a, {[b]: (a[b] || 0) + 1} ), {} )

        let allPowerBallCounts = getCount(allWinPowerBallsArray)

        // Fill up 0... 
        for(let i=1; i<26; i++){
            let tempKey = i<10 ? '0'+i : ''+i;
            !allPowerBallCounts[tempKey] ? Object.assign(allPowerBallCounts, {[tempKey] : 0}) : '';
            // console.log("tempKey",tempKey, !allPowerBallCounts[tempKey]);
        }


        // console.log("allPowerBallCounts",allPowerBallCounts, "length");


        const allMegaballWithCountSortedByKey = Object.keys(allPowerBallCounts)
            .sort((a,b) => a - b)
            .map(item => { return {powerball : item, wincount : allPowerBallCounts[item]} });
        this.setState({allMegaballWithCountSortedByKey: allMegaballWithCountSortedByKey})
        
        const allMegaballWithCounntSortedByCount = Object.keys(allPowerBallCounts)
            .sort((a,b) => allPowerBallCounts[b] - allPowerBallCounts[a])
            .map(item => { return {powerball : item, wincount : allPowerBallCounts[item]}});
        this.setState({allMegaballWithCounntSortedByCount: allMegaballWithCounntSortedByCount})
        this.setState({megaBallNumbers: allMegaballWithCountSortedByKey})


        let allNumbersArray = allWinNumbersArray.reduce((a, b) => [...a, ...b], []);
        let allNumbersWithCount = getCount(allNumbersArray)
        let allNumbersWithCountSortedByKey = Object.keys(allNumbersWithCount)
            .sort((a,b) => a - b)
            .map(item => { return {number : item, count : allNumbersWithCount[item]} });
        this.setState({allNumbersWithCountSortedByKey: allNumbersWithCountSortedByKey})

        let allNumberCountsSortedByCount = Object.keys(allNumbersWithCount)
            .sort((a,b) => allNumbersWithCount[b] - allNumbersWithCount[a])
            .map(item => { return {number : item, count : allNumbersWithCount[item]}});
        this.setState({allNumberCountsSortedByCount: allNumberCountsSortedByCount})

        this.setState({winNumbers: allNumbersWithCountSortedByKey})
    }


    render() {

        return (
            <div>
                <h1>Information</h1>
                <div className="infoBlock">
                    <div className="row infoTitleWrap">
                        <div className="col-8 infoTitleWrap">
                            <h4>Mega Ball Number Status (Last {this.state.allResults.length} Draws)</h4>
                        </div>
                        <div className="col-4 aRight">
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => this.updateSort('pn')}>Sort By Number</button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => this.updateSort('pc')}>Sort By Count</button>
                        </div>
                    </div>
                    <div className="row infoContentWrap">
                        <div className="col">
                            {this.state.megaBallNumbers.map((result,i) => (
                                <div className="ballWrap" key={i}><div className="ball powerBall">{result.powerball}</div><div className="winCount">{result.wincount}</div></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="infoBlock">
                    <div className="row infoTitleWrap">
                        <div className="col-8">
                            <h4>Winning Number Status</h4>
                        </div>
                        <div className="col-4 aRight">
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => this.updateSort('nn')}>Sort By Number</button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => this.updateSort('nc')}>Sort By Count</button>
                        </div>
                    </div>
                    <div className="row infoContentWrap">
                        <div className="col">
                            {this.state.winNumbers.map((result,i) => (
                                <div className="ballWrap" key={i}><div className="ball">{result.number}</div><div className="winCount">{result.count}</div></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="infoBlock pickedResult">
                    <div className="row infoTitleWrap">
                        <div className="col-8">
                            <h4>Quick {this.state.pickPickCount} Pick based on Top 10 numbers</h4>
                        </div>
                        <div className="col-4 aRight">
                            <button type="button" className="btn btn-success btn-sm" onClick={() => this.quickPick('top10')}>Qick Pick</button>
                            <button type="button" className="btn btn-warning btn-sm" onClick={() => this.quickPick('topReset')}>Reset</button>
                        </div>
                    </div>
                    <div className="row infoContentWrap">
                        <div className="col" id="topResult">
                            {this.state.pickedTop10.map((result,i) => (
                                <div key={i}>
                                    <div className="ballWrap"><div className="ball powerBall">{result.megaBall}</div></div>
                                    {result.pickedNumbers.map((resultNumber,j) => (
                                        <div className="ballWrap" key={j}><div className="ball">{resultNumber}</div></div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="infoBlock pickedResult">
                    <div className="row infoTitleWrap">
                        <div className="col-8">
                            <h4>Quick {this.state.pickPickCount} Pick based on Bottom 10 numbers</h4>
                        </div>
                        <div className="col-4 aRight">
                            <button type="button" className="btn btn-success btn-sm" onClick={() => this.quickPick('btm10')}>Qick Pick</button>
                            <button type="button" className="btn btn-warning btn-sm" onClick={() => this.quickPick('btmReset')}>Reset</button>
                        </div>
                    </div>
                    <div className="row infoContentWrap">
                        <div className="col" id="btmResult">
                            {this.state.pickedBtm10.map((result,i) => (
                                <div key={i}>
                                    <div className="ballWrap"><div className="ball powerBall">{result.megaBall}</div></div>
                                    {result.pickedNumbers.map((resultNumber,j) => (
                                        <div className="ballWrap" key={j}><div className="ball">{resultNumber}</div></div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }







}

export default InfoBox;