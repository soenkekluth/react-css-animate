import React, { PureComponent, Component, PropTypes } from 'react';
import classNames from 'classnames';
import AnimationUtils from './animation-utils';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

export default class CSSAnimate extends PureComponent {

  static ANIATION_TYPE_ANIMATION = 'animation';
  static ANIATION_TYPE_TRANSITION = 'transition';
  static ANIATION_TYPE_NONE = 'none';

  static propTypes = {
    tagName: React.PropTypes.string,

    name: React.PropTypes.string,

    animationType: React.PropTypes.string,

    animateEnter: React.PropTypes.bool,
    animateLeave: React.PropTypes.bool,
    leaveAbsolute: React.PropTypes.bool,
    enterAbsolute: React.PropTypes.bool,

    disabled: React.PropTypes.bool,
    remove: React.PropTypes.bool,
    hideLeaveEnd: React.PropTypes.bool,
    hideEnter: React.PropTypes.bool,
    hide: React.PropTypes.bool,

    timeoutFallback: React.PropTypes.bool,

    animateBaseName: React.PropTypes.string,

    hiddenStyle: React.PropTypes.object,


    animateEnterName: React.PropTypes.string,
    animateLeaveName: React.PropTypes.string,
    animateEnterEndName: React.PropTypes.string,
    animateLeaveEndName: React.PropTypes.string,
    animateEnterStartName: React.PropTypes.string,
    animateLeaveStartName: React.PropTypes.string,
    transitionEnterProperty: React.PropTypes.string,
    transitionLeaveProperty: React.PropTypes.string,

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
    animationType: CSSAnimate.ANIATION_TYPE_ANIMATION,
    animateBaseName: 'animated',
    animateEnterName: 'fadeIn',
    animateLeaveName: 'fadeOut',
    name: 'CSSAnimate',
    animateEnterEndName: null,
    animateLeaveEndName: null,
    animateEnterStartName: 'animateEnterStart',
    animateLeaveStartName: 'animateLeaveStart',
    hiddenStyle: {
      'visibility': 'hidden'
    },
    animateEnter: false,
    animateLeave: false,
    hide: false,
    hideEnter: false,
    hideLeaveEnd: false,
    leaveAbsolute: false,
    enterAbsolute: false,
    disabled: false,
    remove: false,
    timeoutFallback: false,
    // onAnimationEnd: ()=>{console.log('onAnimationEnd')},
    // onAnimateEnterStart: ()=>{console.log('onAnimateEnterStart')},
    // onAnimateEnterIteration: ()=>{console.log('onAnimateEnterIteration')},
    // onAnimateEnterEnd: ()=>{console.log('onAnimateEnterEnd')},
    // onAnimateLeaveStart: ()=>{console.log('onAnimateLeaveStart')},
    // onAnimateLeaveIteration: ()=>{console.log('onAnimateLeaveIteration')},
    // onAnimateLeaveEnd: ()=>{console.log('onAnimateLeaveEnd')},
  };

  constructor(props, context) {
    super(props, context);

    this.animateEnter = this.animateEnter.bind(this);
    this.animateLeave = this.animateLeave.bind(this);

    this.onAnimationStart = this.onAnimationStart.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    this.firstUpdate = true;
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
    const element = ReactDOM.findDOMNode(this.element);
    var height = element ? element.scrollHeight : 0;

    this.setState({
      animateEnterEnd: false,
      animateEnter: true,
      height: height,
      animateLeave: false
    });
  }

