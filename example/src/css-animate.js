import React, { Component } from 'react';
import { classNames } from 'classnames';
import prefixAll from 'inline-style-prefix-all';
import ReactDOM from 'react-dom';
import 'object-assign';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var animationEventTypes = {
  'WebkitAnimation': {
    end: 'webkitAnimationEnd',
    start: 'webkitAnimationStart',
    iteration: 'webkitAnimationIteration'
  },
  'OAnimation': {
    end: 'oanimationend',
    start: 'oanimationstart',
    iteration: 'oanimationiteration'
  },
  'msAnimation': {
    end: 'MSAnimationEnd',
    start: 'MSAnimationStart',
    iteration: 'MSAnimationIteration'
  },
  'animation': {
    end: 'animationend',
    start: 'animationstart',
    iteration: 'animationiteration'
  }
};

var transitionEndEventType = {
  'transition': 'transitionend',
  'OTransition': 'otransitionend',
  'MozTransition': 'transitionend',
  'WebkitTransition': 'webkitTransitionEnd'
};

var AnimationUtils = function () {
  function AnimationUtils() {
    classCallCheck(this, AnimationUtils);

    this.animationName = 'animation';
    this.transitionName = 'transition';
    this.initialized = false;
  }

  createClass(AnimationUtils, [{
    key: 'init',
    value: function init() {
      if (!this.initialized) {
        if (typeof window !== 'undefined') {
          this.initialized = true;
          this.animationName = Object.keys(prefixAll({ 'animation': '' }))[0];
          this.transitionName = Object.keys(prefixAll({ 'transition': '' }))[0];
        }
      }
    }
  }, {
    key: 'prefix',
    value: function prefix(style) {
      return prefixAll(style);
    }
  }, {
    key: 'offAnimationEnd',
    value: function offAnimationEnd(element, listener) {
      var type = this.animationEventTypes.end;
      if (type && element.removeEventListener) {
        return element.removeEventListener(type, listener);
      }
    }
  }, {
    key: 'onAnimationEnd',
    value: function onAnimationEnd(element, listener) {
      var type = this.animationEventTypes.end;
      if (type && element.addEventListener) {
        return element.addEventListener(type, listener, false);
      }
    }
  }, {
    key: 'offAnimationStart',
    value: function offAnimationStart(element, listener) {
      var type = this.animationEventTypes.start;
      if (type && element.removeEventListener) {
        return element.removeEventListener(type, listener);
      }
    }
  }, {
    key: 'onAnimationStart',
    value: function onAnimationStart(element, listener) {
      var type = this.animationEventTypes.start;
      if (type && element.addEventListener) {
        return element.addEventListener(type, listener, false);
      }
    }
  }, {
    key: 'offTransitionEnd',
    value: function offTransitionEnd(element, listener) {
      var type = this.transitionEndEventType;
      if (type && element.removeEventListener) {
        return element.removeEventListener(type, listener);
      }
    }
  }, {
    key: 'onTransitionEnd',
    value: function onTransitionEnd(element, listener) {
      var type = this.transitionEndEventType;
      if (type && element.addEventListener) {
        return element.addEventListener(type, listener, false);
      }
    }
  }, {
    key: 'offTweenEnd',
    value: function offTweenEnd(element, listener) {
      this.offAnimationEnd(element, listener);
      this.offTransitionEnd(element, listener);
    }
  }, {
    key: 'onTweenEnd',
    value: function onTweenEnd(element, listener) {
      this.onAnimationEnd(element, listener);
      this.onTransitionEnd(element, listener);
    }
  }, {
    key: 'animationEventTypes',
    get: function get() {
      return animationEventTypes[this.animationName];
    }
  }, {
    key: 'transitionEndEventType',
    get: function get() {
      return transitionEndEventType[this.transitionName];
    }
  }]);
  return AnimationUtils;
}();

var AnimationUtils$1 = new AnimationUtils();

