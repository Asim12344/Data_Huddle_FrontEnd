import React, { Component ,Fragment} from 'react';
import { NavLink } from 'react-router-dom';

import './Home.css';
import clock from "../../assets/pics/clock.png"
import clock2 from "../../assets/pics/clock2.png"
import Group from "../../assets/pics/Group.png"
import Screen from "../../assets/pics/screen.png"
import location from "../../assets/pics/location.png"
import Blue from "../../assets/pics/blue.png"
import White from "../../assets/pics/white.png"
import Graph from "../../assets/pics/522.png"
import Blue1 from "../../assets/pics/blue1.png"
import Data from "../../assets/pics/data.png"
import DataHurdle from "../../assets/pics/data huddle 1.png"
import Blue2 from "../../assets/pics/blue2.png"
import Polygon from "../../assets/pics/polygon.png"
import Twitter from "../../assets/pics/twitter.png"
import Discord from "../../assets/pics/discord.png"
import Reddit from "../../assets/pics/reddit.png"
import Yahoo from "../../assets/pics/Yahoo.png"
import Alpha from "../../assets/pics/aplha.png"
import Footer from "../../assets/pics/footer.png"
import logo from "../../assets/pics/logo.png"


class Home extends Component {

    
    componentDidMount(){
    }

    data = () => {
        this.props.history.push(`/data`);
    }

    render(){
        return(
            <Fragment>
            <div className="container m-t-110">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="heading bold"> Distill and Understand finance related community discussions on the web</h1>
                        <p className="paragraph"> <span style={{fontWeight:'bold'}}>DataHuddle</span> uses sophisticated data science and artificial intelligence to analyze the public conversations around financial information on the web.</p>
                        <button className="pink-button" onClick={this.data}>Try for free</button>
                    </div>
                    {/* <div className="col-md-6">
                        <h1 className="heading"> Distill and Understand finance related community discussions on the web</h1>
                        <p className="paragraph"> <span style={{fontWeight:'bold'}}>DataHuddle</span> uses sophisticated data science and artificial intelligence to analyze the public conversations around financial information on the web.</p>
                        <button className="pink-button">Try for free</button>
                    </div> */}
                </div>
                <div className="div-styling height-700 margin-bottom-100">
                    <h4 className="color m-t-20 center">The Data Huddle Advantage</h4>
                    <p className="paragraph center m-t-20"> Act faster with real time information</p>
                    <div className="row m-t-20 margin">
                        <div className="col-md-4">
                            <img className="center1" src={clock2}/>
                            <p className="margin-top-20"> Gain the earliest indicators of high-impact events and emerging risks</p>
                        </div>
                        <div className="col-md-4">
                            <img className="center1" src={clock2}/>
                            <p className="margin-top-20">Cover the globe or specific locations</p>
                        </div>
                        <div className="col-md-4">
                            <img className="center1" src={clock2}/>
                            <p className="margin-top-20">Mobilize and respond with confidence and speed</p>
                        </div>
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-4 m-t-20 ">
                            <img className="center1" src={Screen}/>
                            <p className="margin-top-20">Stay on top of industry and competitive developments</p>
                        </div>
                        <div className="col-md-4 m-t-20">
                            <img className="center1" src={Group}/>
                            <p className="margin-top-20">Realtime analytics for online community forums</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <img className="center1 under" src={Blue}/>
                        <img className="center1 middle" src={White}/>
                        <img className="center1 over" src={Graph}/>
                    </div>
                    <div className="col-md-6 ">
                        <h1 className="heading">Financial Chat Forums Analysis for Market Intelligence </h1>
                        <p className="paragraph">• Analyze billions of consumer conversations to understand what’s affecting the market. </p>
                        <p className="paragraph">• Realtime analytics for online community forums </p>
                    </div>
                    <div className="col-md-6 m-t-180">
                        <h1 className="heading">Get Critical Information Faster</h1>
                        <p className="paragraph w-61">To survive and thrive in the face of uncertainty and disruption, risk management professionals must harness the power of public, real-time information from online discussions.</p>
                    </div>
                    <div className="col-md-6 m-t-125">
                        <img className="center1 under" src={Blue1}/>
                        <img className="center1 middle" src={Data}/>
                    </div>
                </div>
                </div>

                <div className="div-styling m-t-125 height-500">
                    <h4 className="color m-t-20 center">React To Every Trend</h4>
                    <p className="paragraph center m-t-20"> Close the gap between high-impact events and when you discover them</p>
                        <img className="block data-image" src={DataHurdle}/>
                        <img className="block over-blue" src={Blue2}/>
                        <img className="block polygon-image" src={Polygon}/>
                </div>
                <div className="">
                    <h4 className="color m-t-20 center">The DataHuddle Solution</h4>
                    <p className="styling center m-t-20"> Keeping up with the volume of information about a sector or specific stock is increasingly complex. Reading, processing, and sharing information is time- consuming, error-prone and labor-intensive. DataHuddle systematically analyzes, organizes, and ranks online discussions and news, generating configurable summaries to actionable intelligence.</p>
                    <button className="pink-button center1 m-t-20">Try for free</button>
                </div>
                <div className="div-styling height-500">
                    <h4 className="color m-t-20 center">Forums Tracked</h4>
                    <div className="container">
                        <div className="row m-t-100">
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-4">
                                <img className="" src={Twitter}/>
                            </div>
                            <div className="col-md-4">
                                <img className="" src={Discord}/>
                            </div>
                            <div className="col-md-3">
                                <img className="" src={Reddit}/>
                            </div>
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-3">
                                <img className="" src={Yahoo}/>
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-3" style={{marginTop:"70px"}}>
                                <img className="" src={Alpha}/>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="" >
                    <img className="" src={Footer} style={{marginTop:'-600px'}}/>
                    <p className="block p-styling"><NavLink exact to='/home'>Platform</NavLink></p>
                    <p className="block p-styling"><NavLink exact to='/home'>Resources</NavLink></p>
                    <p className="block p-styling"><NavLink exact to='/home'>Company</NavLink></p>
                    <p className="block p-styling"><NavLink exact to='/home'>Legal</NavLink></p>
                    <img className="logo" src={logo} style={{marginLeft:'13%'}}/>
                </nav>
            </Fragment>
        )
    }
}



export default Home