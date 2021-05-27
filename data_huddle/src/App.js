import React, { Component } from 'react';
import { BrowserRouter ,Route, Switch ,Redirect} from 'react-router-dom';
import Layout from './hocs/Layout';
import Data from './containers/Data/Data'
import Home from './containers/Home/Home'
import Detail from './containers/Detail/Detail'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/home' component={Home} /> 
            <Route exact path='/data' component={Data} />
            <Route exact path='/detail/:name/:ticker/:cron' component={Detail} />
            <Redirect from="/" to="/home" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}


export default App;