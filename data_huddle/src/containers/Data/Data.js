import React, { Component } from 'react';
import './Data.css';
import Loader from "react-loader-spinner";
import { stockData } from "../../stocks"
import axios from '../../axios';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Alert from '../../components/Alert'
class Data extends Component {

    state = {
        companyName: "",
        tickerName: "",
        stockRecords:[],
        loader: false,
        
    }

    componentDidMount(){
    }

    detail = (company,ticker) => {
        this.props.history.push(`/detail/${company}/${ticker}`);
    }

    handlekey = event => {
        this.setState({ companyName: event.target.value });
    };


    data = (today_data,yesterday_data) => {
        var change_in_mentions = today_data.length - yesterday_data.length
        
        if(change_in_mentions == 0){
            change_in_mentions = change_in_mentions + "%"
        }
        else{
            if (yesterday_data.length > 0){
                change_in_mentions = change_in_mentions / yesterday_data.length
                change_in_mentions = change_in_mentions * 100
                change_in_mentions = change_in_mentions.toFixed(2) + "%"
            }
            else{
                change_in_mentions = "Not Available"
            }
        }
        
        var obj = {
            ticker: this.state.tickerName,
            company: this.state.companyName,
            mentions: today_data.length,
            change_in_mentions: change_in_mentions,
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

    dummy = async () => {
        var check = false
        for(let i = 0 ; i < stockData.length ; i++){
            if(stockData[i].company.toLowerCase().trim() == this.state.companyName.toLowerCase().trim()){
                check = true
                this.setState({ tickerName: stockData[i].ticker });
            }
        }
        if (check == true){
            this.setState({loader: true})
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
                }
            };
            const today_data = await axios.get('/reddit/comment/search/?q='+this.state.companyName +'&after=24h')
            // const today_data = await response.json();
            console.log("res = " ,today_data['data']['data'])

            const yesterday_data = await axios.get('/reddit/comment/search/?q='+this.state.companyName +'&after=48h&before=24h')
            // const yesterday_data = await response1.json();
            console.log("res = " ,yesterday_data['data']['data'])
            this.data(today_data['data']['data'],yesterday_data['data']['data'])
            this.setState({loader: false , companyName: ""})
            
        }
        else{
            this.props.showAlert("Does not exist in list","danger")
            this.props.hideAlert()
            this.setState({loader: false , companyName: ""})
        }
    }

    apicall = () => {
        console.log("apicall")
        var check = false
        for(let i = 0 ; i < stockData.length ; i++){
            if(stockData[i].company.toLowerCase().trim() == this.state.companyName.toLowerCase().trim()){
                check = true
                this.setState({ tickerName: stockData[i].ticker });
            }
        }
        if (check == true){
            console.log("true")
            this.setState({loader: true})
            axios.get('api/data/getData', {
                params: {
                    companyName:this.state.companyName,
                    data: true
                }
            })
            .then(res => {
                if (res.status == 200){
                    console.log("200")
                }
                if (res.status == 500){
                     console.log("500")
                }
               var today_data = res['data']['today_data']
               var yesterday_data = res['data']['yesterday_data']
               console.log(res['data'])
               this.data(today_data,yesterday_data)
               this.setState({loader: false , companyName: ""})
            })
            .catch(err => {
                console.log("error = " , err)
            })  
        }
        else{
            this.props.showAlert("Does not exist in list","danger")
            this.props.hideAlert()
            this.setState({loader: false , companyName: ""})
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
                {this.state.loader && (
                    <div className="col-md-3">
                        <Loader type="Puff" color="#00BFFF" height={40} width={50}/>                        
                    </div>
                )}               
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
                                        <span className="curser_allowed" onClick={() => this.detail(rec.company,rec.ticker)}>Detail</span>
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