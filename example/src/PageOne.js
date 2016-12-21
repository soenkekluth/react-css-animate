import React, { Component } from 'react';
import classNames from 'classnames';

export default class PageOne extends Component {
  render() {

    const {className, ...props} = this.props;
    const cname = classNames('page page-1', className);
    return (
      <div className={cname} {...props} >
        <h1>Page 1</h1>
      </div>
    );
  }
}
