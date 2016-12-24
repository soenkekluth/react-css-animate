import React, { Component } from 'react';
import CSSAnimateGroup from '../lib/css-animate-group';
import {easeOutExpo} from '../lib/css-easing';


export default class Main extends Component {

  static propTypes = {
    pageName: React.PropTypes.string,
    animateEnterClass: React.PropTypes.string,
    animateLeaveClass: React.PropTypes.string
  };

  static defaultProps = {
    pageName: 'page',
    animateEnterClass: 'rotateInUpRight',
    animateLeaveClass: 'hinge'
  };

  render() {
    return (

      <CSSAnimateGroup
        ref="main"
        tagName="main"
        id="main"
        keepLeavePosition={true}
        animateEnterClass={this.props.animateEnterClass}
        animateEnterDuration="400ms"
        animateEnterTiming={easeOutExpo}
        animateEnterDelay="300ms"
        animateLeaveClass={this.props.animateLeaveClass}
        className="main-content">
        {React.cloneElement(this.props.children, {
          key: this.props.pageName
        })}
      </CSSAnimateGroup>


    );
  }
}




