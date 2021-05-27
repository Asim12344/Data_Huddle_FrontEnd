import React, { Component } from 'react';
import './Detail.css';
import Loader from "react-loader-spinner";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import axios from '../../axios';
import {Bar,Line} from 'react-chartjs-2';
import {getDataFromAPI,getFiveDayDataFromAPI} from '../../store/actions/detail'
import { connect } from 'react-redux';
import Alert from '../../components/Alert'
import * as actionCreators from '../../store/actions/index'
import moment from 'moment';

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
        var combined_name = this.props.match.params['ticker'] + "|" + this.props.match.params['name']
        console.log(combined_name)
        var cron = this.props.match.params['cron']
        console.log("cron = " , cron)
        console.log("cron = " ,typeof(cron))
        if(cron == "true"){
            this.getChartDataFromCron(combined_name)  
        }
        else{
            this.getChartDataFromStock(combined_name) 
        }
    }

    getDataFromRedditAPI = async (company,utc_time) => {
        console.log("getDataFromRedditAPI")
        company = company.split("|");
        var data_array = {};
        for (let k = 0; k < company.length; k++) {
            let after = null;
            while (true) {
            var res = await axios.get(
                "https://www.reddit.com/search.json?q=" +
                company[k] +
                "&sort=new" +
                (after ? `&after=${after}` : "") +
                // utc_time +
                "&limit=100"
            );
            let break_flag = false;
            let data = res.data.data.children;
            console.log("length", data.length);
            after = res.data.data.after;
            // console.log(data[data.length - 1].data.created_utc, utc_time, after)

            for (let i = 0; i < data.length; i++) {
                data_array[data[i].data.created_utc] = {
                url: data[i].data.url,
                body: data[i].data.body,
                subreddit: data[i].data.subreddit_name_prefixed,
                created_utc: data[i].data.created_utc,
                };
                if (data[i].data.created_utc < utc_time) {
                    console.log("breaking loop");
                    break_flag = true;
                    break;
                }
            }
            if (break_flag || after == null) break;
            }
        }
        console.log("djdjdk")
        console.log(Object.keys(data_array).length);
        var json = (data_array);
        return json;
    }

    async getChartDataFromStock(combined_name){
        var dates = []
        for (let i = 0 ; i < 5 ; i++){
            var date = new Date();
            date.setDate(date.getDate() - i)
            console.log("date1 = " , date)
            var date = date.toString().substring(0,15)
            console.log("date2 = " ,date)
            dates.push(date)
        }
        console.log(dates)
        var time1 = moment();
        var time2 = moment();
        var time3 = moment();
        var time4 = moment();
        var time5 = moment();
        var utc_time_five = time1.subtract(120, "hours").unix();
        var utc_time_four = time2.subtract(96, "hours").unix();
        var utc_time_third = time3.subtract(72, "hours").unix();
        var utc_time_two = time4.subtract(48, "hours").unix();
        var utc_time_one = time5.subtract(24, "hours").unix();
        let json = await this.getDataFromRedditAPI(combined_name,utc_time_five)
        console.log(json)
        var value_array = Object.values(json)
        var one_day = 0
        var two_day = 0
        var third_day = 0
        var four_day = 0
        var five_day = 0
        var one_day_data_array = []

        for(let i = 0 ; i < value_array.length ; i++){
            if (value_array[i]['created_utc'] > utc_time_one){
                one_day =  one_day + 1
                one_day_data_array.push(value_array[i])
            }
            if (value_array[i]['created_utc'] > utc_time_two && value_array[i]['created_utc'] < utc_time_one){
                two_day =  two_day + 1
            }
            if (value_array[i]['created_utc'] > utc_time_third && value_array[i]['created_utc'] < utc_time_two){
                third_day =  third_day + 1
            }
            if (value_array[i]['created_utc'] > utc_time_four && value_array[i]['created_utc'] < utc_time_third){
                four_day =  four_day + 1
            }
            if (value_array[i]['created_utc'] > utc_time_five && value_array[i]['created_utc'] < utc_time_four){
                five_day =  five_day + 1
            }
        }

        var five_day_data_array = []
        five_day_data_array.push(one_day)
        five_day_data_array.push(two_day)
        five_day_data_array.push(third_day)
        five_day_data_array.push(four_day)
        five_day_data_array.push(five_day)
        console.log("five_day_data_array = " , five_day_data_array)
        console.log("one_day_data = " , one_day_data_array)
        this.setState({detail: one_day_data_array , loader:false})
        if(five_day_data_array.length == 5){
            this.setState({
                chartData:{
                    labels:dates,
                    datasets:[
                    {
                        label:'Mentions over time',
                        data:five_day_data_array,
                        backgroundColor:[
                        'rgba(0,123,255,1)',
                        ]
                    }
                    ]
                },
                showChart: true
                });
        }
        else{
            this.props.showAlert("Internet problem plz try again","danger")
            this.props.hideAlert()
            this.setState({showChart: true})
        }

    }

    
    async getChartDataFromCron(combined_name){
        var dates = []
        for (let i = 0 ; i < 5 ; i++){
            var date = new Date();
            date.setDate(date.getDate() - i)
            console.log("date1 = " , date)
            var date = date.toString().substring(0,15)
            console.log("date2 = " ,date)
            dates.push(date)
        }
        console.log(dates)
        var data = await axios.get('http://datahuddle.co:8080/get?company='+combined_name+'&days=5')
        .catch(err => {
            console.log("error = " , err)
        })
        console.log(data['data']['data'])  
        var count=0 
        var five_day_data_array = []
        var one_day_data_array = []
        for(let i = 0 ; i < data['data']['data'].length ; i++){
            var one_day_data = data['data']['data'][i]
            count = 0
            console.log(i)
            console.log("======================================")
            for (let j = 0 ; j < one_day_data.length ; j++){
                var parse_data = JSON.parse(one_day_data[j]['data'])
                console.log(parse_data)
                console.log(Object.keys(parse_data).length)
                count = count + Object.keys(parse_data).length
                var value_array = Object.values(parse_data)
                console.log(value_array)

                if(i==0){
                    for(let k = 0 ; k < value_array.length; k++){
                        one_day_data_array.unshift(value_array[k])
                    }
                }
            }
            five_day_data_array.push(count)
        }

        console.log("five_day_data_array = " , five_day_data_array)
        console.log("one_day_data = " , one_day_data_array)
        this.setState({detail: one_day_data_array , loader:false})
        if(five_day_data_array.length == 5){
            this.setState({
                chartData:{
                    labels:dates,
                    datasets:[
                    {
                        label:'Mentions over time',
                        data:five_day_data_array,
                        backgroundColor:[
                        'rgba(0,123,255,1)',
                        ]
                    }
                    ]
                },
                showChart: true
                });
        }
        else{
            this.props.showAlert("Internet problem plz try again","danger")
            this.props.hideAlert()
            this.setState({showChart: true})
        }
        
    }

    openUrl = (link) => {
        window.open(link);
    }
    

    render(){
        return(
            <div className="container m-t-50">
                {this.props.alert == true && (
                    <div>
                        <Alert variant={this.props.alertType} message={this.props.alertMessage}/>
                    </div>
                )}
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
                                <th scope="col">Subreddit</th>
                                <th scope="col">Url</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.detail.map((rec,index )=>{
                                return(
                                    <tr key={index}> 
                                        <td>{rec.subreddit}</td>
                                        {rec.url.length > 80 && (
                                            <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">{rec.url}</Tooltip>}>
                                                <td onClick={() => this.openUrl(rec.url)}>{rec.url.substring(0,80) + "..."}</td>
                                            </OverlayTrigger>
                                        )}
                                        {rec.url.length <= 80 && (
                                            <td onClick={() => this.openUrl(rec.url)}>{"www.reddit.com" + rec.url}</td>
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
const mapStateToProps = state => {
    return {
        alert: state.alert.alert,
        alertMessage: state.alert.alertMessage,
        alertType: state.alert.alertType,
    }
};

const mapDispatchToProps = dispatch =>  {
    return {
        showAlert: (message,variant) => dispatch(actionCreators.showAlert(message,variant)),
        hideAlert: () => dispatch(actionCreators.hideAlert())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail)