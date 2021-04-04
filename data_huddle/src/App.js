import React, { Component } from 'react';
import { BrowserRouter ,Route, Switch ,Redirect} from 'react-router-dom';
import Layout from './hocs/Layout';
import Data from './containers/Data/Data'
import Detail from './containers/Detail/Detail'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/data' component={Data} />
            <Route exact path='/detail/:name/:ticker' component={Detail} />
            <Redirect from="/" to="/data" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}


export default App;