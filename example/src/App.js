import React, { Component } from 'react';
import logo from './logo.svg';
import animations from './animations';
import Main from './Main';
import Select from './Select';
import Page from './Page';


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
    const animateEnterClass = (params && !!params.animateEnter && hasAnimation(params.animateEnter)) ? params.animateEnter : 'rotateInUpRight';
    const animateLeaveClass = (params && !!params.animateLeave && hasAnimation(params.animateLeave)) ? params.animateLeave : 'hinge';

    this.state = {
      pageName: pages[pagesIterator],
      animateEnterClass: animateEnterClass,
      animateLeaveClass: animateLeaveClass
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

    console.info('onChangeAnimateEnter');

    const animateEnterClass = e.nativeEvent.target.value;
    if (hasAnimation(animateEnterClass)) {
      this.context.router.push('/' + animateEnterClass + '/' + this.state.animateLeaveClass);
    }

  }

  onChangeAnimateLeave(e) {
    console.info('onChangeAnimateLeave');

    const animateLeaveClass = e.nativeEvent.target.value;
    if (hasAnimation(animateLeaveClass)) {
      this.context.router.push('/' + this.state.animateEnterClass + '/' + animateLeaveClass);
    }

  }


  componentWillReceiveProps(nextProps) {
    const params = nextProps.router.params;
    if (params) {
      const animateEnterClass = (!!params.animateEnter && hasAnimation(params.animateEnter)) ? params.animateEnter : this.state.animateEnterClass;
      const animateLeaveClass = (!!params.animateLeave && hasAnimation(params.animateLeave)) ? params.animateLeave : this.state.animateLeaveClass;
      if (animateEnterClass !== this.state.animateEnterClass || animateLeaveClass !== this.state.animateLeaveClass) {
        this.setState({
          animateEnterClass: animateEnterClass,
          animateLeaveClass: animateLeaveClass
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

          <div className="right">
          <label htmlFor="animateEnter">Page enter</label>
          <Select ref="animateEnterSelect" value={this.state.animateEnterClass} onChange={this.onChangeAnimateEnter.bind(this)} id="animateEnter"></Select>

          <label htmlFor="animateLeave">Page exit</label>
          <Select value={this.state.animateLeaveClass} onChange={this.onChangeAnimateLeave.bind(this)} id="animateLeave"></Select>
          </div>
          </div>

          <span className="banderole forkongithub">
            <a href="https://github.com/soenkekluth/react-css-animate">Fork me on GitHub</a>
          </span>
        </div>

        <Main pageName={this.state.pageName} animateEnterClass={this.state.animateEnterClass} animateLeaveClass={this.state.animateLeaveClass}>
          {page}
        </Main>

      </div>
    );
  }
}

export default App;


/*
        {React.cloneElement(this.props.children, { children: page, pageName:this.state.pageName, animateEnterClass:this.state.animateEnterClass, animateLeaveClass:this.state.animateLeaveClass })}


<Main pageName={this.state.pageName} animateEnterClass={this.state.animateEnterClass} animateLeaveClass={this.state.animateLeaveClass}>
  {page}
</Main>
 */
