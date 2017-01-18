import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import CSSAnimate from './css-animate';
import ReactDOM from 'react-dom';


export default class CSSAnimateGroup extends PureComponent {

  static propTypes = {
    tagName: PropTypes.string,

    autoHeight: PropTypes.bool,
    keepLeavePosition: PropTypes.bool,
    baseClass: PropTypes.string,

    appearClass: PropTypes.string,
    appearDuration: PropTypes.string,
    appearDelay: PropTypes.string,

    enterClass: PropTypes.string,
    enterDuration: PropTypes.string,
    enterDelay: PropTypes.string,
    enterTiming: PropTypes.string,
    hideEnter: PropTypes.bool,

    leaveClass: PropTypes.string,
    leaveDuration: PropTypes.string,
    leaveDelay: PropTypes.string,
    leaveTiming: PropTypes.string,

    onStart: PropTypes.func,
    onEnd: PropTypes.func,

    onAppearStart: PropTypes.func,
    onAppearIteration: PropTypes.func,
    onAppearEnd: PropTypes.func,

    onEnterStart: PropTypes.func,
    onEnterIteration: PropTypes.func,
    onEnterEnd: PropTypes.func,

    onLeaveStart: PropTypes.func,
    onLeaveEnd: PropTypes.func,
    onLeaveIteration: PropTypes.func
  };


  static defaultProps = {
    style: { position: 'relative' },
    tagName: 'div',
    hideEnter: false,
    autoHeight: true,
    keepLeavePosition: true,
    baseClass: 'animated',
    appearClass: 'fadeIn',
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut'
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      animating: false,
      minHeight: 0
    };

    this.onLeaveStart = this.onLeaveStart.bind(this);
    this.onLeaveEnd = this.onLeaveEnd.bind(this);
    this.onEnterEnd = this.onEnterEnd.bind(this);
    this.onEnterStart = this.onEnterStart.bind(this);
    this.onEnterEnd = this.onEnterEnd.bind(this);

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


  onEnterEnd(event) {
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


  onLeaveEnd(event) {

    this.animatLeave = false;
    this.lastChildren = null;
    if (!this.animatEnter) {
      this.setState({
        animating: false,
        minHeight: this.props.autoHeight ? null : this.state.minHeight
      })
    }
  }

  onEnterStart(event) {
    this.animatEnter = true;
    let nextState = {
      animating: true
    };
    if (this.props.autoHeight && this.refs.current) {
      nextState.minHeight = ReactDOM.findDOMNode(this.refs.current).clientHeight;
    }
    this.setState(nextState)
  }

  onLeaveStart(event) {
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
      const { tagName, id, className, children, style, autoHeight, appearClass, appearDuration, appearDelay, onAppearStart, onAppearIteration, onAppearEnd, onEnterStart, onEnterIteration, onEnterEnd, ...props } = this.props;
      return <CSSAnimate ref="last" key={this.lastChildren.key} enter={false} leave={true} remove={true} onLeaveStart={this.onLeaveStart} onLeaveEnd={this.onLeaveEnd} {...props}>{this.lastChildren}</CSSAnimate>
    }
  }

  renderCurrentChild() {
    const { tagName, id, className, children, style, autoHeight, appearClass, appearDuration, appearDelay, onAppearStart, onAppearIteration, onAppearEnd, onLeaveStart, onLeaveEnd, onLeaveIteration, ...props } = this.props;
    return <CSSAnimate ref="current" key={children.key} hideEnter={true} enter={true} leave={false} remove={true} onEnterStart={this.onEnterStart} onEnterEnd={this.onEnterEnd} {...props}>{children}</CSSAnimate>
  }

  render() {

    const { tagName, className, children, style, autoHeight, hideEnter, keepLeavePosition, baseClass, appearClass, appearDuration, appearDelay, enterClass, enterDuration, enterDelay, enterTiming, leaveClass, leaveDuration, leaveDelay, leaveTiming, onStart, onEnd, onAppearStart, onAppearIteration, onAppearEnd, onEnterStart, onEnterIteration, onEnterEnd, onLeaveStart, onLeaveEnd, onLeaveIteration, ...props } = this.props;
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
  enterClass="fadeIn"
  enterDelay="190ms"
  leaveClass="zoomOut"
  className="main-content">
  {React.cloneElement(this.props.children, {
    key: this.props.location.pathname
  })}
</CSSAnimationGroup>
 */
