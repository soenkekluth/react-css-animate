import React, { Component } from 'react';
import logo from './logo.svg';
import animations from './animations';
import MainAnimation from './Main.animation';
import MainTransition from './Main.transition';
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

  static propTypes= {
    animationType: React.PropTypes.string,
  };


  static defaultProps = {
    animationType: 'animation'
  };


  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context)

    const params = context.router.params;
    const animateEnterName = (params && !!params.animateEnter && hasAnimation(params.animateEnter)) ? params.animateEnter : 'rotateInUpRight';
    const animateLeaveName = (params && !!params.animateLeave && hasAnimation(params.animateLeave)) ? params.animateLeave : 'hinge';

    this.state = {
      pageName: pages[pagesIterator],
      animateEnterName: animateEnterName,
      animateLeaveName: animateLeaveName
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


    const animateEnterName = e.nativeEvent.target.value;
    if (hasAnimation(animateEnterName)) {
      this.context.router.push('/' + animateEnterName + '/' + this.state.animateLeaveName);
    }

  }

  onChangeAnimateLeave(e) {


    const animateLeaveName = e.nativeEvent.target.value;
    if (hasAnimation(animateLeaveName)) {
      this.context.router.push('/' + this.state.animateEnterName + '/' + animateLeaveName);
    }

  }


  componentWillReceiveProps(nextProps) {
    const params = nextProps.router.params;
    if (params) {
      const animateEnterName = (!!params.animateEnter && hasAnimation(params.animateEnter)) ? params.animateEnter : this.state.animateEnterName;
      const animateLeaveName = (!!params.animateLeave && hasAnimation(params.animateLeave)) ? params.animateLeave : this.state.animateLeaveName;
      if (animateEnterName !== this.state.animateEnterName || animateLeaveName !== this.state.animateLeaveName) {
        this.setState({
          animateEnterName: animateEnterName,
          animateLeaveName: animateLeaveName
        })
      }
    }
  }


  renderMain(page){

    if(this.props.animationType === 'animation'){
      return (<MainAnimation pageName={this.state.pageName} animateEnterName={this.state.animateEnterName} animateLeaveName={this.state.animateLeaveName}>
                {page}
              </MainAnimation>);
    }

    return (<MainTransition pageName={this.state.pageName}>
              {page}
            </MainTransition>);


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
          <Select ref="animateEnterSelect" value={this.state.animateEnterName} onChange={this.onChangeAnimateEnter.bind(this)} id="animateEnter"></Select>
          <label htmlFor="animateEnterDurationSelect">duration</label>
          <TimeSelect ref="animateEnterDurationSelect" id="animateEnterDurationSelect"></TimeSelect>

          <label htmlFor="animateLeave">Page exit</label>
          <Select value={this.state.animateLeaveName} onChange={this.onChangeAnimateLeave.bind(this)} id="animateLeave"></Select>

        </div>

        {this.renderMain(page)}

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
