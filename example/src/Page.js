import React, { Component } from 'react';
import classNames from 'classnames';

export default class Page extends Component {
  render() {

    const {className, children, ...props} = this.props;
    const cname = classNames('page', className);

    return (
      <div className={cname} {...props} >
        {children}
      </div>
    );
  }
}
