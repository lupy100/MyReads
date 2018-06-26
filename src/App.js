import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import NotFound from './pages/NotFound/NotFound';

import './App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Search} />

            <Route path='/404' component={NotFound} />
            <Redirect from='*' to='/404' />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;