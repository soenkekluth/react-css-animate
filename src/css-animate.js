import React, { PureComponent , Component, PropTypes } from 'react';
import classNames from 'classnames';
import AnimationUtils from './animation-utils';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

export default class CSSAnimate extends PureComponent {

  static propTypes = {

    tagName: React.PropTypes.string,

    animateEnter: React.PropTypes.bool,
    animateLeave: React.PropTypes.bool,
    keepLeavePosition: React.PropTypes.bool,


    animateEnterLeave: React.PropTypes.bool,
    animateLeaveEnter: React.PropTypes.bool,

    disabled: React.PropTypes.bool,
    remove: React.PropTypes.bool,
    hideLeaveEnd: React.PropTypes.bool,
    hideEnter: React.PropTypes.bool,
    hide: React.PropTypes.bool,

    timeoutFallback: React.PropTypes.bool,

    animateBaseClass: React.PropTypes.string,

    animateEnterClass: React.PropTypes.string,
    animateLeaveClass: React.PropTypes.string,
    animateEnterEndClass: React.PropTypes.string,
    animateLeaveEndClass: React.PropTypes.string,

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
    animateEnter: false,
    animateLeave: false,
    hide: false,
    hideEnter: false,
    hideLeaveEnd: false,
    keepLeavePosition: false,
    disabled: false,
    remove: false,
    timeoutFallback: false
  };

  constructor(props, context) {
    super(props, context);

    this.animateEnter = this.animateEnter.bind(this);
    this.animateLeave = this.animateLeave.bind(this);

    this.onAnimationStart = this.onAnimationStart.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);

    this.hasAnimationListener = false;

    this.state = {
      animateEnterEnd: false,
      animateLeaveEnd: false,
      animateEnter: props.animateEnter,
      animateLeave: props.animateLeave,
      animateEnterStart: false,
      animateLeaveStart: false,
      width: null,
      height: null
    };
  }

  animateEnter() {
    const element = ReactDOM.findDOMNode(this.refs.element);
    var height = element ? element.scrollHeight : 0;

    this.setState({
      animateEnterEnd: false,
      animateEnter: true,
      height: height,
      animateLeave: false
    });
  }

  animateLeave() {
    const element = ReactDOM.findDOMNode(this.refs.element);
    var width = element ? element.clientWidth : 0;
    this.setState({
      animateLeaveEnd: false,
      animateLeave: true,
      animateEnter: false,
      width: width,
      height: 0
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (nextProps.animateLeave  !== this.props.animateLeave || nextProps.animateEnter !== this.props.animateEnter)
  // }

  componentWillUpdate(nextProps, nextState) {
    const element = ReactDOM.findDOMNode(this.refs.element);
    if (nextProps.animateLeave && !this.props.animateLeave && !this.state.animateLeave) {
      nextState.animateEnterEnd = false;
      nextState.animateLeaveEnd = false;
      nextState.animateEnter = false;
      nextState.animateLeave = true;
      nextState.animateEnterStart = false;
      nextState.animateLeaveStart = true;

      nextState.height = 0;

      this.addAnimationListener();

      if (element && nextProps.keepLeavePosition) {
        nextState.width = element.clientWidth;
      }
    } else if (nextProps.animateEnter && !this.props.animateEnter && !this.state.animateEnter) {
      nextState.animateEnterEnd = false;
      nextState.animateLeaveEnd = false;
      nextState.animateEnter = true;
      nextState.animateLeave = false;
      nextState.animateEnterStart = false;
      nextState.animateLeaveStart = false;


      this.addAnimationListener();

      if (element) {
        nextState.height = element.scrollHeight;
      }
    }
  }

  addAnimationListener() {

    if (!this.hasAnimationListener) {
      const element = ReactDOM.findDOMNode(this.refs.element);
      if (element) {
        AnimationUtils.onAnimationStart(element, this.onAnimationStart);
        AnimationUtils.onAnimationEnd(element, this.onAnimationEnd);
        this.hasAnimationListener = true;
      }
    }
  }


  removeAnimationListener() {
    if (this.hasAnimationListener) {
      const element = ReactDOM.findDOMNode(this.refs.element);
      if (element) {
        AnimationUtils.offAnimationEnd(element, this.onAnimationEnd);
        AnimationUtils.offAnimationStart(element, this.onAnimationStart);
        this.hasAnimationListener = false;
      }
    }
  }

  componentWillMount() {
    AnimationUtils.init();
    this.addAnimationListener();
  }

  componentDidMount() {
    AnimationUtils.init();
    this.addAnimationListener();
  }

  componentWillUnmount() {
    this.removeAnimationListener();
  }


  render() {

    const animating = true;//this.state.animateEnter || this.state.animateLeave;

    if (this.props.remove && this.state.animateLeaveEnd) {
      return null;
    }

    var { className, ...props } = this.props;
    var animationClass = null;
    var animationEndClass = null;
    var style = this.props.style ? assign({}, this.props.style) : {};



    if (this.props.animateEnterClass === 'slideDown' /*&& animating || this.state.animateLeaveEnd*/ ) {
      style.maxHeight = this.state.height;
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
          if ((this.props.hide || this.props.hideEnter) && !this.state.animateEnterStart) {
            style.visibility = 'hidden';
          }

        }
        if (this.props.animateEnterDuration) {
          style.animationDuration = this.props.animateEnterDuration;
        }
        if (this.props.animateEnterTiming) {
          style.animationTimingFunction = this.props.animateEnterTiming;
        }
      } else if (this.state.animateLeave) {
        if (this.props.keepLeavePosition) {
          style.position = 'absolute';
          style.width = this.state.width + 'px';
          // style.top = '0';
          // style.zIndex = -100;
          // style.left = '0';
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

    } else {
      if (this.props.animateEnterEndClass || this.props.animateLeaveEndClass) {
        animationEndClass = classNames({
          [this.props.animateEnterEndClass]: this.state.animateEnterEnd,
          [this.props.animateLeaveEndClass]: this.state.animateLeaveEnd
        })
      }
    }


    if ((this.props.hide || this.props.hideLeaveEnd) && this.state.animateLeaveEnd) {
      style.visibility = 'hidden';
    }



    className = classNames('css-animation', className, animationClass, animationEndClass);

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
    // console.log(this.refs.element.__proto__)

    this.removeAnimationListener();

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

        state.animateEnterEnd = true;
        state.animateLeaveEnd = false;
        state.animateEnter = false;
        state.animateLeave = false;
        state.animateLeaveStart = false;
        state.animateEnterStart = false;

      } else if (e.animationName === this.props.animateLeaveClass) {
        cb = this.props.onAnimateLeaveEnd;
        state.animateEnterEnd = false;
        state.animateLeaveEnd = true;
        state.animateEnter = false;
        state.animateLeave = false;
        state.animateLeaveStart = false;
        state.animateEnterStart = false;
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
        this.setState({
          animateEnterEnd: false,
          animateLeaveEnd: false,
          animateEnter: true,
          animateLeave: false,
          animateLeaveStart: false,
          animateEnterStart: true
        })
        cb = this.props.onAnimateEnterStart;
      } else if (e.animationName === this.props.animateLeaveClass) {
        this.setState({
          animateEnterEnd: false,
          animateLeaveEnd: false,
          animateEnter: false,
          animateLeave: true,
          animateLeaveStart: true,
          animateEnterStart: false
        })
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
