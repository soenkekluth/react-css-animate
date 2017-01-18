import React, { PureComponent , Component, PropTypes } from 'react';
import classNames from 'classnames';
import AnimationUtils from './animation-utils';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

export default class CSSAnimate extends PureComponent {

  static propTypes = {
    tagName: React.PropTypes.string,

    enter: React.PropTypes.bool,
    leave: React.PropTypes.bool,
    keepLeavePosition: React.PropTypes.bool,

    disabled: React.PropTypes.bool,
    remove: React.PropTypes.bool,
    hideLeaveEnd: React.PropTypes.bool,
    hideEnter: React.PropTypes.bool,
    hide: React.PropTypes.bool,

    timeoutFallback: React.PropTypes.bool,

    baseClass: React.PropTypes.string,

    hiddenStyle: React.PropTypes.object,

    enterClass: React.PropTypes.string,
    leaveClass: React.PropTypes.string,
    enterEndClass: React.PropTypes.string,
    leaveEndClass: React.PropTypes.string,

    enterDelay: React.PropTypes.string,
    leaveDelay: React.PropTypes.string,

    enterDuration: React.PropTypes.string,
    leaveDuration: React.PropTypes.string,

    enterTiming: React.PropTypes.string,
    leaveTiming: React.PropTypes.string,

    onEnd: React.PropTypes.func,

    onEnterStart: React.PropTypes.func,
    onEnterIteration: React.PropTypes.func,
    onEnterEnd: React.PropTypes.func,

    onLeaveStart: React.PropTypes.func,
    onLeaveIteration: React.PropTypes.func,
    onLeaveEnd: React.PropTypes.func
  };

  static defaultProps = {
    baseClass: 'animated',
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut',
    enterEndClass: null,
    leaveEndClass: null,
    hiddenStyle: {'visibility': 'hidden'},
    enter: false,
    leave: false,
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

    this.enter = this.enter.bind(this);
    this.leave = this.leave.bind(this);

    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.hasAnimationListener = false;

    this.state = {
      enterEnd: false,
      leaveEnd: false,
      enter: props.enter,
      leave: props.leave,
      enterStart: false,
      leaveStart: false,
      width: null,
      height: null
    };
  }

  enter() {
    const element = ReactDOM.findDOMNode(this.element);
    var height = element ? element.scrollHeight : 0;

    this.setState({
      enterEnd: false,
      enter: true,
      height: height,
      leave: false
    });
  }

