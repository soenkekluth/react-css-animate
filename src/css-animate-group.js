import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import CSSAnimate from './css-animate';
import ReactDOM from 'react-dom';


export default class CSSAnimateGroup extends Component {

  static propTypes = {

    tagName: PropTypes.string,

    autoHeight: PropTypes.bool,
    keepLeavePosition: PropTypes.bool,
    animateBaseClass: PropTypes.string,

    animateAppearClass: PropTypes.string,
    animateAppearDuration: PropTypes.string,
    animateAppearDelay: PropTypes.string,

    animateEnterClass: PropTypes.string,
    animateEnterDuration: PropTypes.string,
    animateEnterDelay: PropTypes.string,
    animateEnterTiming: PropTypes.string,

    animateLeaveClass: PropTypes.string,
    animateLeaveDuration: PropTypes.string,
    animateLeaveDelay: PropTypes.string,
    animateLeaveTiming: PropTypes.string,

    onAnimationStart: PropTypes.func,
    onAnimationEnd: PropTypes.func,

    onAnimateAppearStart: PropTypes.func,
    onAnimateAppearIteration: PropTypes.func,
    onAnimateAppearEnd: PropTypes.func,

    onAnimateEnterStart: PropTypes.func,
    onAnimateEnterIteration: PropTypes.func,
    onAnimateEnterEnd: PropTypes.func,

    onAnimateLeaveStart: PropTypes.func,
    onAnimateLeaveEnd: PropTypes.func,
    onAnimateLeaveIteration: PropTypes.func
  };


  static defaultProps = {
    style: { position: 'relative' },
    tagName: 'div',
    autoHeight: true,
    keepLeavePosition: true,
    animateBaseClass: 'animated',
    animateAppearClass: 'fadeIn',
    animateEnterClass: 'fadeIn',
    animateLeaveClass: 'fadeOut'
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



  shouldComponentUpdate(nextProps, nextState) {
    return ((nextProps.children.key !== this.props.children.key) || nextState.animating !== this.state.animating);
  }


  componentWillUpdate(nextProps, nextState) {
    if (nextProps.children.key !== this.props.children.key) {
      if (this.refs.current) {
        nextState.minHeight = ReactDOM.findDOMNode(this.refs.current).clientHeight;
      }
      nextState.animating = true;
    }
  }


  onAnimateEnterEnd(event) {
    this.animatEnter = false;

    if (!this.animatLeave) {
      this.setState({
        animating: false,
        minHeight: this.props.autoHeight ? null : this.state.minHeight
      })
    } else if (this.props.autoHeight) {
      this.setState({ minHeight: ReactDOM.findDOMNode(this.refs.current).clientHeight })
    }
  }


  onAnimateLeaveEnd(event) {

    this.animatLeave = false;
    this.lastChildren = null;
    if (!this.animatEnter) {
      this.setState({
        animating: false,
        minHeight: this.props.autoHeight ? null : this.state.minHeight
      })
    }
  }

  onAnimateEnterStart(event) {
    this.animatEnter = true;
    let nextState = {
      animating: true
    };
    if (this.props.autoHeight && this.refs.current) {
      nextState.minHeight = ReactDOM.findDOMNode(this.refs.current).clientHeight;
    }
    this.setState(nextState)
  }

  onAnimateLeaveStart(event) {
    this.animatLeave = true;
    if (!this.state.animating) {
      this.setState({
        animating: true
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children.key !== this.props.children.key) {
      this.lastChildren = React.cloneElement(this.props.children);
    }
  }

  renderChildren() {
    const { tagName, autoHeight, onAnimateLeaveStart, onAnimateEnterStart, onAnimateLeaveEnd, onAnimateEnterEnd, id, className, ...props } = this.props;

    if (this.lastChildren && this.lastChildren.key !== this.props.children.key) {
      return [
        <CSSAnimate ref="last" key={this.lastChildren.key} animateEnter={false} animateLeave={true} remove={true} keepLeavePosition={this.props.keepLeavePosition}  onAnimateLeaveStart={this.onAnimateLeaveStart.bind(this)} onAnimateLeaveEnd={this.onAnimateLeaveEnd.bind(this)} {...props}>{this.lastChildren}</CSSAnimate>,
        <CSSAnimate ref="current" key={this.props.children.key} animateLeave={false} animateEnter={true} onAnimateEnterStart={this.onAnimateEnterStart.bind(this)} onAnimateEnterEnd={this.onAnimateEnterEnd.bind(this)} {...props}>{this.props.children}</CSSAnimate>
      ];
    }
    return <CSSAnimate ref="current" key={this.props.children.key} animateLeave={false} onAnimateEnterStart={this.onAnimateEnterStart.bind(this)} onAnimateEnterEnd={this.onAnimateEnterEnd.bind(this)} animateEnter={true} {...props}>{this.props.children}</CSSAnimate>
  }

  render() {

    const { tagName, className, children, style, autoHeight, keepLeavePosition, animateBaseClass, animateAppearClass, animateAppearDuration, animateAppearDelay, animateEnterClass, animateEnterDuration, animateEnterDelay, animateEnterTiming, animateLeaveClass, animateLeaveDuration, animateLeaveDelay, animateLeaveTiming, onAnimationStart, onAnimationEnd, onAnimateAppearStart, onAnimateAppearIteration, onAnimateAppearEnd, onAnimateEnterStart, onAnimateEnterIteration, onAnimateEnterEnd, onAnimateLeaveStart, onAnimateLeaveEnd, onAnimateLeaveIteration, ...props } = this.props;
    const Comp = tagName;
    const s = {...style };

    if (autoHeight) {
      s.minHeight = this.state.minHeight === null ? null : this.state.minHeight + 'px';
    }

    const cname = classNames(className, 'css-animation-group');
    return (
      <Comp className={cname} {...props} style={s}>
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
