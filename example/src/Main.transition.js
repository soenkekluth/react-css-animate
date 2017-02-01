import React, { Component } from 'react';
import CSSAnimateGroup from '../lib/css-animate-group';
import {easeOutExpo} from '../lib/css-easing';


export default class Main extends Component {

  static propTypes = {
    pageName: React.PropTypes.string,
    animateEnterName: React.PropTypes.string,
    animateLeaveName: React.PropTypes.string
  };

  static defaultProps = {
    pageName: 'page',
    animateEnterName: 'rotateInUpRight',
    animateLeaveName: 'hinge'
  };


  render() {
    return (


      <CSSAnimateGroup
        ref="main"
        tagName="main"
        id="main"
        leaveAbsolute
        animationType="transition"
        animateBaseName="transition"
        animateEnterName="transitionIn"
        transitionEnterProperty="opacity"
        animateEnterDelay="100ms"
        animateEnterDuration="1000ms"
        animateLeaveDuration="1000ms"
        animateLeaveName="transitionOut"
        className="main-content">
        {React.cloneElement(this.props.children, {
          name: this.props.pageName,
          key: this.props.pageName
        })}
      </CSSAnimateGroup>


    );
  }
}




/*




export default class Main extends Component {

  static propTypes = {
    pageName: React.PropTypes.string,
    animateEnterName: React.PropTypes.string,
    animateLeaveName: React.PropTypes.string
  };

  static defaultProps = {
    pageName: 'page',
    animateEnterName: 'rotateInUpRight',
    animateLeaveName: 'hinge'
  };

  render() {
    return (



    );
  }
}






 */
