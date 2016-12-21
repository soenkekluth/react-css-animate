import prefixAll from 'inline-style-prefix-all';

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

var animationUtils = new AnimationUtils();

export default animationUtils;