var CSSAnimate = function (_Component) {
  inherits(CSSAnimate, _Component);

  function CSSAnimate(props, context) {
    classCallCheck(this, CSSAnimate);

    var _this = possibleConstructorReturn(this, (CSSAnimate.__proto__ || Object.getPrototypeOf(CSSAnimate)).call(this, props, context));

    _this.animateEnterPromise = null;
    _this.animateLeavePromise = null;

    _this.animateEnter = _this.animateEnter.bind(_this);
    _this.animateLeave = _this.animateLeave.bind(_this);

    _this.onAnimationStart = _this.onAnimationStart.bind(_this);
    _this.onAnimationEnd = _this.onAnimationEnd.bind(_this);

    _this.state = {
      animateEnterComplete: false,
      animateLeaveComplete: false,
      animateEnter: props.animateEnter,
      animateLeave: props.animateLeave,
      height: null
    };

    return _this;
  }

  createClass(CSSAnimate, [{
    key: 'animateEnter',
    value: function animateEnter() {
      var element = ReactDOM.findDOMNode(this.refs.element);
      var height = element ? element.scrollHeight : 0;

      this.setState({
        animateEnterComplete: false,
        animateEnter: true,
        height: height,
        animateLeave: false
      });
    }
  }, {
    key: 'animateLeave',
    value: function animateLeave() {
      this.setState({
        animateLeaveComplete: false,
        animateLeave: true,
        animateEnter: false,
        height: 0
      });
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var element = ReactDOM.findDOMNode(this.refs.element);
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
  }, {
    key: 'addListener',
    value: function addListener() {
      if (!this.hasListener) {
        var element = ReactDOM.findDOMNode(this.refs.element);
        if (element) {
          this.hasListener = true;
          AnimationUtils$1.onAnimationStart(element, this.onAnimationStart);
          AnimationUtils$1.onAnimationEnd(element, this.onAnimationEnd);
        }
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      AnimationUtils$1.init();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      AnimationUtils$1.init();
      this.addListener();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var element = ReactDOM.findDOMNode(this.refs.element);
      AnimationUtils$1.offAnimationEnd(element, this.onAnimationEnd);
      AnimationUtils$1.offAnimationStart(element, this.onAnimationStart);
    }
  }, {
    key: 'render',
    value: function render() {

      var animating = this.state.animateEnter || this.state.animateLeave;

      if (this.props.remove && !animating && !this.state.animateEnterComplete) {
        return null;
      }

      var _props = this.props,
          className = _props.className,
          props = objectWithoutProperties(_props, ['className']);

      var animationClass = null;
      var style = {};

      if (this.props.animateEnterClass === 'slideDown' /*&& animating || this.state.animateLeaveComplete*/) {
          style.maxHeight = this.state.height;
        }

      if (animating) {
        var _classNames;

        animationClass = classNames(this.props.animateBaseClass, (_classNames = {}, defineProperty(_classNames, this.props.animateEnterClass, this.state.animateEnter), defineProperty(_classNames, 'animateEnter', this.state.animateEnter), defineProperty(_classNames, this.props.animateLeaveClass, this.state.animateLeave), defineProperty(_classNames, 'animateLeave', this.state.animateLeave), _classNames));

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

        style = AnimationUtils$1.prefix(style);
      }

      var visibleClass = !animating && this.state.animateLeaveComplete && this.props.hide ? 'is-hidden' : null;
      visibleClass = animating || this.state.animateEnterComplete ? 'is-showing' : visibleClass;

      className = classNames('css-animation', className, animationClass, visibleClass);

      var element = React.Children.only(this.props.children);

      if (!element || this.props.tagName) {
        var Comp = this.props.tagName || 'div';
        element = React.createElement(
          Comp,
          { ref: 'element', style: style, className: className },
          this.props.children
        );
      } else {
        className = classNames(element.props.className, className);
        element = React.cloneElement(element, { ref: 'element', className: className, style: style });
      }

      return element;
    }
  }, {
    key: 'createEventObject',
    value: function createEventObject(event) {
      if (!event) {
        return null;
      }
      var preventDefault = function preventDefault() {
        event.preventDefault();
      };

      return {
        originalEvent: event,
        preventDefault: preventDefault,
        target: this,
        type: event.type,
        props: this.props
      };
    }
  }, {
    key: 'onAnimationEnd',
    value: function onAnimationEnd(e) {
      var _this2 = this;

      var element = ReactDOM.findDOMNode(this.refs.element);
      var _cb;

      if (e.target === element) {
        var state;

        (function () {

          if (_this2.props.timeoutFallback) {
            clearTimeout(_this2.endTimeout);
          }

          state = {
            animateEnter: false,
            animateLeave: false
          };


          if (e.animationName === _this2.props.animateEnterClass) {
            _cb = _this2.props.onAnimateEnterEnd;
            state.animateLeaveComplete = false;
            state.animateEnterComplete = true;
          } else if (e.animationName === _this2.props.animateLeaveClass) {
            _cb = _this2.props.onAnimateLeaveEnd;
            state.animateLeaveComplete = true;
            state.animateEnterComplete = false;
          }

          if (_this2.props.onAnimationEnd) {
            if (!_cb) {
              _cb = _this2.props.onAnimationEnd;
            } else {
              _cb = function cb(e) {
                _cb(e);
                _this2.props.onAnimationEnd(e);
              };
            }
          }

          var evt = _cb ? _this2.createEventObject(e) : null;
          _this2.setState(state, function () {
            if (_cb) {
              _cb(evt);
            }
          });
        })();
      }
    }
  }, {
    key: 'onAnimationStart',
    value: function onAnimationStart(e) {
      var _this3 = this;

      var element = ReactDOM.findDOMNode(this.refs.element);
      var _cb2;
      if (e.target === element) {

        if (this.props.timeoutFallback) {
          clearTimeout(this.endTimeout);

          var duration = window.getComputedStyle(element)['animation-duration'] || 0;
          var delay = window.getComputedStyle(element)['animation-delay'] || 0;

          if (duration) {
            var factor = duration.indexOf('ms') > -1 ? 1 : 1000;
            duration = parseInt(duration, 10) * factor;
          }

          if (delay) {
            var _factor = delay.indexOf('ms') > -1 ? 1 : 1000;
            delay = parseInt(delay, 10) * _factor;
          }

          var ms = duration + delay;
          if (ms) {
            this.endTimeout = setTimeout(function () {
              _this3.onAnimationEnd(e);
            }, ms + 10);
          }
        }

        if (e.animationName === this.props.animateEnterClass) {
          _cb2 = this.props.onAnimateEnterStart;
        } else if (e.animationName === this.props.animateLeaveClass) {
          _cb2 = this.props.onAnimateLeaveStart;
        }

        if (this.props.onAnimationStart) {
          if (!_cb2) {
            _cb2 = this.props.onAnimationStart;
          } else {
            _cb2 = function cb(e) {
              _cb2(e);
              _this3.props.onAnimationStart(e);
            };
          }
        }

        if (_cb2) {
          _cb2(this.createEventObject(e));
        }
      }
    }
  }]);
  return CSSAnimate;
}(Component);

CSSAnimate.propTypes = {

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
CSSAnimate.defaultProps = {
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

export default CSSAnimate;