  leave() {
    const element = ReactDOM.findDOMNode(this.element);
    var width = element ? element.clientWidth : 0;
    this.setState({
      leaveEnd: false,
      leave: true,
      enter: false,
      width: width,
      height: 0
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (nextProps.leave  !== this.props.leave || nextProps.enter !== this.props.enter)
  // }

  componentWillUpdate(nextProps, nextState) {
    const element = ReactDOM.findDOMNode(this.element);
    if (nextProps.leave && !this.props.leave && !this.state.leave) {
      nextState.enterEnd = false;
      nextState.leaveEnd = false;
      nextState.enter = false;
      nextState.leave = true;
      nextState.enterStart = false;
      nextState.leaveStart = true;

      nextState.height = 0;

      this.addAnimationListener();

      if (element && nextProps.keepLeavePosition) {
        nextState.width = element.clientWidth;
      }
    } else if (nextProps.enter && !this.props.enter && !this.state.enter) {
      nextState.enterEnd = false;
      nextState.leaveEnd = false;
      nextState.enter = true;
      nextState.leave = false;
      nextState.enterStart = false;
      nextState.leaveStart = false;


      this.addAnimationListener();

      if (element) {
        nextState.height = element.scrollHeight;
      }
    }
  }

  addAnimationListener() {

    if (!this.hasAnimationListener) {
      const element = ReactDOM.findDOMNode(this.element);
      if (element) {
        AnimationUtils.onAnimationStart(element, this.onStart);
        AnimationUtils.onAnimationEnd(element, this.onEnd);
        this.hasAnimationListener = true;
      }
    }
  }


  removeAnimationListener() {
    if (this.hasAnimationListener) {
      const element = ReactDOM.findDOMNode(this.element);
      if (element) {
        AnimationUtils.offAnimationEnd(element, this.onEnd);
        AnimationUtils.offAnimationStart(element, this.onStart);
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

    const animating = this.state.enter || this.state.leave;

    if (this.props.remove && this.state.leaveEnd) {
      return null;
    }

    var { className, ...props } = this.props;
    var animationClass = null;
    var animationEndClass = null;
    var style = this.props.style ? assign({}, this.props.style) : {};



    if (this.props.enterClass === 'slideDown' /*&& animating || this.state.leaveEnd*/ ) {
      style.maxHeight = this.state.height;
    }

    if (animating) {

      animationClass = classNames(this.props.baseClass, {
        [this.props.enterClass]: this.state.enter,
        'enter': this.state.enter,
        [this.props.leaveClass]: this.state.leave,
        'leave': this.state.leave
      })

      if (this.state.enter) {
        if (this.props.enterDelay) {
          style.animationDelay = this.props.enterDelay;
          if ((this.props.hide || this.props.hideEnter) && !this.state.enterStart) {
            style = assign({},style, this.props.hiddenStyle) ;
            // style.visibility = 'hidden';
          }

        }
        if (this.props.enterDuration) {
          style.animationDuration = this.props.enterDuration;
        }
        if (this.props.enterTiming) {
          style.animationTimingFunction = this.props.enterTiming;
        }
      } else if (this.state.leave) {
        if (this.props.keepLeavePosition) {
          style.position = 'absolute';
          style.width = this.state.width + 'px';
          // style.top = '0';
          // style.zIndex = -100;
          // style.left = '0';
        }
        if (this.props.leaveDelay) {
          style.animationDelay = this.props.leaveDelay;
        }
        if (this.props.leaveDuration) {
          style.animationDuration = this.props.leaveDuration;
        }
        if (this.props.leaveTiming) {
          style.animationTimingFunction = this.props.leaveTiming;
        }
      }
      style = AnimationUtils.prefix(style);

    } else {
      if (this.props.enterEndClass || this.props.leaveEndClass) {
        animationEndClass = classNames({
          [this.props.enterEndClass]: !!this.props.enterEndClass && this.state.enterEnd,
          [this.props.leaveEndClass]: !!this.props.leaveEndClass && this.state.leaveEnd
        })
      }
    }

    if ((this.props.hide || this.props.hideLeaveEnd) && this.state.leaveEnd) {
     style = assign({},style, this.props.hiddenStyle) ;
    }

    className = classNames('css-animation', className, animationClass, animationEndClass);

    let element = React.Children.only(this.props.children);

    if (!element || this.props.tagName) {
      const type = this.props.tagName || 'div';
      element = React.createElement(
        type, {
          ref:(element) => { this.element = element; },
          className: className,
          style: style,
        },
        this.props.children
      );

    } else {
      element = React.cloneElement(element, { ref: (element) => { this.element = element; }, className: classNames(element.props ? element.props.className : null, className), style: style });
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


  onEnd(e) {
    // console.log(this.element.__proto__)

    this.removeAnimationListener();

    const element = ReactDOM.findDOMNode(this.element);
    var cb;

    if (e.target === element) {

      if (this.props.timeoutFallback) {
        clearTimeout(this.endTimeout);
      }

      var state = {
        enter: false,
        leave: false
      };

      if (e.animationName === this.props.enterClass) {
        cb = this.props.onEnterEnd;

        state.enterEnd = true;
        state.leaveEnd = false;
        state.enter = false;
        state.leave = false;
        state.leaveStart = false;
        state.enterStart = false;

      } else if (e.animationName === this.props.leaveClass) {
        cb = this.props.onLeaveEnd;
        state.enterEnd = false;
        state.leaveEnd = true;
        state.enter = false;
        state.leave = false;
        state.leaveStart = false;
        state.enterStart = false;
      }


      if (this.props.onEnd) {
        if (!cb) {
          cb = this.props.onEnd;
        } else {
          cb = (e) => {
            cb(e);
            this.props.onEnd(e);
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

  onStart(e) {

    const element = ReactDOM.findDOMNode(this.element);
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
            this.onEnd(e);
          }, ms + 10);
        }

      }

      if (e.animationName === this.props.enterClass) {
        this.setState({
          enterEnd: false,
          leaveEnd: false,
          enter: true,
          leave: false,
          leaveStart: false,
          enterStart: true
        })
        cb = this.props.onEnterStart;
      } else if (e.animationName === this.props.leaveClass) {
        this.setState({
          enterEnd: false,
          leaveEnd: false,
          enter: false,
          leave: true,
          leaveStart: true,
          enterStart: false
        })
        cb = this.props.onLeaveStart;
      }

      if (this.props.onStart) {
        if (!cb) {
          cb = this.props.onStart;
        } else {
          cb = (e) => {
            cb(e);
            this.props.onStart(e);
          }
        }
      }

      if (cb) {
        cb(this.createEventObject(e));
      }

    }
  }

}
