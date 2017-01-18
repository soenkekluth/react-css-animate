import React, { Component } from 'react';
import CSSAnimateGroup from '../lib/css-animate-group';
import {easeOutExpo} from '../lib/css-easing';


export default class Main extends Component {

  static propTypes = {
    pageName: React.PropTypes.string,
    enterClass: React.PropTypes.string,
    leaveClass: React.PropTypes.string
  };

  static defaultProps = {
    pageName: 'page',
    enterClass: 'rotateInUpRight',
    leaveClass: 'hinge'
  };

  render() {
    return (

      <CSSAnimateGroup
        ref="main"
        tagName="main"
        id="main"
        keepLeavePosition
        hideEnter
        enterClass={this.props.enterClass}
        enterDuration="400ms"
        enterTiming={easeOutExpo}
        enterDelay="300ms"
        leaveClass={this.props.leaveClass}
        className="main-content">
        {React.cloneElement(this.props.children, {
          key: this.props.pageName
        })}
      </CSSAnimateGroup>


    );
  }
}




