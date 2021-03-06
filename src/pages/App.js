import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import {connect} from 'react-redux'

import asyncComponent from 'common/asyncComponent'
import Drawer from 'base/drawer/drawer'
import MmHeader from 'components/mm-header/mm-header'
import Player from 'components/player/player'

const Discover = asyncComponent(() => import('pages/discover/discover'));
const Search = asyncComponent(() => import('pages/search/search'));
const TopList = asyncComponent(() => import('pages/toplist/toplist'));
const PlayList = asyncComponent(() => import('pages/playlist/playlist'));
const SheetList = asyncComponent(() => import('pages/sheetlist/sheetlist'));


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawer: false
    }
  }
  
  openDrawer = (state) => {
    this.setState({
      isDrawer: state
    })
  };
  
  render() {
    return (
      <Router>
        <Drawer className="App mm-wrapper" isDrawer={this.state.isDrawer} onOpen={this.openDrawer}>
          <MmHeader onOpen={this.openDrawer}/>
          <main className="mm-wrapper">
            <Switch>
              <Route path="/discover" component={Discover}/>
              <Route path="/search" component={Search}/>
              <Route path="/toplist" component={TopList}/>
              <Route path="/playlist/:id" component={PlayList}/>
              <Route path="/sheetlist" component={SheetList}/>
              <Redirect to="/discover"/>
            </Switch>
          </main>
          {
            this.props.showPlayer && <Player/>
          }
        </Drawer>
      </Router>
    )
  }
}

//映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
  showPlayer: state.showPlayer
});

export default connect(mapStateToProps)(App)
