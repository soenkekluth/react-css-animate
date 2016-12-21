import prefixAll from 'inline-style-prefix-all';

const animationEventTypes = {
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

const transitionEndEventType = {
  'transition': 'transitionend',
  'OTransition': 'otransitionend',
  'MozTransition': 'transitionend',
  'WebkitTransition': 'webkitTransitionEnd'
};

class AnimationUtils {

  constructor() {
    this.animationName = 'animation';
    this.transitionName = 'transition';
    this.initialized = false;
  }

  init() {
    if(!this.initialized){
      if(typeof window !== 'undefined'){
        this.initialized = true;
        this.animationName = Object.keys(prefixAll({'animation': ''}))[0];
        this.transitionName = Object.keys(prefixAll({'transition': ''}))[0];
      }
    }
  }


  get animationEventTypes() {
    return animationEventTypes[this.animationName];
  }

  get transitionEndEventType() {
    return transitionEndEventType[this.transitionName];
  }

  prefix(style){
    return prefixAll(style);
  }

  offAnimationEnd(element, listener) {
    var type = this.animationEventTypes.end;
    if (type && element.removeEventListener) {
     return element.removeEventListener(type, listener);
    }
  }

  onAnimationEnd(element, listener) {
    var type = this.animationEventTypes.end;
    if (type && element.addEventListener) {
      return element.addEventListener(type, listener, false);
    }
  }

  offAnimationStart(element, listener) {
    var type = this.animationEventTypes.start;
    if (type && element.removeEventListener) {
      return element.removeEventListener(type, listener);
    }
  }

  onAnimationStart(element, listener) {
    var type = this.animationEventTypes.start;
    if (type && element.addEventListener) {
      return element.addEventListener(type, listener, false);
    }
  }

  offTransitionEnd(element, listener) {
    var type = this.transitionEndEventType;
    if (type && element.removeEventListener) {
      return element.removeEventListener(type, listener);
    }
  }

  onTransitionEnd(element, listener) {
    var type = this.transitionEndEventType;
    if (type && element.addEventListener) {
      return element.addEventListener(type, listener, false);
    }
  }

  offTweenEnd(element, listener) {
    this.offAnimationEnd(element, listener);
    this.offTransitionEnd(element, listener);
  }

  onTweenEnd(element, listener) {
    this.onAnimationEnd(element, listener);
    this.onTransitionEnd(element, listener);
  }

}

export default new AnimationUtils();