  animateLeave() {
    const element = ReactDOM.findDOMNode(this.element);
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

    console.log(this.props.name, 'componentWillUpdate',nextProps, nextState);

    const element = ReactDOM.findDOMNode(this.element);
    if (nextProps.animateLeave && !this.props.animateLeave && !this.state.animateLeave) {
      nextState.animateEnterEnd = false;
      nextState.animateLeaveEnd = false;
      nextState.animateEnter = false;
      nextState.animateLeave = true;
      nextState.animateEnterStart = false;
      nextState.animateLeaveStart = false;

      nextState.height = 0;

      this.addAnimationListener();

      if (element && nextProps.leaveAbsolute) {
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

  componentDidUpdate(prevProps, prevState) {
    // static ANIATION_TYPE_ANIMATION = 'animation';
    // static ANIATION_TYPE_TRANSITION = 'transition';
    // static ANIATION_TYPE_NONE = 'none';

    // console.log(this.state, prevState, this.props.animationType, this.firstUpdate, this.props.animationType, this.props.animateEnterName);


      // console.log(this.props.name, 'componentDidUpdate', this.key, this.state, prevState);
    if (this.props.animationType === CSSAnimate.ANIATION_TYPE_TRANSITION) {

      if(!prevState.animateEnterStart && this.state.animateEnterStart){
        // this.setState({
        //   // animateEnterStart : false,
        // })

        // return;
      }else if(!prevState.animateLeaveStart && this.state.animateLeaveStart){
        // this.setState({
        //   // animateLeaveStart : false,
        // })
        // return;
      }

      let ms = 0;
      let evt = null;
      let element = null;

      if ((this.firstUpdate &&  this.state.animateEnter) || (!prevState.animateEnter && this.state.animateEnter)) {
        element = ReactDOM.findDOMNode(this.element);
        evt = {
          preventDefault:()=>{},
          target: element,
          type: 'transitionstart',
          animationName: this.props.animateEnterName,
          target: element,
        };
        ms = this.getAnimationDuration(true);

      } else if ((this.firstUpdate &&  this.state.animateLeave)  || (!prevState.animateLeave && this.state.animateLeave)) {
        element = ReactDOM.findDOMNode(this.element);
        evt = {
          preventDefault:()=>{},
          target: element,
          type: 'transitionstart',
          animationName: this.props.animateLeaveName,
          target: element,
        };
        ms = this.getAnimationDuration(false);
      }

      if(evt){
        this.onAnimationStart(evt);

        // if (this.firstUpdate && ms) {
        //   console.log('WILL FAKE');
        //   this.endTimeout = setTimeout(() => {
        //     this.onAnimationEnd(evt);
        //   }, ms);
        // }
      }


      this.firstUpdate = false;

    // if(!prevState.animateEnter && this.state.animateEnter){
    //   if(this.props.onAnimateEnterStart) {
    //     let timeout = 0;
    //     if(this.props.animateEnterDelay) {
    //       //TODO filter ms s usw
    //       timeout = parseInt(this.props.animateEnterDelay, 10);
    //     }
    //     setTimeout(()=>{
    //       this.props.onAnimateEnterStart(this.createEventObject({
    //         type: 'transitionstart',
    //         preventDefault: ()=>{},
    //       }));
    //     }, timeout);
    //   }
    // }else if(!prevState.animateLeave && this.state.animateLeave){
    //   if(this.props.onAnimateLeaveStart) {
    //     let timeout = 0;
    //     if(this.props.animateEnterDelay) {
    //       //TODO filter ms s usw
    //       timeout = parseInt(this.props.animateEnterDelay, 10);
    //     }
    //     setTimeout(()=>{
    //       this.props.onAnimateEnterStart(this.createEventObject({
    //         type: 'transitionstart',
    //         preventDefault: ()=>{},
    //       }));
    //     }, timeout);
    //   }
    // }
    }

    // nextState.animateLeave = true;
  }



  getAnimationDuration(animateEnter) {

    if(this.props.animationType === 'none'){
      return 0;
    }

    const element = ReactDOM.findDOMNode(this.element);
    // animateEnterDelay
    // animateLeaveDelay
    // animateEnterDuration
    // animateLeaveDuration

    let duration = (animateEnter ? this.props.animateEnterDuration : this.props.animateLeaveDuration) || window.getComputedStyle(element)[AnimationUtils.prefix(this.props.animationType)+'-duration'] || 0;
    let delay = (animateEnter ? this.props.animateEnterDelay : this.props.animateLeaveDelay)  || window.getComputedStyle(element)[AnimationUtils.prefix(this.props.animationType)+'-delay'] || 0;

    if (duration) {
      let factor = duration.indexOf('ms') > -1 ? 1 : 1000;
      duration = parseInt(duration, 10) * factor;
    }

    if (delay) {
      let factor = delay.indexOf('ms') > -1 ? 1 : 1000;
      delay = parseInt(delay, 10) * factor;
    }

    const ms = duration + delay + 10;
    return ms;

  }

  addAnimationListener() {

    if (!this.hasAnimationListener) {
      const element = ReactDOM.findDOMNode(this.element);
      if (element) {
        if (this.props.animationType === CSSAnimate.ANIATION_TYPE_ANIMATION) {
          AnimationUtils.onAnimationStart(element, this.onAnimationStart);
          AnimationUtils.onAnimationEnd(element, this.onAnimationEnd);
        } else if (this.props.animationType === CSSAnimate.ANIATION_TYPE_TRANSITION) {
          AnimationUtils.onTransitionEnd(element, this.onTransitionEnd);
        }
        this.hasAnimationListener = true;
      }
    }
  }


  removeAnimationListener() {
    if (this.hasAnimationListener) {
      const element = ReactDOM.findDOMNode(this.element);
      if (element) {
        AnimationUtils.offTransitionEnd(element, this.onTransitionEnd);
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

    // console.log(this.props.name, 'componentDidMount');
    AnimationUtils.init();
    this.addAnimationListener();

    if(this.state.animateEnter && !this.state.animateEnterStart){
      this.setState({
        animateEnterStart: true,
      });
    }else if(this.state.animateLeave && !this.state.animateLeaveStart){
      this.setState({
        animateLeaveStart: true,
      });
    }
  }

  componentWillUnmount() {
    this.removeAnimationListener();
    this.element = null;
  }


  render() {

    const animating = this.state.animateEnter || this.state.animateLeave;
    // console.log(this.props.remove, this.state.animateLeaveEnd, this.props, this.state);

    if (this.props.remove && this.state.animateLeaveEnd) {
      return null;
    }

    // console.log(this.props.name, 'RENDER', this.state);

    var {className, ...props} = this.props;
    var animationName = null;
    var animationEndName = null;
    var style = this.props.style ? assign({}, this.props.style) : {};



    if (this.props.animateEnterName === 'slideDown' /*&& animating || this.state.animateLeaveEnd*/ ) {
      style.maxHeight = this.state.height;
    }

    if (animating) {

      animationName = classNames(this.props.animateBaseName, {
        [this.props.animateEnterStartName]: this.state.animateEnterStart,
        [this.props.animateEnterName]: this.state.animateEnter,
        'animateEnter': this.state.animateEnter,
        [this.props.animateLeaveStartName]: this.state.animateLeaveStart,
        [this.props.animateLeaveName]: this.state.animateLeave,
        'animateLeave': this.state.animateLeave
      })

      if (this.state.animateEnter) {
        if (this.props.animateEnterName && this.props.animationType === CSSAnimate.ANIATION_TYPE_ANIMATION) {
          style[`${this.props.animationType}Name`] = this.props.animateEnterDelay;
        }
        if (this.props.transitionEnterProperty && this.props.animationType === CSSAnimate.ANIATION_TYPE_TRANSITION) {
          style[`${this.props.animationType}Property`] = this.props.transitionEnterProperty;
        }

        if (this.props.animateEnterDelay) {
          style[`${this.props.animationType}Delay`] = this.props.animateEnterDelay;
          if ((this.props.hide || this.props.hideEnter) && !this.state.animateEnterStart) {
            style = assign({}, style, this.props.hiddenStyle);
          // style.visibility = 'hidden';
          }

        }
        if (this.props.animateEnterDuration) {
          style[`${this.props.animationType}Duration`] = this.props.animateEnterDuration;
        }
        if (this.props.animateEnterTiming) {
          style[`${this.props.animationType}TimingFunction`] = this.props.animateEnterTiming;
        }
      } else if (this.state.animateLeave) {
        if (this.props.leaveAbsolute) {
          style.position = 'absolute';
          style.width = this.state.width + 'px';
        }
        if (this.props.animateLeaveName && this.props.animationType === CSSAnimate.ANIATION_TYPE_ANIMATION) {
          style[`${this.props.animationType}Name`] = this.props.animateLeaveDelay;
        }
        if (this.props.transitionLeaveProperty && this.props.animationType === CSSAnimate.ANIATION_TYPE_TRANSITION) {
          style[`${this.props.animationType}Property`] = this.props.transitionLeaveProperty;
        }
        if (this.props.animateLeaveDelay) {
          style[`${this.props.animationType}Delay`] = this.props.animateLeaveDelay;
        }
        if (this.props.animateLeaveDuration) {
          style[`${this.props.animationType}Duration`] = this.props.animateLeaveDuration;
        }
        if (this.props.animateLeaveTiming) {
          style[`${this.props.animationType}TimingFunction`] = this.props.animateLeaveTiming;
        }
      }
      style = AnimationUtils.prefix(style);

    } else {
      if ((this.state.animateEnterEnd || this.state.animateLeaveEnd) && (this.props.animateEnterEndName || this.props.animateLeaveEndName)) {
        animationEndName = classNames({
          [this.props.animateEnterEndName]: !!this.props.animateEnterEndName && this.state.animateEnterEnd,
          [this.props.animateLeaveEndName]: !!this.props.animateLeaveEndName && this.state.animateLeaveEnd
        })
      }
    }

    if ((this.props.hide || this.props.hideLeaveEnd) && this.state.animateLeaveEnd) {
      style = assign({}, style, this.props.hiddenStyle);
    }

    className = classNames('css-animation', className, animationName, animationEndName);

    let element = React.Children.only(this.props.children);

    // console.log(className);
    // console.log(style);

    if (!element || this.props.tagName) {
      const type = this.props.tagName || 'div';
      element = React.createElement(
        type, {
          ref: (element) => {
            this.element = element;
          },
          className: className,
          style: style,
        },
        this.props.children
      );

    } else {
      element = React.cloneElement(element, {
        ref: (element) => {
          this.element = element;
        },
        className: classNames(element.props ? element.props.className : null, className),
        style: style
      });
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

  onTransitionEnd(e) {
    const element = ReactDOM.findDOMNode(this.element);
    if (e.target === element) {
      this.onAnimationEnd({
        preventDefault:()=>{},
        target: element,
        type: e.type,
        animationName: this.state.animateEnter ? this.props.animateEnterName : this.props.animateLeaveName,
        }
      );
    }

    // console.log('ONTRANSITION END', e);
    // this.onAnimationEnd(assign({}, e, {
    //   animationName: this.state.animateEnter ? this.props.animateEnterName : this.props.animateLeaveName,
    // }));

  }

  onAnimationEnd(e) {
    // console.log(this.element.__proto__)

    if (e.animationName !== this.props.animateEnterName && e.animationName !== this.props.animateLeaveName){
      return;
    }

    // console.log(this.props.name, 'onAnimationEnd END', e);
    this.removeAnimationListener();

    const element = ReactDOM.findDOMNode(this.element);
    var cb;

    if (e.target === element) {

      var state = {};

      if (e.animationName === this.props.animateEnterName) {
        cb = this.props.onAnimateEnterEnd;

        state.animateEnterEnd = true;
        state.animateLeaveEnd = false;
        state.animateEnter = false;
        state.animateLeave = false;
        state.animateLeaveStart = false;
        state.animateEnterStart = false;

      } else if (e.animationName === this.props.animateLeaveName) {
        cb = this.props.onAnimateLeaveEnd;
        state.animateEnterEnd = false;
        state.animateLeaveEnd = true;
        state.animateEnter = false;
        state.animateLeave = false;
        state.animateLeaveStart = false;
        state.animateEnterStart = false;
      }

      // console.log('sdaadsadsadasd', state);

      this.setState(state);

      const evtObj = this.createEventObject(e);
      if (this.props.onAnimationEnd) {
        this.props.onAnimationEnd(evtObj);
      }
      if(cb) {
        cb(evtObj);
      }
    }
  }


  hans() {
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
  }

  onAnimationStart(e) {
    if (e.animationName !== this.props.animateEnterName && e.animationName !== this.props.animateLeaveName){
      return;
    }
    // console.log('onamimation start', e);
    const element = ReactDOM.findDOMNode(this.element);
    var cb;
    if (e.target === element) {

      if (e.animationName === this.props.animateEnterName) {
        this.setState({
          animateEnterEnd: false,
          animateLeaveEnd: false,
          animateEnter: true,
          animateLeave: false,
          animateLeaveStart: false,
          animateEnterStart: true
        })
        cb = this.props.onAnimateEnterStart;
      } else if (e.animationName === this.props.animateLeaveName) {
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

      const evtObj = this.createEventObject(e);
      if (this.props.onAnimationStart) {
        this.props.onAnimationStart(evtObj);
      }
      if(cb) {
        cb(evtObj);
      }

    }
  }

}
