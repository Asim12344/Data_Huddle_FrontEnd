import React, { Component } from 'react';
import './Data.css';
import Loader from "react-loader-spinner";
import { stockData } from "../../stocks"
import { stockDataCron } from "../../cron"
import axios from '../../axios';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Alert from '../../components/Alert'
import moment from 'moment';

class Data extends Component {

    state = {
        companyName: "",
        tickerName: "",
        stockRecords:[],
        loader: false,
        
    }

    componentDidMount(){
    }

    detail = (company,ticker,cron) => {
        this.props.history.push(`/detail/${company}/${ticker}/${cron}`);
    }

    handlekey = event => {
        this.setState({ companyName: event.target.value });
    };


    data = (today_data,yesterday_data,stock_name,cron) => {
        var change_in_mentions = today_data - yesterday_data
        console.log("change_in_mentions = ", change_in_mentions)
        if(change_in_mentions == 0){
            change_in_mentions = change_in_mentions + "%"
        }
        else{
            if (yesterday_data > 0){
                change_in_mentions = change_in_mentions / yesterday_data
                change_in_mentions = change_in_mentions * 100
                change_in_mentions = change_in_mentions.toFixed(2) + "%"
            }
            else{
                change_in_mentions = "Not Available"
            }
        }
        
        var obj = {
            ticker: this.state.tickerName,
            company: stock_name,
            mentions: today_data,
            change_in_mentions: change_in_mentions,
            cron:cron
        }
        var stockRecords = this.props.stockRecords
        var check_record = false
        for(let i = 0 ; i < stockRecords.length && check_record == false ; i++){
            if(stockRecords[i].ticker == obj.ticker){
                stockRecords.splice(i, 1);
                check_record = true
            }
        }
        stockRecords.push(obj)
        this.props.pushData(stockRecords)
        
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
                "&limit=100"
            );
            let break_flag = false;
            let data = res.data.data.children;
            console.log("length", data.length);
            after = res.data.data.after;

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
        console.log(Object.keys(data_array).length);
        var json = (data_array);
        return json;
    }

    getDataFromStock = async () => {
        var check = false
        var stock_name = ""
        var combined_name = ""
        for(let i = 0 ; i < stockData.length ; i++){
            if(stockData[i].company.toLowerCase().trim().split(" ")[0] == this.state.companyName.toLowerCase().trim().split(" ")[0] || stockData[i].ticker.toLowerCase().trim() == this.state.companyName.toLowerCase().trim()){
                check = true
                stock_name = stockData[i].company
                combined_name = stockData[i].ticker + "|" + stockData[i].company
                this.setState({ tickerName: stockData[i].ticker});
                break
            }
        }
        if (check == true){
            console.log("combined_name = " , combined_name)
            this.setState({loader: true})
            var time1 = moment();
            var time2 = moment();
            var utc_time_yesterday = time1.subtract(48, "hours").unix();
            var utc_time_today = time2.subtract(24, "hours").unix();
            let json = await this.getDataFromRedditAPI(combined_name,utc_time_yesterday)
            console.log(json)
            var value_array = Object.values(json)
            
            var today_data = 0
            var yesterday_data = 0
            console.log("utc_time_today = " , utc_time_today)
            console.log("utc_time_yesterday = " , utc_time_yesterday)
            console.log(value_array)
            for(let i = 0 ; i < value_array.length ; i++){
                if (value_array[i]['created_utc'] > utc_time_today){
                    today_data =  today_data + 1
                }
                if (value_array[i]['created_utc'] > utc_time_yesterday && value_array[i]['created_utc'] < utc_time_today){
                    yesterday_data =  yesterday_data + 1
                }
            }
            console.log("today_data = " , today_data)
            console.log("yesterday_data = " , yesterday_data)
            this.data(today_data,yesterday_data,stock_name,false)
            this.setState({loader: false , companyName: ""})
        }
        else{
            this.props.showAlert("Does not exist in list","danger")
            this.props.hideAlert()
            this.setState({loader: false , companyName: ""})
        }

    }
    

    apicall = async () => {
        var check = false
        var stock_name = ""
        var combined_name = ""
        for(let i = 0 ; i < stockDataCron.length ; i++){
            if(stockDataCron[i].company.toLowerCase().trim().split(" ")[0] == this.state.companyName.toLowerCase().trim().split(" ")[0] || stockDataCron[i].ticker.toLowerCase().trim() == this.state.companyName.toLowerCase().trim()){
                check = true
                stock_name = stockDataCron[i].company
                combined_name = stockDataCron[i].ticker + "|" + stockDataCron[i].company
                this.setState({ tickerName: stockDataCron[i].ticker});
                break
            }
        }
        if (check == true){
            console.log(combined_name)
            this.setState({loader: true})
            var data = await axios.get('http://datahuddle.co:8080/get?company='+combined_name+'&days=2')
            .catch(err => {
                console.log("error = " , err)
            })
            console.log(data['data']['data'])          
            var today_data = data['data']['data'][0]
            var today_count = 0
            for(let i = 0 ; i < today_data.length ; i++){
                var parse_data = JSON.parse(today_data[i]['data'])
                console.log(parse_data)
                console.log(Object.keys(parse_data).length)
                today_count = today_count + Object.keys(parse_data).length

            }
            console.log("today_count = " , today_count)
            var yesterday_data = data['data']['data'][1]
            var yesterday_count = 0
            for(let i = 0 ; i < yesterday_data.length ; i++){
                var parse_data_yesterday = JSON.parse(yesterday_data[i]['data'])
                console.log(parse_data_yesterday)
                console.log(Object.keys(parse_data_yesterday).length)
                yesterday_count = yesterday_count + Object.keys(parse_data_yesterday).length
            }
            console.log("yesterday_count = " , yesterday_count)
            this.data(today_count,yesterday_count,stock_name,true)
            this.setState({loader: false , companyName: ""})
        }
        else{
            this.getDataFromStock()
        }

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
                <div className="col-md-3">
                    <input type="text"  className="form-control height-45" value={this.state.companyName} onChange={this.handlekey} placeholder="Enter a company name" />
                </div>
                <div className="col-md-1">
                    <button disabled={this.state.companyName == "" ? true : false} onClick={this.apicall} className="btn btn-primary height-45">Submit</button>                        
                </div>
            </div>
            <table className="table table-bordered margin-top-23">
                <thead className="background-color">
                    <tr>
                        <th scope="col">Ticker</th>
                        <th scope="col">Stock Name</th>
                        <th scope="col">Mentions (24HR)</th>
                        <th scope="col">% Change in Mentions (24HR)</th>
                        <th scope="col">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.stockRecords.map((rec,index )=>{
                        return(
                            <tr key={index}> 
                                <td>{rec.ticker}</td>
                                <td>{rec.company}</td>
                                <td>{rec.mentions}</td>
                                <td>{rec.change_in_mentions}</td>
                                <td>
                                    {rec.mentions > 0 && (
                                        <span className="curser_allowed" onClick={() => this.detail(rec.company,rec.ticker,rec.cron)}>Detail</span>
                                    )}
                                    {rec.mentions == 0 && (
                                        <span>---------</span>
                                    )}
                                </td>
                            </tr>                                   
                        )
                    })}
                </tbody>
            </table>
                {this.state.loader && (
                    <div className="center" >
                            <Loader type="Puff" color="#00BFFF" height={100} width={100}/>
                    </div>                
                )}      
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        stockRecords: state.detail.stockRecords,
        alert: state.alert.alert,
        alertMessage: state.alert.alertMessage,
        alertType: state.alert.alertType,
    }
};

const mapDispatchToProps = dispatch =>  {
    return {
        pushData: (data) => dispatch(actionCreators.data(data)),
        showAlert: (message,variant) => dispatch(actionCreators.showAlert(message,variant)),
        hideAlert: () => dispatch(actionCreators.hideAlert())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Data)