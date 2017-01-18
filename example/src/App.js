import React, { Component } from 'react';
import logo from './logo.svg';
import animations from './animations';
import Main from './Main';
import Select from './Select';
import TimeSelect from './TimeSelect';
import Page from './Page';


import CSSAnimate from '../lib/css-animate';
import {easeOutExpo} from '../lib/css-easing';



import 'animate.css';
import './Banderole.css';


const hasAnimation = (animationName) => animations.indexOf(animationName) > -1;

const pages = ['page-1', 'page-2', 'page-3', 'page-4', 'page-5'];
var pagesIterator = 0;

import './App.css';
class App extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context)

    const params = context.router.params;
    const enterClass = (params && !!params.animateEnter && hasAnimation(params.animateEnter)) ? params.animateEnter : 'rotateInUpRight';
    const leaveClass = (params && !!params.animateLeave && hasAnimation(params.animateLeave)) ? params.animateLeave : 'hinge';

    this.state = {
      pageName: pages[pagesIterator],
      enterClass: enterClass,
      leaveClass: leaveClass
    }
  }

  onNextPage() {
    ++pagesIterator;
    if (pagesIterator > pages.length - 1) {
      pagesIterator = 0;
    }
    var pageName = pages[pagesIterator];
    this.setState({
      pageName: pageName
    })

  }

  onPrevPage() {
    --pagesIterator;
    if (pagesIterator < 0) {
      pagesIterator = pages.length - 1;
    }
    var pageName = pages[pagesIterator];
    this.setState({
      pageName: pageName
    })

  }

  onChangeAnimateEnter(e) {


    const enterClass = e.nativeEvent.target.value;
    if (hasAnimation(enterClass)) {
      this.context.router.push('/' + enterClass + '/' + this.state.leaveClass);
    }

  }

  onChangeAnimateLeave(e) {


    const leaveClass = e.nativeEvent.target.value;
    if (hasAnimation(leaveClass)) {
      this.context.router.push('/' + this.state.enterClass + '/' + leaveClass);
    }

  }


  componentWillReceiveProps(nextProps) {
    const params = nextProps.router.params;
    if (params) {
      const enterClass = (!!params.animateEnter && hasAnimation(params.animateEnter)) ? params.animateEnter : this.state.enterClass;
      const leaveClass = (!!params.animateLeave && hasAnimation(params.animateLeave)) ? params.animateLeave : this.state.leaveClass;
      if (enterClass !== this.state.enterClass || leaveClass !== this.state.leaveClass) {
        this.setState({
          enterClass: enterClass,
          leaveClass: leaveClass
        })
      }
    }
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
      default:
        break;
    }

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
          </div>
          <span className="banderole forkongithub">
            <a href="https://github.com/soenkekluth/react-css-animate">Fork me on GitHub</a>
          </span>
        </div>

        <div className="sidebar menu">

          <label htmlFor="animateEnter">Page enter</label>
          <Select ref="animateEnterSelect" value={this.state.enterClass} onChange={this.onChangeAnimateEnter.bind(this)} id="animateEnter"></Select>
          <label htmlFor="animateEnterDurationSelect">duration</label>
          <TimeSelect ref="animateEnterDurationSelect" id="animateEnterDurationSelect"></TimeSelect>

          <label htmlFor="animateLeave">Page exit</label>
          <Select value={this.state.leaveClass} onChange={this.onChangeAnimateLeave.bind(this)} id="animateLeave"></Select>

        </div>


        <Main pageName={this.state.pageName} enterClass={this.state.enterClass} leaveClass={this.state.leaveClass}>
          {page}
        </Main>
      </div>
    );
  }
}

export default App;


/*
<CSSAnimate hide animateLeave>
<div className="page page-3" >
    <h1>3</h1>
  </div>
  </CSSAnimate>
 */
