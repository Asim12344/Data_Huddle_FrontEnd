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
        this.setState({iframe: iframe})
        // this.getChartData()
        // axios.get('api/data/getData', {
        //     params: {
        //         companyName:this.props.match.params['name'] + "|" + this.props.match.params['ticker'],
        //         data: false
        //     }
        // })
        // .then(res => {
        //    var today_data = res['data']['today_data']
        //    this.setState({detail: today_data , loader:false})
        // })
        // .catch(err => {
        //     console.log("error = " , err)
        // })  
        var combined_name = this.props.match.params['name'] + "|" + this.props.match.params['ticker']
        var today_data_array = []
        var today_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after=24h&size=1000')

        console.log(today_data)
        console.log(today_data['status'])
        while (today_data['status'] != 200){
            console.log("while today")
            today_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after=24h&size=1000')
            console.log(today_data['status'])
        }

        console.log("res = " ,today_data['data']['data'])
        // today_data_array = today_data_array.push(...today_data['data']['data'])
        for (let i = 0 ; i < today_data['data']['data'].length ; i++){
            today_data_array.push(today_data['data']['data'][i])
        }
        console.log("today_data_array = " , today_data_array)
        var current_Date = new Date()

        while (today_data['data']['data'].length == 100){
            var get_time = new Date((today_data['data']['data'][today_data['data']['data'].length-1]['created_utc'])*1000) 
            console.log(current_Date)
            console.log(get_time)
            var miliseconds = current_Date - get_time
            console.log("miliseconds = " , miliseconds)
            var hour = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);
            console.log("hour = " , hour)
            today_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after='+ hour + 'h&size=1000')
            console.log(today_data['status'])
            while (today_data['status'] != 200){
                console.log("while today")
                today_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after='+ hour + 'h&size=1000')
                console.log(today_data['status'])
            }
            console.log("Total Records = " , today_data['data']['data'].length)
            for (let i = 0 ; i < today_data['data']['data'].length ; i++){
                today_data_array.push(today_data['data']['data'][i])
            }
        }

        console.log("today_data_array = " , today_data_array)
        this.setState({detail: today_data_array , loader:false})

    }

    async getChartData(){
        
        
        axios.get('api/data/getPrevData', {
            params: {
                companyName:this.props.match.params['name'] + "|" + this.props.match.params['ticker'],
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
                    {/* <div className="col-md-8">
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
                    </div> */}
                    
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
                    {this.state.loader == true && (
                        <div className="center" >
                            {/* <h4 style={{marginBottom:'4px'}}>Loading Graph</h4> */}
                            <Loader type="Puff" color="#00BFFF" height={100} width={100}/>
                        </div>
                    )}
                </div>
                
                
            </div>
        )
    }
}


export default (Detail)