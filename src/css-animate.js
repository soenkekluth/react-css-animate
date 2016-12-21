import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import AnimationUtils from './animation-utils';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

export default class CSSAnimate extends Component {

  static propTypes = {

    tagName: React.PropTypes.string,

    animateToggle: React.PropTypes.bool,

    animateEnter: React.PropTypes.bool,
    animateLeave: React.PropTypes.bool,
    keepLeavePosition: React.PropTypes.bool,


    animateEnterLeave: React.PropTypes.bool,
    animateLeaveEnter: React.PropTypes.bool,

    disabled: React.PropTypes.bool,
    remove: React.PropTypes.bool,
    hide: React.PropTypes.bool,

    timeoutFallback: React.PropTypes.bool,

    animateBaseClass: React.PropTypes.string,

    animateEnterClass: React.PropTypes.string,
    animateLeaveClass: React.PropTypes.string,

    animateEnterDelay: React.PropTypes.string,
    animateLeaveDelay: React.PropTypes.string,

    animateEnterDuration: React.PropTypes.string,
    animateLeaveDuration: React.PropTypes.string,

    animateEnterTiming: React.PropTypes.string,
    animateLeaveTiming: React.PropTypes.string,

    onAnimationEnd: React.PropTypes.func,

    onAnimateEnterStart: React.PropTypes.func,
    onAnimateEnterIteration: React.PropTypes.func,
    onAnimateEnterEnd: React.PropTypes.func,

    onAnimateLeaveStart: React.PropTypes.func,
    onAnimateLeaveIteration: React.PropTypes.func,
    onAnimateLeaveEnd: React.PropTypes.func
  };

  static defaultProps = {
    animateBaseClass: 'animated',
    animateEnterClass: 'fadeIn',
    animateLeaveClass: 'fadeOut',
    animateToggle: null,
    animateEnter: false,
    animateLeave: false,
    keepLeavePosition: false,
    disabled: false,
    remove: false,
    hide: false,
    timeoutFallback: false
  };

  constructor(props, context) {
    super(props, context);

    this.animateEnterPromise = null;
    this.animateLeavePromise = null;

    this.animateEnter = this.animateEnter.bind(this);
    this.animateLeave = this.animateLeave.bind(this);

    this.onAnimationStart = this.onAnimationStart.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);

