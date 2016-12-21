import React, { Component } from 'react';
import classNames from 'classnames';

export default class PageTwo extends Component {
    render() {


      const {className, ...props} = this.props;
      const cname = classNames('page page-2', className);

      return (
        <div className={cname} {...props} >
          <h1>Page 2</h1>
        </div>
      );
    }
  }
