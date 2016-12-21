import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import CSSAnimate from './css-animate';
import ReactDOM from 'react-dom';


export default class CSSAnimateGroup extends Component {

  static propTypes = {
    tagName: React.PropTypes.string,

    autoHeight: React.PropTypes.bool,
    keepLeavePosition: React.PropTypes.bool,
    animateBaseClass: React.PropTypes.string,

    animateAppearClass: React.PropTypes.string,
    animateAppearDuration: React.PropTypes.string,
    animateAppearDelay: React.PropTypes.string,

    animateEnterClass: React.PropTypes.string,
    animateEnterDuration: React.PropTypes.string,
    animateEnterDelay: React.PropTypes.string,
    animateEnterTiming: React.PropTypes.string,

    animateLeaveClass: React.PropTypes.string,
    animateLeaveDuration: React.PropTypes.string,
    animateLeaveDelay: React.PropTypes.string,
    animateLeaveTiming: React.PropTypes.string,

    onAnimationStart: React.PropTypes.func,
    onAnimationEnd: React.PropTypes.func,

    onAnimateAppearStart: React.PropTypes.func,
    onAnimateAppearIteration: React.PropTypes.func,
    onAnimateAppearEnd: React.PropTypes.func,

    onAnimateEnterStart: React.PropTypes.func,
    onAnimateEnterIteration: React.PropTypes.func,
    onAnimateEnterEnd: React.PropTypes.func,

    onAnimateLeaveStart: React.PropTypes.func,
    onAnimateLeaveEnd: React.PropTypes.func,
    onAnimateLeaveIteration: React.PropTypes.func
  };


  static defaultProps = {
    tagName : 'div',
    autoHeight : true,
    keepLeavePosition : true,
    animateBaseClass:'animated',
    animateAppearClass : 'fadeIn',
    animateEnterClass : 'fadeIn',
    animateLeaveClass : 'fadeOut'
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      animating: false,
      minHeight: 0
    };

    this.animatEnter = false;
    this.animatLeave = false;
  }



  shouldComponentUpdate (nextProps, nextState) {
    return (
      ( nextProps.children.key !== this.props.children.key) || nextState.animating !== this.state.animating
    )
  }


  componentWillUpdate(nextProps, nextState){
    if(nextProps.children.key !== this.props.children.key) {
      if(this.refs.current){
        nextState.minHeight = ReactDOM.findDOMNode(this.refs.current).clientHeight;
      }
      nextState.animating = true;
    }
  }


  onAnimateEnterEnd(event){
    this.animatEnter = false;

    if(!this.animatLeave){
      this.setState({
        animating : false,
        minHeight: this.props.autoHeight ? null : this.state.minHeight
      })
    }else if(this.props.autoHeight){
      this.setState({minHeight:ReactDOM.findDOMNode(this.refs.current).clientHeight})
    }
  }


  onAnimateLeaveEnd(event){

    this.animatLeave = false;
    this.lastChildren = null;
    if(!this.animatEnter){
      this.setState({
        animating : false,
        minHeight: this.props.autoHeight ? null : this.state.minHeight
      })
    }
  }

  onAnimateEnterStart(event) {
    this.animatEnter = true;
    let nextState = {
      animating : true
    };
    if(this.props.autoHeight && this.refs.current){
      nextState.minHeight = ReactDOM.findDOMNode(this.refs.current).clientHeight;
    }
    this.setState(nextState)
  }

  onAnimateLeaveStart(event) {
    this.animatLeave = true;
    if(!this.state.animating){
      this.setState({
        animating : true
      })
    }
  }

  componentWillReceiveProps(props){
    if(props.children.key !== this.props.children.key){
      this.lastChildren = React.cloneElement(this.props.children);
    }
  }


  renderChildren() {

    const {tagName, autoHeight, onAnimateLeaveStart, onAnimateEnterStart, onAnimateLeaveEnd, onAnimateEnterEnd, id, className,  ...props} = this.props;

    if(this.lastChildren && this.lastChildren.key !== this.props.children.key) {
      return [
        <CSSAnimate ref="last" key={this.lastChildren.key} animateEnter={false} animateLeave={true} remove={true} keepLeavePosition={this.props.keepLeavePosition}  onAnimateLeaveStart={this.onAnimateLeaveStart.bind(this)} onAnimateLeaveEnd={this.onAnimateLeaveEnd.bind(this)} {...props}>{this.lastChildren}</CSSAnimate>,
        <CSSAnimate ref="current" key={this.props.children.key} animateLeave={false} animateEnter={true} onAnimateEnterStart={this.onAnimateEnterStart.bind(this)} onAnimateEnterEnd={this.onAnimateEnterEnd.bind(this)} {...props}>{this.props.children}</CSSAnimate>
      ];
    }
    return <CSSAnimate ref="current" key={this.props.children.key} animateLeave={false} onAnimateEnterStart={this.onAnimateEnterStart.bind(this)} onAnimateEnterEnd={this.onAnimateEnterEnd.bind(this)} animateEnter={true} {...props}>{this.props.children}</CSSAnimate>
  }


  render() {
    var {tagName, autoHeight, onAnimateLeaveStart, className, animateEnterClass,animateEnterDelay,animateLeaveClass,keepLeavePosition,animateBaseClass,animateAppearClass, onAnimateEnterStart,children, style, onAnimateLeaveEnd, onAnimateEnterEnd,  ...props} = this.props;
    const Comp = tagName;
    style = style || {};
    style.position = 'relative';
    if(this.props.autoHeight) {

      style.minHeight = this.state.minHeight === null ? null : this.state.minHeight+'px';
    }
    className = classNames(className, 'css-animation-group');
    return (
      <Comp className={className} {...props} style={style}>
        { this.renderChildren() }
      </Comp>
    );
  }

}



/*
<CSSAnimationGroup
  ref="main"
  tagName="main"
  id="main"
  animateEnterClass="fadeIn"
  animateEnterDelay="190ms"
  animateLeaveClass="zoomOut"
  className="main-content">
  {React.cloneElement(this.props.children, {
    key: this.props.location.pathname
  })}
</CSSAnimationGroup>
 */
