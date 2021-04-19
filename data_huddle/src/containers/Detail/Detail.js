import React, { Component } from 'react';
import './Detail.css';
import Loader from "react-loader-spinner";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import axios from '../../axios';
import {Bar,Line} from 'react-chartjs-2';
// import axios from 'axios';

class Detail extends Component {

    state = {
        detail: [],
        loader: true,
        chartData:{},
        mentions: [],
        dates: [],
        showChart: false,
        iframe: "",
        date: ""
    }
    async componentDidMount(){
        console.log(this.props.match.params['ticker'])
        let iframe= "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_ae9d9&symbol="+this.props.match.params['ticker']+"&interval=30&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=F1F3F6&studies=%5B%5D&hideideas=1&theme=Dark&style=2&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=www.memebergterminal.com&utm_medium=widget&utm_campaign=chart&utm_term=" + this.props.match.params['ticker']
        // let iframe = "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_229e6&amp;symbol=" + this.props.match.params['ticker']+ "&amp;interval=30&amp;hidesidetoolbar=1&amp;symboledit=1&amp;saveimage=1&amp;toolbarbg=F1F3F6&amp;studies=%5B%5D&amp;hideideas=1&amp;theme=Dark&amp;style=2&amp;timezone=Etc%2FUTC&amp;studies_overrides=%7B%7D&amp;overrides=%7B%7D&amp;enabled_features=%5B%5D&amp;disabled_features=%5B%5D&amp;locale=en&amp;utm_source=www.memebergterminal.com&amp;utm_medium=widget&amp;utm_campaign=chart&amp;utm_term=" + this.props.match.params['ticker']
        this.setState({iframe: iframe})
        // const today_data = await axios.get('/reddit/comment/search/?q='+this.props.match.params['name'] +'&after=24h')
        // console.log("res = " ,today_data['data']['data'])
        // this.setState({detail: today_data['data']['data'] , loader:false})
        // this.getChartData()
        axios.get('api/data/getData', {
            params: {
                companyName:this.props.match.params['name'],
                data: false
            }
        })
        .then(res => {
           var today_data = res['data']['today_data']
           this.setState({detail: today_data , loader:false})
           this.getChartData()
        })
        .catch(err => {
            console.log("error = " , err)
        })  

    }

    async getChartData(){
        
        // var counter = 1
        // var mentions = []
        // var date_array = []
        // const today_data = await axios.get('/reddit/comment/search/?q='+this.props.match.params['name'] +'&after=24h')
        // console.log("res = " ,today_data['data']['data'])
        // mentions.push(today_data['data']['data'].length)
        // var current_Date = new Date();
        // date_array.push(current_Date.toString().substring(4,15))

        // const data1 = await axios.get('/reddit/comment/search/?q='+this.props.match.params['name'] +'&after=48h&before=24h')
        // mentions.push(data1['data']['data'].length)

        // console.log("1")

        // var previous_Date1 = new Date();
        // previous_Date1.setDate(previous_Date1.getDate() - 1);
        // date_array.push(previous_Date1.toString().substring(4,15))

        // const data2 = await axios.get('/reddit/comment/search/?q='+this.props.match.params['name'] +'&after=72h&before=48h')
        // mentions.push(data2['data']['data'].length)

        // console.log("2")

        // var previous_Date2 = new Date();
        // previous_Date2.setDate(previous_Date2.getDate() - 2);
        // date_array.push(previous_Date2.toString().substring(4,15))


        // const data3 = await axios.get('/reddit/comment/search/?q='+this.props.match.params['name'] +'&after=96h&before=72h')
        // mentions.push(data3['data']['data'].length)

        // console.log("3")

        // var previous_Date3 = new Date();
        // previous_Date3.setDate(previous_Date3.getDate() - 3);
        // date_array.push(previous_Date3.toString().substring(4,15))

        // const data4 = await axios.get('/reddit/comment/search/?q='+this.props.match.params['name'] +'&after=120h&before=96h')
        // mentions.push(data4['data']['data'].length)

        // console.log("4")

        // var previous_Date4 = new Date();
        // previous_Date3.setDate(previous_Date3.getDate() - 4);
        // date_array.push(previous_Date4.toString().substring(4,15))

        // var after = 48
        // var before = 24

        // while (counter < 5){
        //     console.log(counter)
        //     var data = await axios.get('/reddit/comment/search/?q='+this.props.match.params['name'] +'&after=' + after.toString() + 'h&before=' + before.toString() + 'h')
        //     // data = await data.json();
        //     var previous_Date = new Date();
        //     previous_Date.setDate(previous_Date.getDate() - counter);
        //     console.log(previous_Date.toString());
        //     mentions.push(data['data']['data'].length)
        //     date_array.push(previous_Date.toString().substring(4,15))
        //     after = after + 24
        //     before = before + 24
        //     counter = counter + 1 
        // }
        // this.setState({
        //         chartData:{
        //           labels:date_array,
        //           datasets:[
        //             {
        //               label:'Mentions over time',
        //               data:mentions,
        //               backgroundColor:[
        //                 'rgba(0,123,255,1)',
        //               ]
        //             }
        //           ]
        //         },
        //         showChart: true
        // });
            
        // Ajax calls here
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin':'*'
        //     }
        // };
    
        // const response2 = await fetch('https://memeberg-terminal.uc.r.appspot.com/graph?ticker='+this.props.match.params['ticker'],config)
        // const graph_data = await response2.json();
        // console.log("graph_data = " ,graph_data)
        // let y_axis = []
        // let x_axis = []
        // for(let i = 0 ; i < graph_data.length ; i++){
        //     y_axis.push(graph_data[i]['y'])
        //     x_axis.push(new Date(graph_data[i]['x']))
        //     if (i == graph_data.length-1){
        //         var date = (new Date(graph_data[i]['x']).toString())
        //         console.log("date ===== " ,date)
        //         this.setState({date: date})
        //     }
        // }
        // console.log("x_axis = " ,x_axis)
        // console.log("y_axis = " ,y_axis)
        // this.setState({
        //         chartData:{
        //           labels:x_axis,
        //           datasets:[
        //             {
        //               label: 'y',
        //               data:y_axis,
        //               borderColor: 'rgba(255,0,0)',
        //               pointBorderColor: 'rgba(0,0,0)',
        //             //   pointBackgroundColor: '#000',
        //               backgroundColor:[
        //                 'rgba(255,255,255)',
        //               ]
        //             }
        //           ]
        //         },
        //         showChart: true
        //       });
        axios.get('api/data/getPrevData', {
            params: {
                companyName:this.props.match.params['name'],
            }
        })
        .then(res => {
           console.log(res)
           if (res.status == 200){
               console.log("200")
           }
           if (res.status == 500){
                console.log("500")
           }
           this.setState({
            chartData:{
              labels:res['data']['dates'],
              datasets:[
                {
                  label:'Mentions over time',
                  data:res['data']['mentions'],
                  backgroundColor:[
                    'rgba(0,123,255,1)',
                  ]
                }
              ]
            },
            showChart: true
          });
        })
        .catch(err => {
            console.log("error = " , err)
        })  
        
      }
    openUrl = (link) => {
        window.open(link);
    }


    render(){
        return(
            <div className="container m-t-50">
                <div className="row">
                    <div className="col-md-4">
                        <div className="">
                            <h5 style={{marginBottom:'32px'}}>Stock Price</h5>
                        </div>
                        <iframe id="tradingview_229e6" src={this.state.iframe}  style={{width: "100%" ,height: "100%", margin: 0 , padding: 0 }} allowtransparency="true" scrolling="no" allowFullScreen=""></iframe>
                    </div>
                    <div className="col-md-8">
                        {this.state.showChart && (
                        <div className="" >
                            <div className="">
                                <h5 style={{marginBottom:'31px'}}>Mentions over time</h5>
                            </div>
                            <Line
                                data={this.state.chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    // legend: {
                                    //     display: false
                                    // },
                                    // scales: {
                                    //     xAxes: [{
                                    //         display: false //this will remove all the x-axis grid lines
                                    //     }]
                                    // }
                            

                                }}
                            />
                            <div className="center">
                                <p style={{marginBottom:'31px'}}>{this.state.date}</p>
                            </div>
                        </div>
                        )}
                        {!this.state.showChart && (

                            <div className="center" >
                                <h4 style={{marginBottom:'4px'}}>Loading Graph</h4>
                                <Loader type="Puff" color="#00BFFF" height={100} width={100}/>
                            </div>
                        )}
                    </div>
                    
                </div>
                <div className="center" style={{marginTop: '66px'}}>
                        <h1 style={{marginBottom:'4px'}}>Detail of {this.props.match.params['name']}</h1>
                </div>
                <div className="table-wrapper" >
                   
                    <table className="table table-bordered">
                        <thead className="background-color">
                            <tr>
                                <th scope="col">Comment</th>
                                <th scope="col">Subreddit</th>
                                <th scope="col">Url</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.detail.map((rec,index )=>{
                                return(
                                    <tr key={index}> 
                                        {rec.body.length > 135 && (
                                            <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">{rec.body}</Tooltip>}>
                                                <td>{rec.body.substring(0,135) + "..."}</td>
                                            </OverlayTrigger>
                                        )}
                                        {rec.body.length <= 135 && (
                                            <td>{rec.body}</td>
                                        )}
                                        <td>{rec.subreddit}</td>
                                        {rec.permalink.length > 40 && (
                                            <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">{"www.reddit.com" + rec.permalink}</Tooltip>}>
                                                <td onClick={() => this.openUrl("https://www.reddit.com" + rec.permalink)}>{"www.reddit.com" + rec.permalink.substring(0,40) + "..."}</td>
                                            </OverlayTrigger>
                                        )}
                                        {rec.permalink.length <= 40 && (
                                            <td onClick={() => this.openUrl("https://www.reddit.com" + rec.permalink)}>{"www.reddit.com" + rec.permalink}</td>
                                        )}
                                    </tr>                                   
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                
                
            </div>
        )
    }
}


export default (Detail)