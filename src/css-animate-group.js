import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import CSSAnimate from './css-animate';
import ReactDOM from 'react-dom';


export default class CSSAnimateGroup extends PureComponent {

  static propTypes = {
    tagName: PropTypes.string,

    animationType: React.PropTypes.string,

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
    hideEnter: PropTypes.bool,

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
    animationType: CSSAnimate.ANIATION_TYPE_ANIMATION,
    style: { position: 'relative' },
    tagName: 'div',
    hideEnter: false,
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

    this.onAnimateLeaveStart = this.onAnimateLeaveStart.bind(this);
    this.onAnimateLeaveEnd = this.onAnimateLeaveEnd.bind(this);
    this.onAnimateEnterEnd = this.onAnimateEnterEnd.bind(this);
    this.onAnimateEnterStart = this.onAnimateEnterStart.bind(this);
    this.onAnimateEnterEnd = this.onAnimateEnterEnd.bind(this);

    this.animatEnter = false;
    this.animatLeave = false;
  }



  shouldComponentUpdate(nextProps, nextState) {
    // return (nextState.animating !== this.state.animating);
    return ((nextProps.children.key !== this.props.children.key) || (nextState.animating !== this.state.animating));
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
    } else if (this.props.autoHeight && this.refs.current) {
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

  renderLastChild() {
    if (this.lastChildren && this.lastChildren.key !== this.props.children.key) {
      const { tagName, id, className, children, style, animationType, autoHeight, animateAppearClass, animateAppearDuration, animateAppearDelay, onAnimateAppearStart, onAnimateAppearIteration, onAnimateAppearEnd, onAnimateEnterStart, onAnimateEnterIteration, onAnimateEnterEnd, ...props } = this.props;
      return <CSSAnimate ref="last" key={this.lastChildren.key} animationType={animationType} animateEnter={false} animateLeave={true} remove={true} onAnimateLeaveStart={this.onAnimateLeaveStart} onAnimateLeaveEnd={this.onAnimateLeaveEnd} {...props}>{this.lastChildren}</CSSAnimate>
    }
  }

  renderCurrentChild() {
    const { tagName, id, className, children, style, animationType, autoHeight, animateAppearClass, animateAppearDuration, animateAppearDelay, onAnimateAppearStart, onAnimateAppearIteration, onAnimateAppearEnd, onAnimateLeaveStart, onAnimateLeaveEnd, onAnimateLeaveIteration, ...props } = this.props;
    return <CSSAnimate ref="current" key={children.key} animationType={animationType} hideEnter={true} animateEnter={true} animateLeave={false} remove={false} onAnimateEnterStart={this.onAnimateEnterStart} onAnimateEnterEnd={this.onAnimateEnterEnd} {...props}>{children}</CSSAnimate>
  }

  render() {

    const { tagName, className, children, style, autoHeight, animationType, hideEnter, keepLeavePosition, animateBaseClass, animateAppearClass, animateAppearDuration, animateAppearDelay, animateEnterClass, animateEnterDuration, animateEnterDelay, animateEnterTiming, animateLeaveClass, animateLeaveDuration, animateLeaveDelay, animateLeaveTiming, onAnimationStart, onAnimationEnd, onAnimateAppearStart, onAnimateAppearIteration, onAnimateAppearEnd, onAnimateEnterStart, onAnimateEnterIteration, onAnimateEnterEnd, onAnimateLeaveStart, onAnimateLeaveEnd, onAnimateLeaveIteration, ...props } = this.props;
    const Comp = tagName;
    const s = {...style };

    if (autoHeight) {
      s.minHeight = this.state.minHeight === null ? null : this.state.minHeight + 'px';
    }


    return React.createElement(
      tagName, {
        ref :(element) => { this.element = element; },
        className: classNames(className, 'css-animation-group'),
        style: s,
        ...props,
      }, [
        this.renderLastChild(),
        this.renderCurrentChild()
      ]
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
