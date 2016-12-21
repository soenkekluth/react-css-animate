import React, { Component } from 'react';
import logo from './logo.svg';

import Main from './Main';
import Select from './Select';
import Page from './Page';
import PageOne from './PageOne';

import 'animate.css';

const pages = ['page-1', 'page-2', 'page-3', 'page-4', 'page-5'];
var pagesIterator = 0;

import './App.css';
class App extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      pageName: pages[pagesIterator],
      animateEnterClass: 'rotateInUpRight',
      animateLeaveClass: 'hinge'
    }
  }

  onNextPage() {
    ++pagesIterator;
    if(pagesIterator > pages.length-1){
      pagesIterator = 0;
    }
    var pageName = pages[pagesIterator];
    this.setState({
      pageName: pageName
    })

  }

  onPrevPage() {
    --pagesIterator;
    if(pagesIterator < 0){
      pagesIterator = pages.length-1;
    }
    var pageName = pages[pagesIterator];
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


    let page = null;
    const pageName = this.state.pageName.split('-')[1];

    switch (this.state.pageName) {
      case 'page-1':
      case 'page-2':
      case 'page-4':
      case 'page-5':
        page = (<Page className={this.state.pageName}><h1>{pageName}</h1></Page>);
        break;
      case 'page-3':
        page = (<div className="page page-3" >
                        <h1>3</h1>
                      </div>)
        break;
        default: break;
    }

    // const page = this.state.pageName === 'page-1' ? <PageOne /> : <PageTwo />;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2><span className="small">React</span> <span className="bold">CSSAnimate</span></h2>


          <div className="controls">
          <div className="buttons">
          <button onClick={this.onPrevPage.bind(this)}>prev Page</button>
          <button onClick={this.onNextPage.bind(this)}>next Page</button>
          </div>

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
