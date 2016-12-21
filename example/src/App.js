import React, { Component } from 'react';
import logo from './logo.svg';

import Main from './Main';
import Select from './Select';
import PageTwo from './PageTwo';
import PageOne from './PageOne';

import 'animate.css';


import './App.css';
class App extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      pageName: 'page-1',
      animateEnterClass: 'rotateInUpRight',
      animateLeaveClass: 'hinge'
    }
  }

  changePage() {
    var pageName = this.state.pageName === 'page-1' ? 'page-2' : 'page-1';
    this.setState({
      pageName: pageName
    })

  }

  onChangeAnimateEnter(e) {
    this.setState({
      animateEnterClass: e.nativeEvent.target.value
    })
  }

  onChangeAnimateLeave(e) {
    this.setState({
      animateLeaveClass: e.nativeEvent.target.value
    })
  }


  render() {

    const page = this.state.pageName === 'page-1' ? <PageOne /> : <PageTwo />;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React CSSAnimate</h2>


          <div className="controls">
          <button onClick={this.changePage.bind(this)}>change page</button>

          <div className="right">
          <label htmlFor="animateEnter">Page enter</label>
          <Select value={this.state.animateEnterClass} onChange={this.onChangeAnimateEnter.bind(this)} id="animateEnter"></Select>

          <label htmlFor="animateLeave">Page exit</label>
          <Select value={this.state.animateLeaveClass} onChange={this.onChangeAnimateLeave.bind(this)} id="animateLeave"></Select>
          </div>
          </div>
        </div>



        <Main pageName={this.state.pageName} animateEnterClass={this.state.animateEnterClass} animateLeaveClass={this.state.animateLeaveClass}>
          {page}
        </Main>

      </div>
    );
  }
}

export default App;