    this.state = {
      animateEnterComplete: false,
      animateLeaveComplete: false,
      animateEnter: props.animateEnter,
      animateLeave: props.animateLeave,
      height: null
    };

  }


  animateEnter() {
    const element = ReactDOM.findDOMNode(this.refs.element);
    var height = element ? element.scrollHeight : 0;

    this.setState({
      animateEnterComplete: false,
      animateEnter: true,
      height: height,
      animateLeave: false
    });
  }

  animateLeave() {
    this.setState({
      animateLeaveComplete: false,
      animateLeave: true,
      animateEnter: false,
      height: 0
    });
  }



  componentWillUpdate(nextProps, nextState) {
    const element = ReactDOM.findDOMNode(this.refs.element);
    if (nextProps.animateLeave && !this.props.animateLeave && !this.state.animateLeave) {
      nextState.animateLeaveComplete = false;
      nextState.animateLeave = true;
      nextState.animateEnter = false;
      nextState.height = 0;
    } else if (nextProps.animateEnter && !this.props.animateEnter && !this.state.animateEnter) {
      nextState.animateEnterComplete = false;
      nextState.animateEnter = true;
      if (element) {
        nextState.height = element.scrollHeight;
      }
      nextState.animateLeave = false;
    }
  }


  addListener() {
    if (!this.hasListener) {
      const element = ReactDOM.findDOMNode(this.refs.element);
      if (element) {
        this.hasListener = true;
        AnimationUtils.onAnimationStart(element, this.onAnimationStart);
        AnimationUtils.onAnimationEnd(element, this.onAnimationEnd);
      }
    }
  }

  componentWillMount() {
   AnimationUtils.init();
  }

  componentDidMount() {
    AnimationUtils.init();
    this.addListener();
  }

  componentWillUnmount() {
    const element = ReactDOM.findDOMNode(this.refs.element);
    if(element){

      AnimationUtils.offAnimationEnd(element, this.onAnimationEnd);
      AnimationUtils.offAnimationStart(element, this.onAnimationStart);
    }
  }

  render() {


    const animating = this.state.animateEnter || this.state.animateLeave;

    if (this.props.remove && !animating && this.state.animateLeaveComplete) {
      return null;
    }

    let { className, ...props } = this.props;
    let animationClass = null;
    let style = {};

    if (this.props.animateEnterClass === 'slideDown' /*&& animating || this.state.animateLeaveComplete*/ ) {
      style.maxHeight = this.state.height
    }



    if (animating) {

      animationClass = classNames(this.props.animateBaseClass, {
        [this.props.animateEnterClass]: this.state.animateEnter,
        'animateEnter': this.state.animateEnter,
        [this.props.animateLeaveClass]: this.state.animateLeave,
        'animateLeave': this.state.animateLeave
      })

      if (this.state.animateEnter) {
        if (this.props.animateEnterDelay) {
          style.animationDelay = this.props.animateEnterDelay;
        }
        if (this.props.animateEnterDuration) {
          style.animationDuration = this.props.animateEnterDuration;
        }
        if (this.props.animateEnterTiming) {
          style.animationTimingFunction = this.props.animateEnterTiming;
        }
      } else {
        if(this.props.keepLeavePosition){
          style.position = 'absolute';
          style.width = '100%';
          style.top = '0';
          style.zIndex = -100;
          style.left = '0';
        }
        if (this.props.animateLeaveDelay) {
          style.animationDelay = this.props.animateLeaveDelay;
        }
        if (this.props.animateLeaveDuration) {
          style.animationDuration = this.props.animateLeaveDuration;
        }
        if (this.props.animateLeaveTiming) {
          style.animationTimingFunction = this.props.animateLeaveTiming;
        }
      }

      style = AnimationUtils.prefix(style);
    }

    var  visibleClass = (!animating && this.state.animateLeaveComplete && this.props.hide) ? 'is-hidden' : null;
    visibleClass = (animating || this.state.animateEnterComplete) ? 'is-showing' : visibleClass;

    className = classNames('css-animation', className, animationClass, visibleClass);

    let element = React.Children.only(this.props.children);

    if (!element || this.props.tagName) {
      const Comp = this.props.tagName || 'div';
      element = <Comp ref='element' style={style} className={className}>{this.props.children}</Comp>;
    } else {
      className = classNames(element.props.className, className);
      element = React.cloneElement(element, { ref: 'element', className: className, style: style });
    }

    return element;
  }


  createEventObject(event) {
    if (!event) {
      return null;
    }
    var preventDefault = function() {
      event.preventDefault();
    };

    return {
      originalEvent: event,
      preventDefault: preventDefault,
      target: this,
      type: event.type,
      props: this.props
    }
  }


  onAnimationEnd(e) {
    const element = ReactDOM.findDOMNode(this.refs.element);
    var cb;

    if (e.target === element) {

      if (this.props.timeoutFallback) {
        clearTimeout(this.endTimeout);
      }

      var state = {
        animateEnter: false,
        animateLeave: false
      };

      if (e.animationName === this.props.animateEnterClass) {
        cb = this.props.onAnimateEnterEnd;
        state.animateLeaveComplete = false;
        state.animateEnterComplete = true;
      } else if (e.animationName === this.props.animateLeaveClass) {
        cb = this.props.onAnimateLeaveEnd;
        state.animateLeaveComplete = true;
        state.animateEnterComplete = false;
      }


      if (this.props.onAnimationEnd) {
        if (!cb) {
          cb = this.props.onAnimationEnd;
        } else {
          cb = (e) => {
            cb(e);
            this.props.onAnimationEnd(e);
          }
        }
      }

      let evt = cb ? this.createEventObject(e) : null;
      this.setState(state, () => {
        if (cb) {
          cb(evt);
        }
      });
    }
  }

  onAnimationStart(e) {

    const element = ReactDOM.findDOMNode(this.refs.element);
    var cb;
    if (e.target === element) {

      if (this.props.timeoutFallback) {
        clearTimeout(this.endTimeout);

        let duration = window.getComputedStyle(element)['animation-duration'] || 0;
        let delay = window.getComputedStyle(element)['animation-delay'] || 0;

        if (duration) {
          let factor = duration.indexOf('ms') > -1 ? 1 : 1000;
          duration = parseInt(duration, 10) * factor;
        }

        if (delay) {
          let factor = delay.indexOf('ms') > -1 ? 1 : 1000;
          delay = parseInt(delay, 10) * factor;
        }

        const ms = duration + delay;
        if (ms) {
          this.endTimeout = setTimeout(() => {
            this.onAnimationEnd(e);
          }, ms + 10);
        }

      }


      if (e.animationName === this.props.animateEnterClass) {
        cb = this.props.onAnimateEnterStart;
      } else if (e.animationName === this.props.animateLeaveClass) {
        cb = this.props.onAnimateLeaveStart;
      }

      if (this.props.onAnimationStart) {
        if (!cb) {
          cb = this.props.onAnimationStart;
        } else {
          cb = (e) => {
            cb(e);
            this.props.onAnimationStart(e);
          }
        }
      }

      if (cb) {
        cb(this.createEventObject(e));
      }

    }
  }

}
